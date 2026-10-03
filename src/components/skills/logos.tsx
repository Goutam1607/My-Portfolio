import type { ComponentType, CSSProperties } from "react";
import {
  SiCss,
  SiFlask,
  SiGithub,
  SiHtml5,
  SiLinux,
  SiMqtt,
  SiNumpy,
  SiPandas,
  SiPython,
  SiRaspberrypi,
  SiRender,
  SiScikitlearn,
} from "react-icons/si";
import {
  Brain,
  BrickWall,
  ChartColumn,
  Cpu,
  Database,
  MessageSquareText,
  ShieldCheck,
  Sigma,
  Sparkles,
  Webhook,
} from "lucide-react";

type Logo = { Icon: ComponentType<{ className?: string; style?: CSSProperties }>; color: string };

const INK = "#1e2235";
const SLATE = "#3d4a6b";

/**
 * Skill `logo` keys (from src/data/portfolio.ts) → icon + colour.
 * Brand logos come from Simple Icons (via react-icons) in their official colours.
 * Concepts without a brand logo use a matching lucide icon in slate.
 */
export const logos: Record<string, Logo> = {
  python: { Icon: SiPython, color: "#3776AB" },
  sql: { Icon: Database, color: SLATE },
  matlab: { Icon: Sigma, color: SLATE },
  html: { Icon: SiHtml5, color: "#E34F26" },
  css: { Icon: SiCss, color: "#663399" },
  scikitlearn: { Icon: SiScikitlearn, color: "#F7931E" },
  pandas: { Icon: SiPandas, color: "#150458" },
  numpy: { Icon: SiNumpy, color: "#013243" },
  deeplearning: { Icon: Brain, color: SLATE },
  nlp: { Icon: MessageSquareText, color: SLATE },
  genai: { Icon: Sparkles, color: SLATE },
  dataviz: { Icon: ChartColumn, color: SLATE },
  raspberrypi: { Icon: SiRaspberrypi, color: "#A22846" },
  mqtt: { Icon: SiMqtt, color: "#660066" },
  iptables: { Icon: BrickWall, color: SLATE },
  linux: { Icon: SiLinux, color: INK },
  netsec: { Icon: ShieldCheck, color: SLATE },
  embedded: { Icon: Cpu, color: SLATE },
  flask: { Icon: SiFlask, color: INK },
  github: { Icon: SiGithub, color: "#181717" },
  restapi: { Icon: Webhook, color: SLATE },
  render: { Icon: SiRender, color: INK },
};

export const fallbackLogo: Logo = { Icon: Sparkles, color: SLATE };
