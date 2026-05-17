import { motion } from "framer-motion";
import {
    Star,
    ArrowUpRight,
    Briefcase,
    MapPin,
} from "lucide-react";

export default function DeveloperCard({ developer }) {
    const initials = developer?.User?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("");

    const skills = developer.skills
        ?.split(",")
        .map((s) => s.trim());

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -10,
                scale: 1.02,
            }}
            transition={{
                duration: 0.5,
                type: "spring",
            }}
            className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border border-white/10
                bg-white/10
                backdrop-blur-2xl
                shadow-[0_10px_50px_rgba(0,0,0,0.35)]
                hover:shadow-[0_20px_80px_rgba(168,85,247,0.35)]
                transition-all duration-500
                p-6 sm:p-7
                flex flex-col
            "
        >
            {/* BACKGROUND GRADIENT */}
            <div
                className="
                    absolute inset-0
                    bg-gradient-to-br
                    from-purple-500/10
                    via-pink-500/10
                    to-indigo-500/10
                    opacity-0
                    group-hover:opacity-100
                    transition duration-700
                "
            />

            {/* FLOATING LIGHT */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    -top-10
                    -right-10
                    w-40
                    h-40
                    bg-purple-500/20
                    rounded-full
                    blur-3xl
                "
            />

            {/* HEADER */}
            <div className="relative z-10 flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    {/* IMAGE */}
                    {developer.photo ? (
                        <motion.img
                            whileHover={{
                                scale: 1.08,
                                rotate: 2,
                            }}
                            transition={{ duration: 0.3 }}
                            src={`http://localhost:5000/${developer.photo}`}
                            alt={developer.User?.name}
                            className="
                                w-20 h-20
                                rounded-3xl
                                object-cover
                                border-2 border-white/20
                                shadow-xl
                            "
                        />
                    ) : (
                        <motion.div
                            whileHover={{
                                scale: 1.08,
                                rotate: 3,
                            }}
                            className="
                                w-20 h-20
                                rounded-3xl
                                bg-gradient-to-br
                                from-purple-600
                                via-pink-500
                                to-indigo-600
                                flex items-center justify-center
                                text-white
                                text-2xl
                                font-bold
                                shadow-2xl
                            "
                        >
                            {initials}
                        </motion.div>
                    )}

                    {/* INFO */}
                    <div>
                        <h3
                            className="
                                text-xl sm:text-2xl
                                font-bold
                                text-white
                                capitalize
                            "
                        >
                            {developer.highlightedName || developer.User?.name}
                        </h3>

                        <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                            <Briefcase size={14} />
                            <span>
                                {developer.experience}+ Years Experience
                            </span>
                        </div>

                        <div className="flex items-center gap-1 mt-2">
                            <Star
                                size={15}
                                className="fill-yellow-400 text-yellow-400"
                            />

                            <span className="text-sm text-gray-200 font-medium">
                                Premium Developer
                            </span>
                        </div>
                    </div>
                </div>

                {/* ACTIVE STATUS */}
                <motion.div
                    animate={{
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                    }}
                    className="
                        hidden sm:flex
                        items-center gap-2
                        px-3 py-1.5
                        rounded-full
                        bg-emerald-500/15
                        border border-emerald-400/20
                        text-emerald-300
                        text-xs font-semibold
                    "
                >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    Available
                </motion.div>
            </div>

            {/* BIO */}
            <p
                className="
        relative z-10
        text-gray-300
        text-sm sm:text-base
        leading-relaxed
        mb-7
        line-clamp-3
    "
            >
                {developer.highlightedBio || developer.bio}
            </p>

            {/* SKILLS */}
            <div className="relative z-10 flex flex-wrap gap-2 mb-8">
                {skills?.map((skill, index) => (
                    <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: index * 0.05,
                        }}
                        whileHover={{
                            y: -3,
                            scale: 1.07,
                        }}
                        className="
                            px-4 py-2
                            rounded-full
                            text-xs sm:text-sm
                            font-medium
                            text-white
                            border border-white/10
                            bg-white/10
                            backdrop-blur-lg
                            hover:bg-purple-500/20
                            hover:border-purple-400/30
                            transition-all duration-300
                            cursor-default
                        "
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>

            {/* FOOTER */}
            <div className="relative z-10 mt-auto">
                <motion.button
                    whileHover={{
                        scale: 1.02,
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    className="
                        relative
                        overflow-hidden
                        w-full
                        rounded-2xl
                        bg-gradient-to-r
                        from-purple-600
                        via-pink-500
                        to-indigo-600
                        py-4
                        text-white
                        font-semibold
                        flex items-center justify-center gap-2
                        shadow-[0_10px_30px_rgba(168,85,247,0.4)]
                        transition-all duration-500
                    "
                >
                    {/* SHINE EFFECT */}
                    <div
                        className="
                            absolute inset-0
                            -translate-x-full
                            group-hover:translate-x-full
                            transition-transform duration-1000
                            bg-gradient-to-r
                            from-transparent
                            via-white/20
                            to-transparent
                        "
                    />

                    <span className="relative z-10">
                        View Profile
                    </span>

                    <ArrowUpRight
                        size={18}
                        className="
                            relative z-10
                            transition-transform duration-300
                            group-hover:translate-x-1
                            group-hover:-translate-y-1
                        "
                    />
                </motion.button>
            </div>

            {/* BOTTOM BORDER LIGHT */}
            <div
                className="
                    absolute bottom-0 left-0
                    h-[2px] w-0
                    bg-gradient-to-r
                    from-purple-500
                    via-pink-500
                    to-indigo-500
                    group-hover:w-full
                    transition-all duration-700
                "
            />
        </motion.div>
    );
}