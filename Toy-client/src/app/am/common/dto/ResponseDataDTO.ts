export class ResponseDataDTO<T>{
    statusCode: number;
    message: string;
    token: string;
    data: T;

    constructor(statusCode: number, message: string, token:string, data: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.token = token;
        this.data = data;
    }
}