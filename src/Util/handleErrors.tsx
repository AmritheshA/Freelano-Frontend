export const handleErrors = (error: any) => {
    if (error.response && error.response.data) {
        // Handle specific error message from the backend
        const err = error.response.data;
        return { message: err };
    } else {
        // Handle other types of errors (network, server not responding, etc.)
        return { message: error.message };
    }
};