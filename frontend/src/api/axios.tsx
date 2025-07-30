import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({baseURL:"http://3.109.153.109:5000"})



API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token && req.headers) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});



export default API;