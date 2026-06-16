import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Briefcase, TrendingUp, GraduationCap, Star, Package, ChevronDown,
} from "lucide-react";

const TYPE = {
  job:         { Icon: Briefcase,      dot: "border-blue-500   bg-blue-500/10",   badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",   label: "Role",        big: true  },
  promotion:   { Icon: TrendingUp,     dot: "border-emerald-500 bg-emerald-500/10",badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", label: "Promotion", big: true  },
  education:   { Icon: GraduationCap,  dot: "border-violet-500 bg-violet-500/10", badge: "bg-violet-500/10 text-violet-400 border-violet-500/20", label: "Education", big: true  },
  milestone:   { Icon: Star,           dot: "border-amber-500  bg-amber-500/10",  badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",   label: "Award",     big: true  },
  deliverable: { Icon: Package,        dot: "border-orange-500/60 bg-orange-500/10", badge: "bg-orange-500/10 text-orange-400 border-orange-500/20", label: "Shipped", big: false },
};

export default function TimelineEvent({ event, index, isLast }) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const cfg = TYPE[event.type] || TYPE.job;
  const isDel = event.type === "deliverable";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`flex gap-0 ${isDel ? "ml-8" : ""}`}
    >
      {/* Left rail */}
      <div className="flex flex-col items-center" style={{ width: isDel ? 28 : 36 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.06 + 0.1 }}
          className={`rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${cfg.dot}`}
          style={{ width: isDel ? 22 : 30, height: isDel ? 22 : 30 }}
        >
          <cfg.Icon size={isDel ? 11 : 13} className={isDel ? "text-orange-400" : "text-current opacity-70"} />
        </motion.div>

        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.06 + 0.2 }}
            className={`flex-1 min-h-4 origin-top ${isDel ? "w-px bg-neutral-800" : "w-0.5 bg-neutral-800"}`}
          />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-${isLast ? "0" : isDel ? "4" : "6"} pl-${isDel ? "3" : "4"}`}
           style={{ paddingLeft: isDel ? 10 : 16, paddingBottom: isLast ? 0 : isDel ? 12 : 24 }}>
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-xs font-mono text-neutral-600">{event.date}</span>
          <span className={`pill-type text-xs border ${cfg.badge}`}>{cfg.label}</span>
          {isDel && (
            <span className="text-xs text-neutral-600">@ {event.org}</span>
          )}
        </div>

        {/* Card */}
        <button
          onClick={() => setOpen((o) => !o)}
          className={`w-full text-left card group transition-all duration-200 ${open ? "border-neutral-700" : ""} ${isDel ? "p-3" : "p-4"}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={`font-medium text-white leading-snug ${isDel ? "text-sm" : "text-base"}`}>
                {event.title}
              </p>
              {!isDel && (
                <p className="text-xs text-neutral-500 mt-0.5">{event.org}</p>
              )}
              {event.type === "promotion" && event.promotedFrom && (
                <p className="text-xs text-emerald-500/80 mt-1 flex items-center gap-1">
                  <span>↑</span>
                  <span>Promoted from {event.promotedFrom}</span>
                </p>
              )}
            </div>
            <ChevronDown
              size={15}
              className={`text-neutral-600 shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-neutral-800">
                  <p className="text-sm text-neutral-400 leading-relaxed mb-3">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {event.tags.map((t) => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
