import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ExternalLink, Building2, Globe } from "lucide-react";
import projects from "../data/projects.json";

const typeConfig = {
  enterprise: { label: "Enterprise", className: "bg-blue-500/10 text-blue-400 border border-blue-500/20", Icon: Building2 },
  public:     { label: "Public",     className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", Icon: Globe },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-neutral-500">Project not found.</p>
        <Link to="/" className="btn-ghost mt-4 inline-flex">← Back to projects</Link>
      </main>
    );
  }

  const cfg = typeConfig[project.type] || typeConfig.public;

  return (
    <main className="max-w-3xl mx-auto px-6 pt-24 pb-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>

        <Link to="/" className="btn-ghost mb-8 inline-flex text-xs px-3 py-1.5">
          <ArrowLeft size={13} /> Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className={`pill-type border ${cfg.className}`}>
              <cfg.Icon size={11} className="inline mr-1" />{cfg.label}
            </span>
            <span className="text-xs text-neutral-600 font-mono">{project.dateRange}</span>
          </div>
          <h1 className="text-3xl font-semibold text-white mb-1">{project.title}</h1>
          <p className="text-neutral-500 text-sm">{project.org}</p>
        </div>

        {/* Summary card */}
        <div className="card mb-6 border-l-2 border-l-brand-500 rounded-l-none">
          <p className="text-neutral-300 text-sm leading-relaxed">{project.summary}</p>
        </div>

        {/* Tech stack */}
        <div className="mb-8">
          <p className="section-label">Tech stack</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span key={t} className="pill text-sm py-1 px-3">{t}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="section-label">Details</p>
          <div className="prose prose-invert prose-sm max-w-none
            prose-headings:text-neutral-200 prose-headings:font-medium prose-headings:text-base prose-headings:mt-5 prose-headings:mb-2
            prose-p:text-neutral-400 prose-p:leading-relaxed
            prose-li:text-neutral-400 prose-li:leading-relaxed
            prose-strong:text-neutral-200 prose-strong:font-medium
            prose-ul:pl-4">
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </div>
        </div>

        {/* External link — only if present */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <ExternalLink size={14} />
            {project.linkLabel || "View project"}
          </a>
        )}
      </motion.div>
    </main>
  );
}
