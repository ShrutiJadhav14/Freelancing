import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    let err = {};

    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email format";

    if (!form.password) err.password = "Password required";
    else if (!/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,12}$/.test(form.password))
      err.password = "8-12 chars, letters + numbers";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Welcome back 🚀");
      nav("/dashboard");

    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">DevConnect</h1>
        <p className="text-lg opacity-80 text-center">
          Connect with top developers and build your next big idea.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-96">
          
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 border rounded-lg mb-1 ${errors.email && "border-red-500"}`}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <p className="text-red-500 text-sm mb-3">{errors.email}</p>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className={`w-full p-3 border rounded-lg mb-1 ${errors.password && "border-red-500"}`}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-sm"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Hide" : "Show"}
            </span>
          </div>
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
            Login
          </button>

          <p className="text-sm mt-4 text-center">
            Don’t have an account?
            <span
              onClick={() => nav("/register")}
              className="text-indigo-600 cursor-pointer ml-1"
            >
              Register
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}