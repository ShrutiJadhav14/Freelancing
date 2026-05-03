import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  LogOut,
  Menu,
  X
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
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Profile",
      path: "/developer/profile",
      icon: <User size={20} />,
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
      {/* 🔥 MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow fixed w-full z-50">
        <h1 className="font-bold text-indigo-600 text-lg">DevConnect</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* 🔥 OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 🔥 SIDEBAR */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: open || window.innerWidth >= 768 ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed md:sticky top-0 z-50 w-72 h-screen 
        bg-gradient-to-b from-indigo-600 via-purple-600 to-indigo-800 
        text-white p-6 flex flex-col justify-between shadow-2xl"
      >
        {/* TOP */}
        <div>
          {/* LOGO */}
          <h1 className="text-2xl font-extrabold mb-8 tracking-wide">
            DevConnect
          </h1>

          {/* USER CARD */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold">
              {getInitials()}
            </div>
            <div>
              <p className="font-semibold text-sm">{user?.name}</p>
              <p className="text-xs text-white/70">{user?.email}</p>
            </div>
          </div>

          {/* NAV */}
          <nav className="space-y-2">
            {menu.map((item, i) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={i}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-white text-indigo-600 shadow-lg"
                      : "hover:bg-white/20"
                  }`}
                >
                  <span className="group-hover:scale-110 transition">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 🔥 BOTTOM (LOGOUT) */}
        <div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl 
            bg-white/10 hover:bg-red-500 transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}