import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const nav = useNavigate();

  const location = useLocation();
  const roleFromURL = new URLSearchParams(location.search).get("role");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: roleFromURL || "developer",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name required";
    if (!form.email) err.email = "Email required";
    if (!form.password) err.password = "Password required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await API.post("/auth/register", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Account created 🎉");
      nav(res.data.user.role === "company" ? "/company" : "/developer");

    } catch (err) {
      toast.error(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-black to-gray-900">

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
          Join the fastest growing developer network 🚀
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl w-96"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Register
          </h2>

          <input
            placeholder="Full Name"
            className="w-full p-3 mb-2 bg-white/10 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <p className="text-red-400 text-sm">{errors.name}</p>

          <input
            placeholder="Email"
            className="w-full p-3 mb-2 bg-white/10 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <p className="text-red-400 text-sm">{errors.email}</p>

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-2 bg-white/10 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <p className="text-red-400 text-sm">{errors.password}</p>

          {!roleFromURL && (
            <select
              className="w-full p-3 mb-4 bg-white/10 text-white border border-gray-600 rounded-lg"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="developer">Developer</option>
              <option value="company">Company</option>
            </select>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg"
          >
            Register
          </motion.button>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Already have an account?
            <span
              onClick={() => nav("/login")}
              className="text-pink-400 ml-1 cursor-pointer"
            >
              Login
            </span>
          </p>
        </motion.form>
      </div>
    </div>
  );
}