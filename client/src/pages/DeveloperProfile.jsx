import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";

import {
  Camera,
  X,
  Code2,
  Link2,
  Globe,
  BriefcaseBusiness,
  ChevronDown,
  Sparkles,
  User2,
  Star,
  ShieldCheck,

  Laptop2,
} from "lucide-react";

const PREDEFINED_SKILLS = [
  "React",
  "Node.js",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "JavaScript",
  "Python",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Framer Motion",
  "GraphQL",
  "Redux",
  "Express.js",
  "Firebase",
  "Java",
  "C++",
  "C",
  "PHP",
  "Laravel",
  "NestJS",
  "Spring Boot",
  "Prisma",
  "Redis",
  "Socket.io",
  "React Native",
  "Flutter",
  "Figma",
  "Git",
  "GitHub",
  "CI/CD",
  "Vercel",
  "Netlify",
  "Linux",
  "Machine Learning",
  "AI",
  "Data Structures",
  "REST API",
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
    },
  },
};

export default function DeveloperProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    bio: "",
    experience: "",
    experienceType: "years",
    gitHub: "",
    linkedin: "",
    portfolio: "",
    photo: null,
  });

  const [skills, setSkills] = useState([]);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const getInitials = () => {
    if (!user?.name) return "D";

    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    API.get("/developer/profile")
      .then((res) => {
        const data = res.data;

        setForm({
          bio: data.bio || "",
          experience: data.experience || "",
          experienceType: data.experienceType || "years",
          github: data.github || "",
          linkedin: data.linkedin || "",
          portfolio: data.portfolio || "",
          photo: null,
        });

        setSkills(data.skills ? data.skills.split(",") : []);

        if (data.photo) {
          setPreview(`http://localhost:5000/${data.photo}`);
        }
      })
      .catch(() => console.log("No profile"));
  }, []);

  const profileCompletion = useMemo(() => {
    let score = 0;

    if (form.bio) score += 20;
    if (form.experience) score += 20;
    if (skills.length > 0) score += 20;
    if (form.GitHub) score += 10;
    if (form.linkedin) score += 10;
    if (form.portfolio) score += 10;
    if (preview) score += 10;

    return score;
  }, [form, skills, preview]);

  const validateURL = (url) => {
    if (!url) return true;

    try {
      new URL(
        url.startsWith("http") ? url : `https://${url}`
      );

      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.bio.trim()) {
      newErrors.bio = "Professional bio is required";
    } else if (form.bio.length < 30) {
      newErrors.bio =
        "Bio should be at least 30 characters";
    }

    if (!form.experience) {
      newErrors.experience =
        "Experience field is required";
    }

    if (skills.length < 3) {
      newErrors.skills =
        "Add at least 3 professional skills";
    }

    if (
      form.github &&
      !validateURL(form.github)
    ) {
      newErrors.github = "Invalid GitHub URL";
    }

    if (
      form.linkedin &&
      !validateURL(form.linkedin)
    ) {
      newErrors.linkedin = "Invalid LinkedIn URL";
    }

    if (
      form.portfolio &&
      !validateURL(form.portfolio)
    ) {
      newErrors.portfolio =
        "Invalid portfolio website";
    }

    if (form.photo) {
      const allowed = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];

      if (!allowed.includes(form.photo.type)) {
        newErrors.photo =
          "Only PNG, JPG, JPEG, WEBP allowed";
      }

      if (form.photo.size > 2 * 1024 * 1024) {
        newErrors.photo =
          "Image size should be below 2MB";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    const data = new FormData();

    Object.keys(form).forEach((k) => {
      if (form[k]) {
        data.append(k, form[k]);
      }
    });

    data.append("skills", skills.join(","));

    try {
      setLoading(true);

      await API.post("/developer/profile", data);

      toast.success("Profile published successfully ✨");
    } catch (err) {
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#050816] text-white overflow-hidden">

      <Sidebar />

      <main
        className="
          flex-1
          lg:ml-[320px]
          pt-24 lg:pt-8
          px-4 sm:px-6 md:px-8
          pb-10
          relative
        "
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 120, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"
          />

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -120, 0],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto relative z-10"
        >

          {/* HEADER */}
          <motion.div
            variants={fadeUp}
            className="
              flex flex-col xl:flex-row
              xl:items-center
              xl:justify-between
              gap-6 mb-8
            "
          >

            <div>

              <div className="flex items-center gap-2 mb-4">

                <Sparkles
                  size={16}
                  className="text-purple-400"
                />

                <p className="uppercase tracking-[0.25em] text-xs text-purple-300 font-semibold">
                  Premium Developer Workspace
                </p>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">

                Build Your{" "}

                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Professional Identity
                </span>
              </h1>

              <p className="text-gray-400 mt-4 max-w-2xl leading-relaxed text-sm sm:text-base">
                Create a recruiter-ready developer profile
                with a premium portfolio experience.
              </p>
            </div>

            {/* PROFILE STATUS */}
            <div className="grid grid-cols-2 gap-4 w-full xl:w-auto">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl min-w-[150px]">
                <p className="text-gray-400 text-sm">
                  Experience
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  {form.experience || 0}{" "}
                  {form.experienceType === "months"
                    ? "Months"
                    : "Years"}
                </h3>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl min-w-[150px]">
                <p className="text-gray-400 text-sm">
                  Completion
                </p>

                <h3 className="text-2xl font-bold mt-2 text-emerald-400">
                  {profileCompletion}%
                </h3>
              </div>
            </div>
          </motion.div>

          {/* CONTENT */}
          <div className="grid xl:grid-cols-12 gap-8">

            {/* LEFT PANEL */}
            <motion.div
              variants={fadeUp}
              className="xl:col-span-4"
            >

              <div className="xl:sticky xl:top-8">

                <div className="bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-2xl p-6 md:p-8 relative overflow-hidden">

                  {/* GLOW */}
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />

                  <div className="relative z-10 flex flex-col items-center">

                    {/* PROFILE IMAGE */}
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      className="relative"
                    >

                      <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-[4px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-[0_0_50px_rgba(168,85,247,0.4)]">

                        {preview ? (
                          <img
                            src={preview}
                            alt="profile"
                            className="w-full h-full rounded-full object-cover border-[5px] border-[#050816]"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black border-[5px] border-[#050816] flex items-center justify-center text-5xl font-black">
                            {getInitials()}
                          </div>
                        )}
                      </div>

                      <label className="absolute bottom-2 right-2 bg-black/70 border border-white/10 p-3 rounded-full cursor-pointer hover:scale-110 transition-all backdrop-blur-xl">

                        <Camera size={18} />

                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file =
                              e.target.files[0];

                            if (file) {
                              setForm({
                                ...form,
                                photo: file,
                              });

                              setPreview(
                                URL.createObjectURL(file)
                              );
                            }
                          }}
                        />
                      </label>
                    </motion.div>

                    {errors.photo && (
                      <p className="text-red-400 text-xs mt-3">
                        {errors.photo}
                      </p>
                    )}

                    {/* USER */}
                    <h2 className="text-2xl sm:text-3xl font-bold mt-6 text-center">
                      {user?.name}
                    </h2>

                    <p className="text-purple-300 text-sm mt-2 text-center break-all">
                      {user?.email}
                    </p>

                    {/* VERIFIED */}
                    <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                      <ShieldCheck size={15} />
                      Verified Developer
                    </div>

                    <div className="w-full h-px bg-white/10 my-6" />

                    {/* STATS */}
                    <div className="grid grid-cols-2 gap-4 w-full">

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <BriefcaseBusiness size={15} />
                          Experience
                        </div>

                        <p className="text-lg font-bold mt-2">
                          {form.experience || 0}{" "}
                          {form.experienceType === "months"
                            ? "Months"
                            : "Years"}
                        </p>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Star size={15} />
                          Skills
                        </div>

                        <p className="text-lg font-bold mt-2">
                          {skills.length}
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/10 my-6" />

                    {/* BIO PREVIEW */}
                    <p className="text-gray-400 text-sm text-center leading-relaxed italic">
                      {form.bio
                        ? `"${form.bio}"`
                        : "Your professional summary preview will appear here."}
                    </p>

                    {/* SKILLS */}
                    <div className="flex flex-wrap justify-center gap-2 mt-6">

                      <AnimatePresence>

                        {skills.map((skill) => (
                          <motion.div
                            key={skill}
                            layout
                            initial={{
                              opacity: 0,
                              scale: 0.8,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.8,
                            }}
                            className="bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-xs sm:text-sm text-purple-300"
                          >
                            {skill}
                          </motion.div>
                        ))}

                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div
              variants={fadeUp}
              className="xl:col-span-8"
            >

              <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-5 sm:p-8 md:p-10">

                <div className="space-y-8">

                  {/* BIO */}
                  <div>

                    <label className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 font-semibold">

                      <User2
                        size={16}
                        className="text-purple-400"
                      />

                      Professional Bio
                    </label>

                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      rows={5}
                      value={form.bio}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          bio: e.target.value,
                        })
                      }
                      placeholder="Tell recruiters about your experience, passion, achievements, and tech expertise..."
                      className={`w-full rounded-3xl bg-black/30 border p-5 resize-none focus:outline-none transition-all ${errors.bio
                        ? "border-red-500"
                        : "border-white/10 focus:border-purple-500"
                        }`}
                    />

                    {errors.bio && (
                      <p className="text-red-400 text-sm mt-2">
                        {errors.bio}
                      </p>
                    )}
                  </div>

                  {/* SKILLS */}
                  <div>

                    <label className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-400 mb-4 font-semibold">

                      <Laptop2
                        size={16}
                        className="text-purple-400"
                      />

                      Skills & Technologies
                    </label>

                    <div className="relative">

                      <select
                        className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 appearance-none focus:outline-none focus:border-purple-500 text-gray-300"
                        onChange={(e) => {
                          const val = e.target.value;

                          if (
                            val &&
                            !skills.includes(val)
                          ) {
                            setSkills([
                              ...skills,
                              val,
                            ]);
                          }

                          e.target.value = "";
                        }}
                      >

                        <option value="">
                          Select a skill
                        </option>

                        {PREDEFINED_SKILLS.map(
                          (skill) => (
                            <option
                              key={skill}
                              value={skill}
                              className="bg-[#111]"
                            >
                              {skill}
                            </option>
                          )
                        )}
                      </select>

                      <ChevronDown
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>

                    {errors.skills && (
                      <p className="text-red-400 text-sm mt-3">
                        {errors.skills}
                      </p>
                    )}

                    <motion.div
                      layout
                      className="flex flex-wrap gap-3 mt-5"
                    >

                      <AnimatePresence>

                        {skills.map((skill) => (
                          <motion.div
                            key={skill}
                            layout
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.8,
                            }}
                            onClick={() =>
                              setSkills(
                                skills.filter(
                                  (s) => s !== skill
                                )
                              )
                            }
                            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 cursor-pointer transition-all group"
                          >
                            <span className="text-sm text-gray-300 group-hover:text-red-300">
                              {skill}
                            </span>

                            <X
                              size={14}
                              className="text-gray-500 group-hover:text-red-400"
                            />
                          </motion.div>
                        ))}

                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* EXPERIENCE */}
                  <div className="grid md:grid-cols-2 gap-6">

                    <div>

                      <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-3 font-semibold">

                        <BriefcaseBusiness size={14} />

                        Experience
                      </label>

                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="number"
                        placeholder="e.g. 2"
                        value={form.experience}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            experience: e.target.value,
                          })
                        }
                        className={`w-full rounded-2xl bg-black/30 border p-4 focus:outline-none transition-all ${errors.experience
                          ? "border-red-500"
                          : "border-white/10 focus:border-purple-500"
                          }`}
                      />

                      {errors.experience && (
                        <p className="text-red-400 text-sm mt-2">
                          {errors.experience}
                        </p>
                      )}
                    </div>

                    {/* TYPE */}
                    <div>

                      <label className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3 font-semibold block">
                        Experience Type
                      </label>

                      <select
                        value={form.experienceType}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            experienceType:
                              e.target.value,
                          })
                        }
                        className="w-full rounded-2xl bg-black/30 border border-white/10 p-4 focus:outline-none focus:border-purple-500"
                      >
                        <option value="months">
                          Months
                        </option>

                        <option value="years">
                          Years
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* LINKS */}
                  <div className="grid md:grid-cols-3 gap-6">

                    {/* GitHub */}
                    <div>

                      <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-3 font-semibold">

                        GitHub
                      </label>

                      <input
                        placeholder="https://gitHub.com/username"
                        value={form.GitHub}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            GitHub: e.target.value,
                          })
                        }
                        className={`w-full rounded-2xl bg-black/30 border p-4 focus:outline-none transition-all ${errors.GitHub
                          ? "border-red-500"
                          : "border-white/10 focus:border-purple-500"
                          }`}
                      />

                      {errors.GitHub && (
                        <p className="text-red-400 text-sm mt-2">
                          {errors.GitHub}
                        </p>
                      )}
                    </div>

                    {/* LINKEDIN */}
                    <div>

                      <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-3 font-semibold">

                        LinkedIn
                      </label>

                      <input
                        placeholder="https://linkedin.com/in/username"
                        value={form.linkedin}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            linkedin: e.target.value,
                          })
                        }
                        className={`w-full rounded-2xl bg-black/30 border p-4 focus:outline-none transition-all ${errors.linkedin
                          ? "border-red-500"
                          : "border-white/10 focus:border-purple-500"
                          }`}
                      />

                      {errors.linkedin && (
                        <p className="text-red-400 text-sm mt-2">
                          {errors.linkedin}
                        </p>
                      )}
                    </div>

                    {/* PORTFOLIO */}
                    <div>

                      <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-3 font-semibold">
                        <Globe size={14} />
                        Portfolio
                      </label>

                      <input
                        placeholder="https://yourportfolio.com"
                        value={form.portfolio}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            portfolio:
                              e.target.value,
                          })
                        }
                        className={`w-full rounded-2xl bg-black/30 border p-4 focus:outline-none transition-all ${errors.portfolio
                          ? "border-red-500"
                          : "border-white/10 focus:border-purple-500"
                          }`}
                      />

                      {errors.portfolio && (
                        <p className="text-red-400 text-sm mt-2">
                          {errors.portfolio}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* SAVE BUTTON */}
                  <motion.button
                    whileHover={{
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    disabled={loading}
                    onClick={handleSubmit}
                    className="w-full relative overflow-hidden rounded-3xl py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 font-bold text-lg shadow-[0_0_50px_rgba(168,85,247,0.35)] hover:shadow-[0_0_70px_rgba(168,85,247,0.5)] transition-all"
                  >

                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />

                    <span className="relative z-10 flex items-center justify-center gap-3">

                      {loading ? (
                        <motion.div
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                          }}
                        >
                          <Camera />
                        </motion.div>
                      ) : (
                        <>
                          <Sparkles size={20} />
                          Save & Publish Profile
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}