import { createSigner, createVerifier } from 'fast-jwt';
import { EnvService } from './env.service';
import { singleton } from 'tsyringe';

@singleton()
export class TokenService {
    private readonly _JWT_TOKEN_AUDIENCE = 'vistatable.com';

    private readonly _JWT_ISSUER = 'vt-api';

    private readonly _JWT_TOKEN_SUBJECT = 'vistatable_token';

    private readonly _JWT_ALGORITHM = 'HS512';

    constructor(private readonly _envService: EnvService) {}

    private _createSigner(expiresIn: string): any {
        return createSigner({
            algorithm: this._JWT_ALGORITHM,
            key: async () => this._envService.JWTSecret,
            iss: this._JWT_ISSUER,
            aud: this._JWT_TOKEN_AUDIENCE,
            sub: this._JWT_TOKEN_SUBJECT,
            expiresIn,
        });
    }

    private _createVerifier() {
        return createVerifier({
            key: async () => this._envService.JWTSecret,
            allowedIss: this._JWT_ISSUER,
            allowedAud: this._JWT_TOKEN_AUDIENCE,
            allowedSub: this._JWT_TOKEN_SUBJECT,
        });
    }

    public async CreateVerificationToken(userId: number): Promise<string> {
        const signer = this._createSigner(
            this._envService.JWTVerificationTokenExpiry
        );
        const token = await signer({ id: userId });
        return token.toString();
    }

    public async CreateAccessToken(userId: number): Promise<string> {
        const signer = this._createSigner(
            this._envService.JWTAccessTokenExpiry
        );
        const token = await signer({ id: userId });
        return token.toString();
    }

    public async CreateRefreshToken(userId: number): Promise<string> {
        const signer = this._createSigner(
            this._envService.JWTRefreshTokenExpiry
        );
        const token = await signer({ id: userId });
        return token.toString();
    }

    public async ValidateToken(token: string): Promise<number> {
        const verifier = this._createVerifier();
        const payload = await verifier(token);
        return payload.id;
    }
}
