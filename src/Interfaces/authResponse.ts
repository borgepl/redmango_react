export default interface authResponse {
    data?: {
        isAuthSuccessful: boolean;
        errorMessage?: string;
        token: string;
        userDTO?: {
            id: string;
            name?: string;
            email: string;
            phoneNo: string;
        };
    };
    error?: any;
}