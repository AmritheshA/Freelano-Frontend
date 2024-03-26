export const handleErrors = (error: any) => {
    if (error.response && error.response.data) {
        // Handle specific error message from the backend
        const err = error.response.data;
        console.log("Error"+err);
        return { message: err };
    } else {
        // Handle other types of errors (network, server not responding, etc.)
        console.log("Error"+error.message);
        return { message: error.message };
    }
};