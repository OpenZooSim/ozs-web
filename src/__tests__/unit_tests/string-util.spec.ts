import { describe, expect, test } from '@jest/globals';
import { StringUtil } from '../../utils/string.util';
describe('String Util', () => {
    test('Can parse email and password from a basic auth header string', async () => {
        const authHeader = 'Basic bXllbWFpbEB0ZXN0LmNvbTpwQHNzdzByZCE=';
        const expectedEmail = 'myemail@test.com';
        const expectedPassword = 'p@ssw0rd!';
        const result =
            StringUtil.ParseCredentialsFromBasicAuthHeader(authHeader);
        if (result === null) {
            throw new Error('Result is null');
        }
        expect(result.email).toBe(expectedEmail);
        expect(result.password).toBe(expectedPassword);
    });

    test('Can retrieve token from bearer auth header', async () => {
        const token = 'mySuperCoolToken';
        const authHeader = 'Bearer ' + token;
        const result = StringUtil.GetBearerTokenFromAuthHeader(authHeader);
        expect(result).toBe(token);
    });

    test('Returns null for invalid basic auth header', async () => {
        const authHeader = 'Basic invalidBase64';
        const result =
            StringUtil.ParseCredentialsFromBasicAuthHeader(authHeader);
        expect(result).toBeNull();
    });

    test('Returns null for missing bearer token', async () => {
        const authHeader = 'Bearer ';
        const result = StringUtil.GetBearerTokenFromAuthHeader(authHeader);
        expect(result).toBeNull();
    });

    test('Returns null for non-bearer auth header', async () => {
        const authHeader = 'Basic bXllbWFpbEB0ZXN0LmNvbTpwQHNzdzByZCE=';
        const result = StringUtil.GetBearerTokenFromAuthHeader(authHeader);
        expect(result).toBeNull();
    });

    test('Can parse email and password with special characters from a basic auth header string', async () => {
        const authHeader = 'Basic c3BlY2lhbEB0ZXN0LmNvbTpwQHNzdzByZCEhQA==';
        const expectedEmail = 'special@test.com';
        const expectedPassword = 'p@ssw0rd!!@';
        const result =
            StringUtil.ParseCredentialsFromBasicAuthHeader(authHeader);
        if (result === null) {
            throw new Error('Result is null');
        }
        expect(result.email).toBe(expectedEmail);
        expect(result.password).toBe(expectedPassword);
    });

    test('Can retrieve token with special characters from bearer auth header', async () => {
        const token = 'my$uperCoolT0ken!';
        const authHeader = 'Bearer ' + token;
        const result = StringUtil.GetBearerTokenFromAuthHeader(authHeader);
        expect(result).toBe(token);
    });
});
