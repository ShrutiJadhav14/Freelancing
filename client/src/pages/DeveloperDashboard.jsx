import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { motion } from "framer-motion";

export default function Dashboard() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return nav("/login");

    if (user.role === "company") {
      nav("/company");
      return;
    }

    // fetch developer profile
    API.get("/developer/profile")
      .then(res => setProfile(res.data))
      .catch(() => console.log("No profile yet"));
  }, []);

  const getInitials = () => {
    if (!user?.name) return "D";
    return user.name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="text-gray-500">
            Here's what's happening with your profile
          </p>
        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <motion.div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">Experience</h3>
            <p className="text-2xl font-bold">
              {profile?.experience || 0} yrs
            </p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">Skills</h3>
            <p className="text-2xl font-bold">
              {profile?.skills ? profile.skills.split(",").length : 0}
            </p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500 text-sm">Profile Status</h3>
            <p className="text-2xl font-bold text-green-600">
              {profile ? "Complete" : "Incomplete"}
            </p>
          </motion.div>

        </div>

        {/* 🔥 PROFILE PREVIEW */}
        <div className="bg-white p-6 rounded-3xl shadow-xl grid md:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="flex flex-col items-center border-r pr-6">

            {profile?.photo ? (
              <img
                src={`http://localhost:5000/${profile.photo}`}
                className="w-28 h-28 rounded-full object-cover"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
                {getInitials()}
              </div>
            )}

            <h2 className="mt-4 font-semibold">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>

            <button
              onClick={() => nav("/developer/profile")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-2">

            <h3 className="font-semibold mb-2">Bio</h3>
            <p className="text-gray-600 mb-4">
              {profile?.bio || "No bio added yet"}
            </p>

            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile?.skills
                ? profile.skills.split(",").map((s, i) => (
                    <span
                      key={i}
                      className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm"
                    >
                      {s}
                    </span>
                  ))
                : <p className="text-gray-400">No skills added</p>}
            </div>

            <h3 className="font-semibold mb-2">Links</h3>
            <div className="space-y-1 text-sm">
              {profile?.github && (
                <p>GitHub: {profile.github}</p>
              )}
              {profile?.linkedin && (
                <p>LinkedIn: {profile.linkedin}</p>
              )}
              {profile?.portfolio && (
                <p>Portfolio: {profile.portfolio}</p>
              )}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}