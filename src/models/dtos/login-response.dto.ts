export class LoginResponseDTO {
    public accessToken!: string;
    public refreshToken!: string;

    constructor(data?: any) {
        if (data) {
            this.accessToken = data.accessToken;
            this.refreshToken = data.refreshToken;
        }
    }

}