import { useEffect, useState } from "react";
import {
  getCompanyProfile,
  saveCompanyProfile,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CompanyProfile() {
  const [form, setForm] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    industry: "",
    companySize: "",
    foundedYear: "",
  });

  const nav = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCompanyProfile();
        if (res.data) setForm(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      foundedYear: form.foundedYear ? Number(form.foundedYear) : null,
      companySize: form.companySize || null,
    };

    await saveCompanyProfile(payload);
    nav("/company");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 text-white">

      {/* CARD */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8"
      >
        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          🏢 Build Your Company Profile
        </motion.h2>

        {/* INPUT FIELD STYLE */}
        {[
          { key: "companyName", placeholder: "Company Name" },
          { key: "website", placeholder: "Website URL" },
          { key: "location", placeholder: "Location" },
          { key: "industry", placeholder: "Industry (IT, AI, Fintech)" },
        ].map((field, i) => (
          <motion.input
            key={field.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            placeholder={field.placeholder}
            className="w-full p-3 mb-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300"
            value={form[field.key]}
            onChange={(e) =>
              setForm({ ...form, [field.key]: e.target.value })
            }
          />
        ))}

        {/* DESCRIPTION */}
        <motion.textarea
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          placeholder="Company Description"
          rows={3}
          className="w-full p-3 mb-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* COMPANY SIZE */}
        <motion.select
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full p-3 mb-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={form.companySize}
          onChange={(e) =>
            setForm({ ...form, companySize: e.target.value })
          }
        >
          <option value="" className="text-black">Company Size</option>
          <option value="1-10" className="text-black">1-10</option>
          <option value="10-50" className="text-black">10-50</option>
          <option value="50-200" className="text-black">50-200</option>
          <option value="200+" className="text-black">200+</option>
        </motion.select>

        {/* FOUNDED YEAR */}
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          type="number"
          placeholder="Founded Year"
          className="w-full p-3 mb-6 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300"
          value={form.foundedYear}
          onChange={(e) =>
            setForm({ ...form, foundedYear: e.target.value })
          }
        />

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
        >
          Save Profile 🚀
        </motion.button>
      </motion.form>
    </div>
  );
}