import { NavLink, Link } from "react-router-dom";
import { Download, Terminal } from "lucide-react";
import contact from "../data/contact.json";

const links = [
  { to: "/", label: "Projects", end: true },
  { to: "/career", label: "Career" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-medium text-sm">
          <Terminal size={16} className="text-brand-400" />
          <span className="font-mono text-brand-400">rp</span>
          <span className="text-neutral-500">/</span>
          <span>Rahul Porwal</span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={contact.resumeFile}
            download
            className="btn-primary text-xs px-3 py-1.5"
          >
            <Download size={13} />
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
