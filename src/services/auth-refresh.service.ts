import { singleton } from 'tsyringe';
import { UserRepository } from '../database/repositories/user.repository';
import { TokenService } from './token.service';
import { RefreshResponseDTO } from '../models/dtos/refresh-response.dto';

@singleton()
export class AuthRefreshService {
    constructor(
        private readonly _userRepo: UserRepository,
        private readonly _tokenService: TokenService
    ) {}

    public async RefreshToken(
        refreshToken: string
    ): Promise<RefreshResponseDTO> {
        if (!refreshToken) {
            throw new Error('No refresh token provided');
        }
        const userId = await this._tokenService.ValidateToken(refreshToken);

        if (!userId) {
            throw new Error('Invalid refresh token');
        }

        const user = await this._userRepo.GetUserByID(userId);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.deleted) {
            throw new Error('User is deleted');
        }

        if (!user.verified) {
            throw new Error('User is not verified');
        }

        const accessToken = await this._tokenService.CreateAccessToken(user.id);

        return new RefreshResponseDTO({
            accessToken,
        });
    }
}
