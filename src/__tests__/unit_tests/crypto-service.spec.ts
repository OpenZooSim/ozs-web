import { describe, expect, test } from '@jest/globals';
import { container } from 'tsyringe';
import { CryptoService } from '../../services/crypto.service';

describe('Crypto Service', () => {
    const _cryptoService = container.resolve(CryptoService);

    test('Can generate and verify a hashed password', async () => {
        const password = 'p@ssw0rd!';
        const hash = await _cryptoService.HashPassword(password);
        expect(hash).not.toBeNull();

        const isValid = await _cryptoService.VerifyPassword(password, hash);
        expect(isValid).toBeTruthy();
    });

    test('Should Return False When Verifying an Incorrect Password', async () => {
        const password = 'p@ssw0rd!';
        const hash = await _cryptoService.HashPassword(password);
        expect(hash).not.toBeNull();

        const isValid = await _cryptoService.VerifyPassword(
            password + '12345',
            hash
        );
        expect(isValid).toBeFalsy();
    });

    test('Should handle empty password', async () => {
        const password = '';
        const hash = await _cryptoService.HashPassword(password);
        expect(hash).not.toBeNull();

        const isValid = await _cryptoService.VerifyPassword(password, hash);
        expect(isValid).toBeTruthy();
    });

    test('Should handle null password', async () => {
        const password = null;
        await expect(
            _cryptoService.HashPassword(password as any)
        ).rejects.toThrow();
    });

    test('Should handle very long password', async () => {
        const password = 'a'.repeat(1000);
        const hash = await _cryptoService.HashPassword(password);
        expect(hash).not.toBeNull();

        const isValid = await _cryptoService.VerifyPassword(password, hash);
        expect(isValid).toBeTruthy();
    });
});
