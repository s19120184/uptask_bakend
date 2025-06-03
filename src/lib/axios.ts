import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// parar evitar  const token= localStorage.getItem('AUTH_TOKEN');
//      try {
//         const {data}= await api.get("/projects",{
//              headers:{
//                   Authorization:`Bearer ${token}`
//              }
//         });
//usamos lo interseptors 

api.interceptors.request.use(config =>{
    const token = localStorage.getItem('AUTH_TOKEN');
    if(token) {
        config.headers.Authorization= `Bearer ${token}`
    }
    return config
})


export default api