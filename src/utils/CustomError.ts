class CustomError extends Error {
    public statusCode: number
    public errorCode?:string
    public errorMessage?:string
    public error?:unknown|any

    constructor(statusCode:number, errorCode?:string, errorMessage?:string, error?:unknown|any){
        super(errorMessage)
        this.statusCode = statusCode
        this.errorCode = errorCode
        this.errorMessage = errorMessage
        this.error = error

        this.name = this.constructor.name;

        if (error) {
            this.stack = error.stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default CustomError