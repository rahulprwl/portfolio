import { useState } from "react";
import { motion } from "framer-motion";
import TimelineEvent from "../components/TimelineEvent";
import career from "../data/career.json";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "job", label: "Roles" },
  { key: "deliverable", label: "Shipped" },
  { key: "milestone", label: "Awards" },
  { key: "education", label: "Education" },
];

export default function CareerPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? career
    : career.filter((e) => e.type === filter);
  console.log(filtered);

  return (
    <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="section-label">History</p>
        <h1 className="page-title">Career</h1>
        <p className="page-sub">
          Roles, shipped deliverables, awards, and education — most recent first.
        </p>
      </motion.div>

      {/* Filter */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-sm px-4 py-1.5 rounded-full border transition-all duration-200 ${filter === f.key
              ? "bg-brand-500 border-brand-500 text-white"
              : "border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-300"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-8 text-xs text-neutral-600">
        <span><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>Role change</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-orange-500 mr-1.5 opacity-60"></span>Deliverable (indented)</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>Award</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-violet-500 mr-1.5"></span>Education</span>
      </div>

      {/* Timeline */}
      <div>
        {filtered.length === 0 ? (
          <p className="text-neutral-600 text-sm">No events for this filter.</p>
        ) : (
          filtered.map((event, i) => (
            <TimelineEvent
              key={`${event.type}-${i}`}
              event={event}
              index={i}
              isLast={i === filtered.length - 1}
            />
          ))
        )}
      </div>
    </main>
  );
}
