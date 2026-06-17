import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Monitor, Server, Cloud, Database, Wrench, Bot } from "lucide-react";
import skills from "../data/skills.json";
import SkillChip from "../components/SkillChip";

const LEVEL_FILTERS = [
  { key: "all",        label: "All" },
  { key: "expert",     label: "Expert" },
  { key: "proficient", label: "Proficient" },
  { key: "familiar",   label: "Familiar" },
];

const CATEGORY_ICON_MAP = { Code2, Monitor, Server, Cloud, Database, Wrench, Bot };

const LEVEL_LEGEND = [
  { label: "Expert",     dot: "bg-brand-500" },
  { label: "Proficient", dot: "bg-emerald-500" },
  { label: "Familiar",   dot: "bg-amber-500" },
];

function CategoryCard({ category, filter, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const CatIcon = CATEGORY_ICON_MAP[category.categoryIcon] || Bot;

  const visibleSkills =
    filter === "all"
      ? category.skills
      : category.skills.filter((s) => s.level === filter);

  if (visibleSkills.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="card flex flex-col gap-4"
    >
      {/* Card header */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
          <CatIcon size={14} className="text-brand-400" />
        </div>
        <h2 className="text-sm font-semibold text-white tracking-tight">
          {category.category}
        </h2>
        <span className="ml-auto text-xs font-mono text-neutral-700">
          {visibleSkills.length}
        </span>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-1.5">
        {visibleSkills.map((skill) => (
          <SkillChip key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsPage() {
  const [filter, setFilter] = useState("all");

  const totalVisible = skills.reduce((acc, cat) => {
    return acc + (filter === "all" ? cat.skills.length : cat.skills.filter((s) => s.level === filter).length);
  }, 0);

  return (
    <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="section-label">Expertise</p>
        <h1 className="page-title">Skills</h1>
        <p className="page-sub">
          Technologies and tools I work with — grouped by domain.
        </p>
      </motion.div>

      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex gap-2 mb-5 flex-wrap items-center"
      >
        {LEVEL_FILTERS.map((f) => (
          <button
            key={f.key}
            id={`skill-filter-${f.key}`}
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
        <span className="ml-auto text-xs font-mono text-neutral-700">
          {totalVisible} skill{totalVisible !== 1 ? "s" : ""}
        </span>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-wrap gap-4 mb-10 text-xs text-neutral-600"
      >
        {LEVEL_LEGEND.map(({ label, dot }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${dot}`} />
            {label}
          </span>
        ))}
      </motion.div>

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((category, i) => (
          <CategoryCard
            key={category.category}
            category={category}
            filter={filter}
            index={i}
          />
        ))}
      </div>

      {totalVisible === 0 && (
        <p className="text-neutral-600 text-sm mt-4">No skills for this filter.</p>
      )}
    </main>
  );
}
