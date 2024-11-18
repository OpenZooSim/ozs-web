export class StringUtil {
    public static ParseCredentialsFromBasicAuthHeader(authHeader: string): {
        email: string;
        password: string;
    } | null {
        const base64Credentials = authHeader.split(' ')[1];
        if (!StringUtil._isValidBase64(base64Credentials)) {
            return null;
        }
        const decodedCredentials = Buffer.from(
            base64Credentials,
            'base64'
        ).toString('utf-8');
        const [email, password] = decodedCredentials.split(':');
        return { email, password };
    }

    public static GetBearerTokenFromAuthHeader(
        authHeader: string
    ): string | null {
        const authHeaderParts = authHeader.split(' ');
        if (
            authHeaderParts.length !== 2 ||
            authHeaderParts[0] !== 'Bearer' ||
            authHeaderParts[1] === ''
        ) {
            return null;
        }
        return authHeader.split(' ')[1];
    }

    private static _isValidBase64(str: string): boolean {
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    }
}
