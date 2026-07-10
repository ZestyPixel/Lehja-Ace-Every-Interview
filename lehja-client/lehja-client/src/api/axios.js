import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, 
    withCredentials: true, //send and receive cookies
});

let onAuthFailure = ()=>{}; //Made a placeholder function

export function setAuthFailureHandler(handler){ //Here is a way to set a function inside it (we will set setUser(null) function inside it)
    onAuthFailure = handler;
}

api.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest = error.config; //axios attaches the original requests info in the error objec, thus original request can be used to retry.

        if(error.response?.status === 401 && !originalRequest._retry){ //here the _retry property is made by us to avoid infinite loop of retrying 
//the request if the new access token request fails. It is undefined by default, so we check if it is undefined and if the error status is 401, 
// then we retry the request after getting a new access token.
            originalRequest._retry = true;
            try{
                await api.post('/newAccessToken');
                return api(originalRequest); //When this is called, it is called with the same interceptor instance,
// so if it fails again, it will go through the same interceptor and if it fails again, it will not retry because _retry is now true.
            }catch(refreshError){
                onAuthFailure(); //To setUser(null)
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;