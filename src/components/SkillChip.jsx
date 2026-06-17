import {
  SiSharp, SiTypescript, SiJavascript, SiPhp,
  SiReact, SiAngular, SiHtml5, SiCss, SiTailwindcss, SiVite, SiPreact, SiStorybook,
  SiDotnet, SiNodedotjs, SiApachekafka, SiSpringboot,
  SiKubernetes, SiDocker, SiJenkins, SiArgo, SiNginx,
  SiPostgresql, SiMysql, SiFirebase, SiMongodb,
  SiGit, SiGithub, SiPostman, SiIntellijidea,
  SiOpenai, SiGoogle, SiHuggingface, SiPython, SiLangchain, SiClaude, SiGithubcopilot
} from "react-icons/si";
import { FaAws, FaMicrosoft } from "react-icons/fa6";
import { FaJava } from "react-icons/fa";

const ICON_MAP = {
  SiSharp, SiTypescript, SiJavascript, SiPhp,
  SiReact, SiAngular, SiHtml5, SiCss, SiTailwindcss, SiVite, SiPreact, SiStorybook,
  SiDotnet, SiNodedotjs, SiApachekafka, SiSpringboot,
  SiKubernetes, SiDocker, SiJenkins, SiArgo, SiNginx,
  SiPostgresql, SiMysql, SiFirebase, SiMongodb,
  SiGit, SiGithub, SiPostman, SiIntellijidea,
  SiOpenai, SiGoogle, SiHuggingface, SiPython, SiLangchain, SiClaude, SiGithubcopilot,
  FaAws, FaMicrosoft, FaJava,
};

const LEVEL_DOT = {
  expert: "bg-brand-500",
  proficient: "bg-emerald-500",
  familiar: "bg-amber-500",
};

export default function SkillChip({ skill }) {
  const IconComp = skill.icon ? ICON_MAP[skill.icon] : null;
  const dot = LEVEL_DOT[skill.level] || LEVEL_DOT.familiar;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800/60 border border-neutral-700/50 hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-200 group cursor-default">
      {IconComp ? (
        <IconComp
          size={13}
          className="text-neutral-500 group-hover:text-neutral-300 transition-colors shrink-0"
        />
      ) : (
        <span className="w-3.5 h-3.5 rounded-sm bg-neutral-700 text-neutral-500 text-[9px] font-bold flex items-center justify-center shrink-0 leading-none">
          {skill.name[0]}
        </span>
      )}
      <span className="text-xs text-neutral-300 font-medium whitespace-nowrap">{skill.name}</span>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot} opacity-70`} />
    </div>
  );
}
