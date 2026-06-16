import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects.json";

const FILTERS = [
  { key: "all", label: "All projects" },
  { key: "enterprise", label: "Enterprise" },
  { key: "public", label: "Public" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.type === filter);

  return (
    <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="section-label">Work</p>
        <h1 className="page-title">Projects</h1>
        <p className="page-sub">
          {projects.length} projects across enterprise finance and independent builds.
        </p>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-200 ${
              filter === f.key
                ? "bg-brand-500 border-brand-500 text-white"
                : "border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </main>
  );
}
