export class RefreshResponseDTO {
    public accessToken!: string;

    constructor(data?: any) {
        if (data) {
            this.accessToken = data.accessToken;
        }
    }
}
