import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-6 backdrop-blur-md bg-white/5 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide">DevHire</h1>

        <div className="space-x-4">
          <button
            className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-105 transition"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center mt-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          Hire Elite Developers <br />
          <span className="text-purple-400">Without the Chaos</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-gray-400 max-w-xl mx-auto"
        >
          No bidding. No spam. Just verified developers ready to work on real projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
          <button
            onClick={() => navigate("/register?role=company")}
            className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
          >
            Hire Developer
          </button>

          <button
            onClick={() => navigate("/register?role=developer")}
            className="px-6 py-3 border border-gray-500 rounded-xl hover:bg-white/10 transition"
          >
            Join as Developer
          </button>
        </motion.div>
      </div>

      {/* ABOUT SECTION */}
      <div className="mt-28 px-10 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">About DevHire</h2>
        <p className="text-gray-400">
          DevHire is a direct hiring platform where companies connect with developers instantly.
          No middlemen, no delays — just real talent and real work.
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-10 mt-16">
        {[
          { title: "Verified Talent", desc: "Only skilled developers with real projects." },
          { title: "Direct Hiring", desc: "No bidding. Hire instantly." },
          { title: "Fast Process", desc: "Find developers in minutes." },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-400 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-24 pb-20">
        <h2 className="text-3xl font-bold">Start hiring today 🚀</h2>

        <button
          onClick={() => navigate("/register")}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:scale-105 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}