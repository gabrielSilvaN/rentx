export class AppError extends Error {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}