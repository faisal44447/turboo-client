import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
});

// REQUEST INTERCEPTOR (RUN ONCE)
axiosSecure.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access-token");

        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR
axiosSecure.interceptors.response.use(
    (res) => res,
    (err) => {
        console.error("API ERROR:", err);
        return Promise.reject(err);
    }
);

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;