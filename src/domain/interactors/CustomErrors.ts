export class ValidationError {
    public errors: object;
    constructor(errors: object) {
        this.errors = errors;
    }
}

export class SubmissionError {
    public errors;
    public errorDescription;
    constructor(errors: object, errorDescription: string) {
        this.errors = errors;
        this.errorDescription = errorDescription;
    }
}
