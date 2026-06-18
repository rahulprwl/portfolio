export default function ContactRow({ Icon, label, value, href }) {
  const inner = (
    <div className="flex items-center gap-3 group">
      <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 transition-colors">
        <Icon size={15} className="text-neutral-400 group-hover:text-brand-400 transition-colors" />
      </div>
      <div>
        <p className="text-xs text-neutral-600 mb-0.5">{label}</p>
        <p className="text-sm text-neutral-200">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}
