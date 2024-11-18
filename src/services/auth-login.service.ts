import { singleton } from 'tsyringe';
import { UserRepository } from '../database/repositories/user.repository';
import { TokenService } from './token.service';
import { StringUtil } from '../utils/string.util';
import { CryptoService } from './crypto.service';
import { AuthError } from '../errors/auth.error';
import { LoginResponseDTO } from '../models/dtos/login-response.dto';

@singleton()
export class AuthLoginService {
    constructor(
        private readonly _userRepo: UserRepository,
        private readonly _tokenService: TokenService,
        private readonly _cryptoService: CryptoService
    ) {}

    public async LoginBasic(authHeader: string): Promise<LoginResponseDTO> {
        const credentials =
            StringUtil.ParseCredentialsFromBasicAuthHeader(authHeader);
        if (!credentials) {
            throw new AuthError(
                'An error occurred when attempting to log you in!'
            );
        }
        const existingUser = await this._userRepo.GetUserByEmail(
            credentials.email.toLowerCase()
        );
        if (!existingUser) {
            throw new AuthError(
                'An error occurred when attempting to log you in!'
            );
        }
        const isValidPassword = this._cryptoService.VerifyPassword(
            credentials.password,
            existingUser.password_hash
        );
        if (!isValidPassword) {
            throw new AuthError(
                'An error occurred when attempting to log you in!'
            );
        }
        const accessToken = await this._tokenService.CreateAccessToken(
            existingUser.id
        );

        const refreshToken = await this._tokenService.CreateRefreshToken(
            existingUser.id
        );

        existingUser.last_login = new Date(Date.now());
        await this._userRepo.UpdateUser(existingUser);

        return new LoginResponseDTO({
            accessToken,
            refreshToken,
        });
    }
}
