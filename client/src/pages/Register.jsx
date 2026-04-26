import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name required";

    if (!form.email) err.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email";

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
      await API.post("/auth/register", form);

      toast.success("Account created 🎉");
      nav("/login");

    } catch (err) {
      toast.error(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-pink-500 to-orange-500 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">DevConnect</h1>
        <p className="text-lg opacity-80 text-center">
          Join the fastest growing developer network.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <form className="bg-white p-8 rounded-2xl shadow-2xl w-96" onSubmit={handleSubmit}>
          
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full p-3 border rounded-lg mb-1 ${errors.name && "border-red-500"}`}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <p className="text-red-500 text-sm mb-3">{errors.name}</p>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 border rounded-lg mb-1 ${errors.email && "border-red-500"}`}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <p className="text-red-500 text-sm mb-3">{errors.email}</p>

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 border rounded-lg mb-1 ${errors.password && "border-red-500"}`}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>

          {/* ROLE */}
          <select
            className="w-full p-3 border rounded-lg mb-4"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="developer">Developer</option>
            <option value="company">Company</option>
          </select>

          <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition">
            Register
          </button>

          <p className="text-sm mt-4 text-center">
            Already have an account?
            <span
              onClick={() => nav("/login")}
              className="text-pink-600 cursor-pointer ml-1"
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}