import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const stats = [
    { label: "Elite Developers", value: "5,000+" },
    { label: "Trusted Companies", value: "200+" },
    { label: "Successful Hires", value: "10k+" },
  ];

  const features = [
    { 
      title: "Verified Talent", 
      desc: "Every developer is manually vetted through technical tests and project reviews.",
      icon: "🛡️"
    },
    { 
      title: "Direct Access", 
      desc: "No middlemen. Talk directly to developers and hire them in minutes, not weeks.",
      icon: "⚡"
    },
    { 
      title: "Secure Payments", 
      desc: "Built-in escrow and payment systems to ensure work is delivered and paid for.",
      icon: "💎"
    },
  ];

  const steps = [
    { title: "Create Profile", desc: "Showcase your skills or company needs.", icon: "📝" },
    { title: "Find Matches", desc: "Our AI pairs you with the perfect project or talent.", icon: "🔍" },
    { title: "Start Working", desc: "Collaborate and get things done securely.", icon: "🚀" },
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "CTO at TechFlow", text: "DevHire helped us find a Lead React dev in 48 hours. The quality is unmatched." },
    { name: "Alex Rivera", role: "Fullstack Developer", text: "I landed my dream remote job through this platform. The process was so smooth!" },
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-16 py-5 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tighter">
          DevConnect
        </h1>

        <div className="flex items-center gap-6">
          <button
            className="text-sm font-medium text-gray-400 hover:text-white transition"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          <button
            className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm text-xs font-medium text-purple-400"
        >
          ✨ The future of tech hiring is here
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-8"
        >
          Hire the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Best 1%</span> of Developers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          DevConnect is where world-class companies meet verified, top-tier talent. 
          Skip the endless interviews and start building today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <button
            onClick={() => navigate("/register?role=company")}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/20 transition-all hover:-translate-y-1"
          >
            Hire a Developer
          </button>

          <button
            onClick={() => navigate("/register?role=developer")}
            className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold text-lg backdrop-blur-sm transition-all hover:-translate-y-1"
          >
            Apply as Talent
          </button>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto border-y border-white/5 py-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</h2>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why choose DevConnect?</h2>
          <p className="text-gray-400">We prioritize quality over quantity at every step.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-all"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-gray-400">Getting started is easier than you think.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center text-3xl mx-auto mb-6 border border-purple-500/20">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
                {i < 2 && (
                   <div className="hidden md:block absolute top-8 left-[70%] w-full h-[1px] bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10">
              <p className="text-xl italic text-gray-300 mb-8">"{t.text}"</p>
              <div>
                <h4 className="font-bold">{t.name}</h4>
                <p className="text-purple-400 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto p-12 rounded-[40px] bg-gradient-to-b from-purple-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Ready to build something great?</h2>
          <p className="text-purple-100 mb-10 text-lg relative z-10">Join thousands of companies and developers already on DevConnect.</p>
          <button 
            onClick={() => navigate("/register")}
            className="px-10 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-105 transition-all relative z-10"
          >
            Join the Network Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <h1 className="text-xl font-bold mb-6">DevConnect</h1>
            <p className="text-gray-500 text-sm">Building the bridge between elite talent and innovation.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-white cursor-pointer transition">For Companies</li>
              <li className="hover:text-white cursor-pointer transition">For Developers</li>
              <li className="hover:text-white cursor-pointer transition">Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-white cursor-pointer transition">Documentation</li>
              <li className="hover:text-white cursor-pointer transition">Guides</li>
              <li className="hover:text-white cursor-pointer transition">API Reference</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-white cursor-pointer transition">About Us</li>
              <li className="hover:text-white cursor-pointer transition">Blog</li>
              <li className="hover:text-white cursor-pointer transition">Contact</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs">© 2026 DevConnect Inc. All rights reserved.</p>
          <div className="flex gap-6 text-gray-500 text-xs">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </footer>
    </div>
  );
}