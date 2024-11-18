export interface IRawEnv {
    APP_KEY: string;
    APP_BASE_API_URL: string;
    NODE_ENV: string;
    DB_CONNECTION_STRING: string;
    DB_CERT: string;
    JWT_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRY: string;
    JWT_REFRESH_TOKEN_EXPIRY: string;
    JWT_VERIFICATION_TOKEN_EXPIRY: string;
    CRYPTO_KEY_LENGTH: string;
    CRYPTO_SALT_SIZE: string;
    EMAIL_PROVIDER_API_KEY: string;
}

export class EnvProvider {
    public static GetRawEnv(): IRawEnv {
        const env = process.env;

        let errorMessage = '';

        if (!env.APP_KEY) {
            errorMessage += ' APP_KEY';
        }

        if (!env.APP_BASE_API_URL) {
            errorMessage += ' APP_BASE_API_URL';
        }

        if (!env.NODE_ENV) {
            console.log(
                'NODE_ENV was not provided so we will default to: [development]'
            );
        }

        if (!env.DB_CONNECTION_STRING) {
            errorMessage += ' DB_CONNECTION_STRING';
        }

        if (!env.JWT_SECRET) {
            errorMessage += ' JWT_SECRET';
        }

        if (!env.JWT_ACCESS_TOKEN_EXPIRY) {
            errorMessage += ' JWT_ACCESS_TOKEN_EXPIRY';
        }

        if (!env.JWT_REFRESH_TOKEN_EXPIRY) {
            errorMessage += ' JWT_REFRESH_TOKEN_EXPIRY';
        }

        if (!env.JWT_VERIFICATION_TOKEN_EXPIRY) {
            errorMessage += ' JWT_VERIFICATION_TOKEN_EXPIRY';
        }

        if (!env.CRYPTO_KEY_LENGTH) {
            errorMessage += ' CRYPTO_KEY_LENGTH';
        }

        if (!env.CRYPTO_SALT_SIZE) {
            errorMessage += ' CRYPTO_SALT_SIZE';
        }

        if (!env.EMAIL_PROVIDER_API_KEY) {
            errorMessage += ' EMAIL_PROVIDER_API_KEY';
        }

        if (errorMessage) {
            console.error(
                `Application Failed Environment Validation. Missing Values: [${errorMessage.trimStart()}]`
            );
            process.exit(1);
        }

        return {
            APP_KEY: (env.APP_KEY as string).toString(),
            APP_BASE_API_URL: (env.APP_BASE_API_URL as string).toString(),
            NODE_ENV: env.NODE_ENV?.toString() || 'development',
            DB_CONNECTION_STRING: (
                env.DB_CONNECTION_STRING as string
            ).toString(),
            DB_CERT: (env.DB_CERT as string)?.toString(),
            JWT_SECRET: (env.JWT_SECRET as string).toString(),
            JWT_ACCESS_TOKEN_EXPIRY: (
                env.JWT_ACCESS_TOKEN_EXPIRY as string
            ).toString(),
            JWT_REFRESH_TOKEN_EXPIRY: (
                env.JWT_REFRESH_TOKEN_EXPIRY as string
            ).toString(),
            JWT_VERIFICATION_TOKEN_EXPIRY: (
                env.JWT_VERIFICATION_TOKEN_EXPIRY as string
            ).toString(),
            CRYPTO_KEY_LENGTH: (env.CRYPTO_KEY_LENGTH as string).toString(),
            CRYPTO_SALT_SIZE: (env.CRYPTO_SALT_SIZE as string).toString(),
            EMAIL_PROVIDER_API_KEY: (
                env.EMAIL_PROVIDER_API_KEY as string
            ).toString(),
        };
    }
}
