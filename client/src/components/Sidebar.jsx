import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Bell,
  Settings,
} from "lucide-react";

import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const menu = [
    {
      name: "Dashboard",
      path: "/developer",
      icon: LayoutDashboard,
    },
    {
      name: "My Profile",
      path: "/developer/profile",
      icon: User,
    },
  ];

  const secondaryMenu = [
    {
      name: "Notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const getInitials = () => {
    if (!user?.name) return "D";

    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[60] px-4 py-4 bg-[#050816]/80 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <Sparkles size={18} className="text-white" />
          </div>

          <div>
            <h1 className="text-white font-black text-lg leading-none">
              DevConnect
            </h1>

            <p className="text-[10px] tracking-[0.25em] uppercase text-purple-300 mt-1">
              Premium
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{
          x: open || window.innerWidth >= 1024 ? 0 : -320,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 18,
        }}
        className="
          fixed top-0 left-0 z-50
          w-[290px] h-screen
          bg-[#070b1a]/95
          backdrop-blur-3xl
          border-r border-white/10
          shadow-[0_0_60px_rgba(0,0,0,0.45)]
          overflow-y-auto
        "
      >

        {/* GLOW */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-[-120px] left-[-80px] w-[260px] h-[260px] bg-purple-600/20 rounded-full blur-[100px]" />

          <div className="absolute bottom-[-120px] right-[-80px] w-[260px] h-[260px] bg-indigo-600/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between min-h-screen p-6">

          {/* TOP */}
          <div>

            {/* LOGO */}
            <div className="flex items-center gap-4 mb-10">

              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                className="
                  w-14 h-14 rounded-2xl
                  bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500
                  flex items-center justify-center
                  shadow-[0_0_35px_rgba(168,85,247,0.45)]
                "
              >
                <Sparkles size={24} className="text-white" />
              </motion.div>

              <div>
                <h1 className="text-2xl font-black text-white">
                  DevConnect
                </h1>

                <p className="text-xs uppercase tracking-[0.25em] text-purple-300 mt-1">
                  Workspace
                </p>
              </div>
            </div>

            {/* USER CARD */}
            <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 mb-8 backdrop-blur-xl">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-lg font-black shadow-lg">
                  {getInitials()}
                </div>

                <div className="overflow-hidden">

                  <h2 className="font-bold text-white truncate">
                    {user?.name}
                  </h2>

                  <p className="text-sm text-gray-400 truncate">
                    {user?.email}
                  </p>

                  <div className="mt-2 inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    ACTIVE
                  </div>
                </div>
              </div>
            </div>

            {/* MENU */}
            <div className="space-y-3">

              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 px-2 mb-4">
                Main Menu
              </p>

              {menu.map((item, index) => {
                const isActive =
                  location.pathname === item.path;

                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`
                      group relative overflow-hidden
                      flex items-center justify-between
                      px-5 py-4 rounded-2xl
                      transition-all duration-300
                      border
                      ${isActive
                        ? `
                          bg-gradient-to-r
                          from-purple-500/20
                          to-indigo-500/20
                          border-purple-500/30
                        `
                        : `
                          bg-white/[0.03]
                          border-white/5
                          hover:bg-white/10
                        `
                      }
                    `}
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`
                          w-11 h-11 rounded-xl
                          flex items-center justify-center
                          ${isActive
                            ? "bg-purple-500 text-white"
                            : "bg-white/5 text-gray-400"
                          }
                        `}
                      >
                        <Icon size={20} />
                      </div>

                      <div>
                        <p
                          className={`font-semibold ${isActive
                              ? "text-white"
                              : "text-gray-300"
                            }`}
                        >
                          {item.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Manage your{" "}
                          {item.name.toLowerCase()}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`
                        ${isActive
                          ? "text-purple-300"
                          : "text-gray-600"
                        }
                      `}
                    />
                  </Link>
                );
              })}
            </div>

            {/* SECONDARY */}
            <div className="mt-10">

              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 px-2 mb-4">
                Workspace
              </p>

              <div className="space-y-2">

                {secondaryMenu.map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={i}
                      className="
                        w-full flex items-center gap-4
                        px-4 py-3 rounded-2xl
                        text-gray-400 hover:text-white
                        hover:bg-white/5
                        transition-all
                      "
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Icon size={18} />
                      </div>

                      <span className="font-medium">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-10">

            {/* UPGRADE */}
            <div className="mb-5 rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-indigo-500/20 border border-purple-500/20 p-5">

              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>

              <h3 className="font-bold text-lg text-white">
                Pro Developer
              </h3>

              <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                Build your portfolio and stand out to recruiters.
              </p>
            </div>

            {/* LOGOUT */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="
                w-full flex items-center justify-center gap-3
                py-4 rounded-2xl
                bg-red-500/10
                border border-red-500/20
                text-red-400
                hover:bg-red-500
                hover:text-white
                transition-all duration-300
                font-semibold
              "
            >
              <LogOut size={18} />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}