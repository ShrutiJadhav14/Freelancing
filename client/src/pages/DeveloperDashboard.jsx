import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ArrowUpRight,
  Briefcase,
  Code2,


  Globe,
  Sparkles,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import API from "../services/api";

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

    API.get("/developer/profile")
      .then((res) => setProfile(res.data))
      .catch(() => console.log("No profile yet"));
  }, []);

  const getInitials = () => {
    if (!user?.name) return "D";

    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const stats = [
    {
      title: "Experience",
      value: `${profile?.experience || 0} yrs`,
      icon: "🚀",
      glow: "from-indigo-500/20 to-purple-500/20",
    },
    {
      title: "Skills",
      value: profile?.skills
        ? profile.skills.split(",").length
        : 0,
      icon: "🧠",
      glow: "from-pink-500/20 to-purple-500/20",
    },
    {
      title: "Profile Status",
      value: profile ? "Complete" : "Incomplete",
      icon: profile ? "✅" : "⚠️",
      glow: "from-emerald-500/20 to-teal-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main
        className="
          relative z-10
          lg:ml-[290px]
          pt-24 lg:pt-10
          p-4 sm:p-6 md:p-8 lg:p-10
          transition-all duration-300
        "
      >

        {/* BACKGROUND EFFECTS */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute top-0 left-10 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px]" />

          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px]" />

          <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-pink-500/10 rounded-full blur-[100px]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-5 backdrop-blur-xl">
              <Sparkles size={14} />
              Premium Developer Workspace
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {user?.name}
              </span>
            </h1>

            <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-2xl leading-relaxed">
              Track your profile growth, showcase your skills,
              and keep your portfolio recruiter-ready.
            </p>
          </motion.div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">

            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                }}
                className="
                  relative overflow-hidden
                  rounded-[28px]
                  border border-white/10
                  bg-white/[0.04]
                  backdrop-blur-2xl
                  p-6
                  shadow-[0_10px_50px_rgba(0,0,0,0.35)]
                "
              >

                {/* glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.glow}`}
                />

                <div className="relative z-10">

                  <div className="flex items-center justify-between mb-6">

                    <div>
                      <p className="text-slate-400 text-sm">
                        {stat.title}
                      </p>
                    </div>

                    <div className="text-3xl">
                      {stat.icon}
                    </div>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black">
                    {stat.value}
                  </h2>
                </div>
              </motion.div>
            ))}
          </div>

          {/* PROFILE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              relative overflow-hidden
              rounded-[34px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-3xl
              shadow-[0_20px_80px_rgba(0,0,0,0.4)]
            "
          >

            {/* card glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

            <div className="grid xl:grid-cols-3">

              {/* LEFT PANEL */}
              <div
                className="
                  xl:border-r border-white/10
                  p-6 sm:p-8
                  bg-white/[0.03]
                "
              >

                <div className="flex flex-col items-center text-center">

                  {/* PROFILE IMAGE */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >

                    {profile?.photo ? (
                      <img
                        src={`http://localhost:5000/${profile.photo}`}
                        alt="profile"
                        className="
                          w-32 h-32 sm:w-36 sm:h-36
                          rounded-full
                          object-cover
                          border-4 border-indigo-500/50
                          shadow-[0_0_40px_rgba(99,102,241,0.45)]
                        "
                      />
                    ) : (
                      <div
                        className="
                          w-32 h-32 sm:w-36 sm:h-36
                          rounded-full
                          bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                          flex items-center justify-center
                          text-4xl font-black
                          shadow-[0_0_50px_rgba(168,85,247,0.45)]
                        "
                      >
                        {getInitials()}
                      </div>
                    )}

                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-emerald-500 border-4 border-[#050816] flex items-center justify-center shadow-lg">
                      ✨
                    </div>
                  </motion.div>

                  {/* USER INFO */}
                  <h2 className="mt-6 text-2xl font-bold">
                    {user?.name}
                  </h2>

                  <p className="text-slate-400 text-sm mt-2 break-all">
                    {user?.email}
                  </p>

                  {/* BUTTON */}
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    onClick={() =>
                      nav("/developer/profile")
                    }
                    className="
                      mt-7
                      px-6 py-3
                      rounded-2xl
                      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                      text-white
                      font-semibold
                      shadow-[0_0_40px_rgba(168,85,247,0.35)]
                      hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]
                      transition-all
                    "
                  >
                    Edit Profile
                  </motion.button>

                  {/* MINI CARDS */}
                  <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left">
                      <div className="flex items-center gap-3 mb-3">

                        <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <Briefcase size={20} />
                        </div>

                        <div>
                          <p className="text-sm text-slate-400">
                            Experience
                          </p>

                          <h4 className="font-bold text-lg">
                            {profile?.experience || 0} Years
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left">
                      <div className="flex items-center gap-3 mb-3">

                        <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                          <Code2 size={20} />
                        </div>

                        <div>
                          <p className="text-sm text-slate-400">
                            Skills Added
                          </p>

                          <h4 className="font-bold text-lg">
                            {profile?.skills
                              ? profile.skills.split(",").length
                              : 0}
                          </h4>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="xl:col-span-2 p-6 sm:p-8 lg:p-10">

                {/* ABOUT */}
                <section className="mb-10">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Sparkles size={18} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold">
                        About
                      </h3>

                      <p className="text-slate-500 text-sm">
                        Professional summary
                      </p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 leading-relaxed text-slate-300">
                    {profile?.bio ||
                      "No bio added yet. Add a professional summary to stand out to recruiters and companies."}
                  </div>
                </section>

                {/* SKILLS */}
                <section className="mb-10">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Code2 size={18} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold">
                        Skills
                      </h3>

                      <p className="text-slate-500 text-sm">
                        Your technology stack
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">

                    <AnimatePresence>

                      {profile?.skills ? (
                        profile.skills
                          .split(",")
                          .map((skill, i) => (
                            <motion.div
                              key={i}
                              initial={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              whileHover={{
                                scale: 1.08,
                                y: -2,
                              }}
                              className="
                                px-5 py-3
                                rounded-2xl
                                bg-indigo-500/10
                                border border-indigo-500/20
                                text-indigo-300
                                text-sm font-medium
                                shadow-lg
                              "
                            >
                              {skill.trim()}
                            </motion.div>
                          ))
                      ) : (
                        <p className="text-slate-500">
                          No skills added yet
                        </p>
                      )}

                    </AnimatePresence>
                  </div>
                </section>

                {/* LINKS */}
                <section>

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-11 h-11 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                      <Globe size={18} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold">
                        Professional Links
                      </h3>

                      <p className="text-slate-500 text-sm">
                        Portfolio & social presence
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">

                    {profile?.github && (
                      <motion.a
                        whileHover={{ scale: 1.01 }}
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          flex items-center justify-between
                          rounded-3xl
                          border border-white/10
                          bg-white/[0.03]
                          hover:bg-white/[0.05]
                          p-5
                          transition-all
                          group
                        "
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white">

                          </div>

                          <div>
                            <p className="text-sm text-slate-400">
                              GitHub
                            </p>

                            <h4 className="text-indigo-300 break-all">
                              {profile.github}
                            </h4>
                          </div>
                        </div>

                        <ArrowUpRight className="text-slate-500 group-hover:text-white transition-all" />
                      </motion.a>
                    )}

                    {profile?.linkedin && (
                      <motion.a
                        whileHover={{ scale: 1.01 }}
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          flex items-center justify-between
                          rounded-3xl
                          border border-white/10
                          bg-white/[0.03]
                          hover:bg-white/[0.05]
                          p-5
                          transition-all
                          group
                        "
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">

                          </div>

                          <div>
                            <p className="text-sm text-slate-400">
                              LinkedIn
                            </p>

                            <h4 className="text-indigo-300 break-all">
                              {profile.linkedin}
                            </h4>
                          </div>
                        </div>

                        <ArrowUpRight className="text-slate-500 group-hover:text-white transition-all" />
                      </motion.a>
                    )}

                    {profile?.portfolio && (
                      <motion.a
                        whileHover={{ scale: 1.01 }}
                        href={profile.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          flex items-center justify-between
                          rounded-3xl
                          border border-white/10
                          bg-white/[0.03]
                          hover:bg-white/[0.05]
                          p-5
                          transition-all
                          group
                        "
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                            <Globe size={20} />
                          </div>

                          <div>
                            <p className="text-sm text-slate-400">
                              Portfolio
                            </p>

                            <h4 className="text-indigo-300 break-all">
                              {profile.portfolio}
                            </h4>
                          </div>
                        </div>

                        <ArrowUpRight className="text-slate-500 group-hover:text-white transition-all" />
                      </motion.a>
                    )}

                    {!profile?.github &&
                      !profile?.linkedin &&
                      !profile?.portfolio && (
                        <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-slate-500">
                          No professional links added yet
                        </div>
                      )}

                  </div>
                </section>

              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}