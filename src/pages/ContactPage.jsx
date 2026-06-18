import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Download } from "lucide-react";
import { FaLinkedin, FaGithub, FaHackerrank, FaWhatsapp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import contact from "../data/contact.json";
import ContactRow from "../components/ContactRow";

const socials = [
  {
    key: "whatApp",
    label: "WhatsApp",
    Icon: FaWhatsapp,
    href: contact.whatApp,
    sub: "Connect on WhatsApp",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    Icon: FaLinkedin,
    href: contact.linkedin,
    sub: "in/rahul-porwal-sde",
  },
  {
    key: "github",
    label: "GitHub",
    Icon: FaGithub,
    href: contact.github,
    sub: "github.com/rahulprwl",
  },
  {
    key: "leetcode",
    label: "LeetCode",
    Icon: SiLeetcode,
    href: contact.leetcode,
    sub: "leetcode.com/ethanhunt22051996",
  },
  {
    key: "hackerrank",
    label: "HackerRank",
    Icon: FaHackerrank,
    href: contact.hackerrank,
    sub: "hackerrank.com/rahul_porwal2016",
  },
];


export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="section-label">Get in touch</p>
        <h1 className="page-title">Contact</h1>
        <p className="page-sub">Open to interesting problems. Currently based in Bengaluru.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

        {/* Left — details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-5"
        >
          <div className="card space-y-4">
            <ContactRow Icon={Mail} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
            <ContactRow Icon={Phone} label="Phone" value={contact.phone} />
            <ContactRow Icon={MapPin} label="Location" value={contact.location} />
          </div>

          <div className="card space-y-4">
            {socials.map(({ key, label, Icon, href, sub }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 transition-colors">
                  <Icon size={15} className="text-neutral-400 group-hover:text-brand-400 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-0.5">{label}</p>
                  <p className="text-sm text-neutral-300 font-mono">{sub}</p>
                </div>
                <ExternalLink size={12} className="ml-auto text-neutral-700 group-hover:text-brand-400 transition-colors" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — bio + resume */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="space-y-4"
        >
          <div className="card">
            <p className="section-label mb-3">About</p>
            <p className="text-sm text-neutral-400 leading-relaxed">{contact.bio}</p>
          </div>

          <div className="card flex flex-col items-start gap-4">
            <div>
              <p className="section-label mb-1">Resume</p>
              <p className="text-sm text-neutral-500">
                Full CV with experience, skills, certifications, and awards.
              </p>
            </div>
            <a href={contact.resumeFile} download className="btn-primary">
              <Download size={14} />
              Download resume
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
