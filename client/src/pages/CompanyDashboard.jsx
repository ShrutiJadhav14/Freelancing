import { useEffect, useState } from "react";
import { getCompanyProfile } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CompanyDashboard() {
  const [company, setCompany] = useState(null);
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    nav("/login");
  };

  const goHome = () => {
    nav("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCompanyProfile();
        setCompany(res.data);
      } catch {
        setCompany(null);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={goHome}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
        >
          🏠 Home
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          🚪 Logout
        </button>
      </div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold">Company Dashboard 🚀</h1>
        <p className="text-gray-400 mt-2">
          Manage your company profile and hire top developers.
        </p>
      </motion.div>

      {/* EMPTY STATE */}
      {!company ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl text-center"
        >
          <h2 className="text-2xl font-semibold mb-3">
            No Profile Found 😕
          </h2>
          <p className="text-gray-400 mb-6">
            Create your company profile to start hiring developers.
          </p>

          <button
            onClick={() => nav("/company/profile")}
            className="bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Create Profile
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* MAIN CARD */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-2">
              {company.companyName}
            </h2>

            <p className="text-gray-300 mb-4">
              {company.description}
            </p>

            <div className="space-y-2 text-gray-400">
              <p>📍 {company.location || "Not specified"}</p>
              <p>🌐 {company.website || "Not specified"}</p>
              <p>🏢 {company.industry || "Not specified"}</p>
            </div>

            <button
              onClick={() => nav("/company/profile")}
              className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </div>

          {/* STATS / ACTION PANEL */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl flex flex-col justify-between">

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Quick Actions ⚡
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => nav("/developers")}
                  className="w-full bg-purple-600 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Browse Developers
                </button>

                <button className="w-full bg-green-600 py-2 rounded-lg hover:bg-green-700 transition">
                  Post Requirement
                </button>
              </div>
            </div>

            <div className="mt-6 text-gray-400 text-sm">
              🚀 Start hiring within minutes
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}