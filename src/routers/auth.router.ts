import { BaseRouter } from './base.router';
import { Request, Response, NextFunction } from 'express';
import { UserRegistrationService } from '../services/user-registration.service';
import { AuthLoginService } from '../services/auth-login.service';
import { singleton } from 'tsyringe';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthError } from '../errors/auth.error';
import { ValidationError } from '../errors/validation.error';
import { AuthRefreshService } from '../services/auth-refresh.service';
import { EnvService } from '../services/env.service';
import { NodeEnv } from '../models/enums/node-env.enum';

@singleton()
export class AuthRouter extends BaseRouter {
    constructor(
        private readonly _userRegistrationService: UserRegistrationService,
        private readonly _authLoginService: AuthLoginService,
        private readonly _authRefreshService: AuthRefreshService,
        private readonly _envService: EnvService
    ) {
        super();
        this._buildRoutes();
    }

    private async _register(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body.email && req.body.password) {
                const result =
                    await this._userRegistrationService.RegisterNewUserRequest(
                        req.body.email,
                        req.body.password
                    );
                res.json({
                    message: result,
                });
            } else {
                throw new ValidationError('User Information is required!');
            }
        } catch (error: any) {
            next(error);
        }
    }

    private async _verify(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.query.token) {
                const result =
                    await this._userRegistrationService.UserVerification(
                        req.query.token.toString()
                    );
                res.json({
                    message: result,
                });
            } else {
                throw new ValidationError('Token is required!');
            }
        } catch (error: any) {
            next(error);
        }
    }

    private async _login(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['Authorization'];
            if (!authHeader || authHeader.indexOf('Basic') < 0) {
                throw new AuthError('Login was unsuccessful!');
            }
            const loginResponseDTO = await this._authLoginService.LoginBasic(
                authHeader.toString()
            );

            const isProd = this._envService.NodeEnv === NodeEnv.PRODUCTION;

            res.cookie('access_token', loginResponseDTO.accessToken, {
                httpOnly: true,
                sameSite: 'lax',
                domain: isProd ? 'vistatable.com' : 'localhost',
                secure: isProd ? true : false,
                maxAge: this._envService.AccessTokenCookieExpiryInMS,
            });

            res.cookie('refresh_token', loginResponseDTO.refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                path: '/auth/refresh-token',
                domain: isProd ? 'vistatable.com' : 'localhost',
                secure: isProd ? true : false,
                maxAge: this._envService.RefreshTokenCookieExpiryInMS,
            });

            res.json(loginResponseDTO);
        } catch (error: any) {
            next(error);
        }
    }

    private async _token(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            res.json(req.user);
        } catch (error: any) {
            next(error);
        }
    }

    private async _refreshToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const refreshToken = req.headers['x-refresh-token'];
            if (!refreshToken) {
                throw new AuthError('Refresh Token was unsuccessful!');
            }
            const refreshResponseDTO =
                await this._authRefreshService.RefreshToken(
                    refreshToken.toString()
                );
            const isProd = this._envService.NodeEnv === NodeEnv.PRODUCTION;

            res.cookie('access_token', refreshResponseDTO.accessToken, {
                httpOnly: true,
                sameSite: 'lax',
                domain: isProd ? 'vistatable.com' : 'localhost',
                secure: isProd ? true : false,
                maxAge: this._envService.AccessTokenCookieExpiryInMS,
            });
            res.json(refreshResponseDTO);
        } catch (error: any) {
            next(error);
        }
    }

    private _buildRoutes() {
        this.Router.post('/register', this._register.bind(this));
        this.Router.post('/login', this._login.bind(this));
        this.Router.get('/verify', this._verify.bind(this));
        this.Router.post('/refresh-token', this._refreshToken.bind(this));
        this.Router.get(
            '/token',
            AuthMiddleware.Authorize,
            this._token.bind(this)
        );
    }
}
