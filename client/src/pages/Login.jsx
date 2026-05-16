import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    let err = {};

    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email";

    if (!form.password) err.password = "Password required";

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
      nav(res.data.user.role === "company" ? "/company" : "/developer");

    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-black relative">
      
      {/* BACK BUTTON */}
      <motion.button
        whileHover={{ x: -5 }}
        onClick={() => nav("/")}
        className="absolute top-6 left-6 text-white/60 hover:text-white flex items-center gap-2 transition-all z-50"
      >
        <span className="text-xl">←</span> Back to Home
      </motion.button>

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center text-white px-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          DevConnect
        </motion.h1>

        <p className="text-gray-400 text-center max-w-sm">
          Build, connect and hire top developers with zero friction.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl w-96"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Login
          </h2>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-2 bg-white/10 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <p className="text-red-400 text-sm mb-3">{errors.email}</p>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 mb-2 bg-white/10 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 text-gray-300 cursor-pointer"
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>
          <p className="text-red-400 text-sm mb-3">{errors.password}</p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition"
          >
            Login
          </motion.button>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Don’t have an account?
            <span
              onClick={() => nav("/register")}
              className="text-indigo-400 ml-1 cursor-pointer"
            >
              Register
            </span>
          </p>
        </motion.form>
      </div>
    </div>
  );
}