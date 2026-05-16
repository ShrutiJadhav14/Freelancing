import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Attach token to every request
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle responses + global errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔐 Auto logout if token invalid/expired
    if (error.response?.status === 401) {
      console.warn("Unauthorized - logging out");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // 🔥 Log server errors (this helps a LOT)
    if (error.response?.status === 500) {
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

// ✅ API calls
export const getCompanyProfile = async () => {
  return await API.get("/company/profile");
};

export const saveCompanyProfile = async (data) => {
  return await API.post("/company/profile", data);
};

export default API;