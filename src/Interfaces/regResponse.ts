export default interface regResponse {
    data?: {
        isRegisterationSuccessful: boolean;
        errors: Array<string>;
    };
    error?: any;
}