import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Monitor, Server, Cloud, Database, Wrench, Bot } from "lucide-react";
import SkillChip from "./SkillChip";

const CATEGORY_ICON_MAP = { Code2, Monitor, Server, Cloud, Database, Wrench, Bot };

export default function CategoryCard({ category, filter, index }) {
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
