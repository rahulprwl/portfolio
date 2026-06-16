import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Globe } from "lucide-react";

const typeConfig = {
  enterprise: {
    label: "Enterprise",
    className: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    Icon: Building2,
  },
  public: {
    label: "Public",
    className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    Icon: Globe,
  },
};

export default function ProjectCard({ project, index }) {
  const cfg = typeConfig[project.type] || typeConfig.public;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="card group flex flex-col h-full hover:bg-neutral-800/50 cursor-pointer block"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className={`pill-type text-xs ${cfg.className}`}>
              <cfg.Icon size={10} className="inline mr-1" />
              {cfg.label}
            </span>
          </div>
          <span className="text-xs text-neutral-600 font-mono shrink-0">
            {project.dateRange}
          </span>
        </div>

        <h3 className="text-white font-medium text-base mb-1 group-hover:text-brand-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-neutral-500 mb-3">{project.org}</p>
        <p className="text-sm text-neutral-400 leading-relaxed flex-1 mb-4">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 5).map((t) => (
            <span key={t} className="pill">{t}</span>
          ))}
          {project.techStack.length > 5 && (
            <span className="pill text-neutral-600">+{project.techStack.length - 5}</span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-brand-400 font-medium mt-auto group-hover:gap-2 transition-all">
          View details <ArrowRight size={12} />
        </div>
      </Link>
    </motion.div>
  );
}
