import { describe, expect, test } from '@jest/globals';
import { container } from 'tsyringe';
import { TokenService } from '../../services/token.service';

describe('Token Service', () => {
    const _tokenService = container.resolve(TokenService);

    test('Can create and validate verification token', async () => {
        const id = 1234;
        const token = await _tokenService.CreateVerificationToken(id);
        expect(token).not.toBeNull();

        const payload = await _tokenService.ValidateToken(token);
        expect(payload).not.toBeNull();
        expect(payload).toBe(id);
    });

    test('Fails when attempting to validating an incorrect token', async () => {
        try {
            await _tokenService.ValidateToken('aSuperRandomWrongString');
            // We should never get here--if we do, then the test should fail!
            throw new Error('WRONG');
        } catch (error: any) {
            expect(error.message).not.toBe('WRONG');
        }
    });

    test('Fails when validating a malformed token', async () => {
        try {
            await _tokenService.ValidateToken('malformed.token.string');
            throw new Error('WRONG');
        } catch (error: any) {
            expect(error.message).toContain('JSON.');
        }
    });

    test('Can create and validate access token', async () => {
        const id = 15679;
        const token = await _tokenService.CreateAccessToken(id);
        expect(token).not.toBeNull();

        const payload = await _tokenService.ValidateToken(token);
        expect(payload).not.toBeNull();
        expect(payload).toBe(id);
    });
});
