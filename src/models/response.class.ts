export class ApiResponse {

    constructor(success: boolean, message: string) {

        this.success = success;
        this.message = message;
    }
    public success: boolean;
    public message: string;
}
