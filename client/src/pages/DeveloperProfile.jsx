import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import { Camera, X } from "lucide-react";

const PREDEFINED_SKILLS = [
  "React","Node.js","TypeScript","Next.js","Tailwind",
  "Python","MongoDB","PostgreSQL","AWS","Docker"
];

export default function DeveloperProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    bio: "",
    experience: "",
    github: "",
    linkedin: "",
    portfolio: "",
    photo: null,
  });

  const [skills, setSkills] = useState([]);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const getInitials = () => {
    if (!user?.name) return "D";
    return user.name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  useEffect(() => {
    API.get("/developer/profile")
      .then(res => {
        const data = res.data;

        setForm({
          bio: data.bio || "",
          experience: data.experience || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          portfolio: data.portfolio || "",
          photo: null,
        });

        setSkills(data.skills ? data.skills.split(",") : []);
        if (data.photo) setPreview(`http://localhost:5000/${data.photo}`);
      })
      .catch(() => console.log("No profile"));
  }, []);

  const handleSubmit = async () => {
    const data = new FormData();
    Object.keys(form).forEach(k => form[k] && data.append(k, form[k]));
    data.append("skills", skills.join(","));

    try {
      setLoading(true);
      await API.post("/developer/profile", data);
      toast.success("Profile updated 🚀");
    } catch {
      toast.error("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* 🔥 PROFILE PREVIEW */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl flex flex-col items-center">
            
            <div className="relative">
              {preview ? (
                <img src={preview} className="w-32 h-32 rounded-full object-cover" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
                  {getInitials()}
                </div>
              )}

              <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer text-white">
                <Camera size={16} />
                <input type="file" hidden onChange={(e) => {
                  const file = e.target.files[0];
                  setForm({ ...form, photo: file });
                  setPreview(URL.createObjectURL(file));
                }} />
              </label>
            </div>

            <h2 className="mt-4 text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>

            <p className="text-center text-sm mt-4 text-gray-600">
              {form.bio || "Your bio will appear here..."}
            </p>

            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {skills.map((s, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* 🔥 EDIT PANEL */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-xl">

            <textarea
              placeholder="Write your bio..."
              className="w-full p-4 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />

            {/* SKILLS */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <AnimatePresence>
                  {skills.map(skill => (
                    <motion.span
                      key={skill}
                      className="bg-indigo-100 px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      {skill}
                      <X size={14} onClick={() => setSkills(skills.filter(s => s !== skill))} />
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>

              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && !skills.includes(val)) setSkills([...skills, val]);
                }}
                className="p-2 border rounded-lg"
              >
                <option>Add skill</option>
                {PREDEFINED_SKILLS.map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* INPUTS */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="number"
                placeholder="Experience"
                className="p-3 border rounded-xl"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
              />

              <input
                placeholder="GitHub"
                className="p-3 border rounded-xl"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
              />

              <input
                placeholder="LinkedIn"
                className="p-3 border rounded-xl"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              />

              <input
                placeholder="Portfolio"
                className="p-3 border rounded-xl"
                value={form.portfolio}
                onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:scale-[1.02] transition"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}