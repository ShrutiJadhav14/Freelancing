import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  //console.log("interceptor sending token: ", token);
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ✅ Handle 401
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// ✅ ADD THESE EXPORTS
export const getCompanyProfile = () => API.get("/company/profile");

export const saveCompanyProfile = (data) =>
  API.post("/company/profile", data);

export default API;