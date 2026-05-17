import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import DeveloperCard from "../components/DeveloperCard";
import { motion } from "framer-motion";
import {
    Search,
    SlidersHorizontal,
    Sparkles,
} from "lucide-react";

export default function Developers() {

    const [developers, setDevelopers] = useState([]);
    const [filteredDevelopers, setFilteredDevelopers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [skill, setSkill] = useState("");

    // FETCH ALL DEVELOPERS ONLY ONCE
    const fetchDevelopers = async () => {
        try {
            setLoading(true);

            const res = await API.get("/developer/all");

            setDevelopers(res.data.developers || []);
            setFilteredDevelopers(res.data.developers || []);

        } catch (err) {
            console.log(err);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevelopers();
    }, []);

    // LIVE SEARCH + FILTER
    useEffect(() => {

        let filtered = [...developers];

        // SEARCH
        if (search.trim()) {

            const searchText = search.toLowerCase();

            filtered = filtered.filter((dev) => {

                const name =
                    dev?.User?.name?.toLowerCase() || "";

                const bio =
                    dev?.bio?.toLowerCase() || "";

                const skills =
                    dev?.skills?.toLowerCase() || "";

                const experience =
                    String(dev?.experience || "").toLowerCase();

                return (
                    name.includes(searchText) ||
                    bio.includes(searchText) ||
                    skills.includes(searchText) ||
                    experience.includes(searchText)
                );
            });
        }

        // FILTER
        if (skill) {

            filtered = filtered.filter((dev) =>
                dev?.skills
                    ?.toLowerCase()
                    .includes(skill.toLowerCase())
            );
        }

        setFilteredDevelopers(filtered);

    }, [search, skill, developers]);

    // HIGHLIGHT TEXT
    const highlightText = (text, keyword) => {

        if (!keyword) return text;

        const regex = new RegExp(`(${keyword})`, "gi");

        return text.split(regex).map((part, index) =>
            regex.test(part) ? (
                <mark
                    key={index}
                    className="
                        bg-yellow-400/30
                        text-yellow-200
                        px-1
                        rounded
                    "
                >
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div
            className="
                min-h-screen
                relative
                overflow-hidden
                bg-gradient-to-br
                from-black
                via-slate-950
                to-gray-900
                text-white
                px-4
                sm:px-6
                md:px-10
                py-10
            "
        >
            {/* BACKGROUND LIGHTS */}
            <div
                className="
                    absolute top-0 left-0
                    w-72 h-72
                    bg-purple-600/20
                    rounded-full
                    blur-3xl
                "
            />

            <div
                className="
                    absolute bottom-0 right-0
                    w-96 h-96
                    bg-pink-500/10
                    rounded-full
                    blur-3xl
                "
            />

            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-12 relative z-10"
            >
                <div className="flex items-center gap-4">

                    <div
                        className="
                            w-14 h-14
                            rounded-2xl
                            bg-gradient-to-r
                            from-purple-600
                            to-pink-500
                            flex items-center justify-center
                            shadow-lg
                        "
                    >
                        <Sparkles size={24} />
                    </div>

                    <div>
                        <h1
                            className="
                                text-4xl md:text-5xl
                                font-black
                                bg-gradient-to-r
                                from-white
                                via-purple-200
                                to-pink-200
                                bg-clip-text
                                text-transparent
                            "
                        >
                            Find Developers
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Live search developers instantly
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* SEARCH + FILTER */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                    max-w-7xl mx-auto
                    mb-10 relative z-10
                "
            >
                <div
                    className="
                        bg-white/5
                        border border-white/10
                        backdrop-blur-2xl
                        rounded-[30px]
                        p-4
                        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
                    "
                >
                    <div
                        className="
                            flex flex-col
                            lg:flex-row
                            gap-4
                        "
                    >
                        {/* SEARCH */}
                        <div className="relative flex-1">

                            <Search
                                size={20}
                                className="
                                    absolute
                                    left-5
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />

                            <input
                                type="text"
                                placeholder="Search by name, bio, skills, experience..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="
                                    w-full
                                    pl-14 pr-5
                                    py-4
                                    rounded-2xl
                                    bg-white/5
                                    border border-white/10
                                    text-white
                                    placeholder:text-gray-400
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-purple-500
                                "
                            />
                        </div>

                        {/* FILTER */}
                        <div className="relative lg:w-72">

                            <SlidersHorizontal
                                size={18}
                                className="
                                    absolute
                                    left-5
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />

                            <select
                                value={skill}
                                onChange={(e) =>
                                    setSkill(e.target.value)
                                }
                                className="
                                    w-full
                                    pl-14 pr-5
                                    py-4
                                    rounded-2xl
                                    bg-white/5
                                    border border-white/10
                                    text-white
                                    appearance-none
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-purple-500
                                "
                            >
                                <option
                                    value=""
                                    className="text-black"
                                >
                                    All Skills
                                </option>

                                <option
                                    value="React"
                                    className="text-black"
                                >
                                    React
                                </option>

                                <option
                                    value="Node.js"
                                    className="text-black"
                                >
                                    Node.js
                                </option>

                                <option
                                    value="Next.js"
                                    className="text-black"
                                >
                                    Next.js
                                </option>

                                <option
                                    value="MongoDB"
                                    className="text-black"
                                >
                                    MongoDB
                                </option>

                                <option
                                    value="Express"
                                    className="text-black"
                                >
                                    Express
                                </option>

                                <option
                                    value="JavaScript"
                                    className="text-black"
                                >
                                    JavaScript
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* RESULTS */}
            <div className="max-w-7xl mx-auto relative z-10">

                {/* RESULT COUNT */}
                {!loading && (
                    <div className="mb-6 text-gray-400">
                        Found{" "}
                        <span className="text-purple-400 font-semibold">
                            {filteredDevelopers.length}
                        </span>{" "}
                        developers
                    </div>
                )}

                {/* LOADING */}
                {loading ? (
                    <div className="flex justify-center py-32">

                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear",
                            }}
                            className="
                                w-16 h-16
                                border-4
                                border-purple-500
                                border-t-transparent
                                rounded-full
                            "
                        />
                    </div>

                ) : filteredDevelopers.length === 0 ? (

                    <div
                        className="
                            text-center
                            py-28
                            bg-white/5
                            border border-white/10
                            rounded-3xl
                            backdrop-blur-xl
                        "
                    >
                        <h2 className="text-2xl font-bold mb-3">
                            No Developers Found
                        </h2>

                        <p className="text-gray-400">
                            Try another keyword or skill.
                        </p>
                    </div>

                ) : (

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-3
                            gap-8
                        "
                    >
                        {filteredDevelopers.map((dev) => (

                            <DeveloperCard
                                key={dev._id || dev.id}
                                developer={{
                                    ...dev,

                                    highlightedName: highlightText(
                                        dev?.User?.name || "",
                                        search
                                    ),

                                    highlightedBio: highlightText(
                                        dev?.bio || "",
                                        search
                                    ),
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}