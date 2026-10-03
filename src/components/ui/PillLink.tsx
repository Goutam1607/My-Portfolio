import { isTodo } from "@/data/portfolio";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light";
  /** Icon shown after the label (e.g. ↗ or ↓). */
  icon?: React.ReactNode;
  /** Set to a file name to download instead of navigate. */
  download?: string;
  className?: string;
};

const styles = {
  solid: "bg-ink text-canvas shadow-soft hover:-translate-y-0.5",
  outline: "border border-ink/15 bg-canvas text-ink hover:border-ink hover:-translate-y-0.5",
  /** for dark backgrounds */
  light: "bg-canvas text-ink hover:-translate-y-0.5 hover:bg-surface",
};

/** Rounded pill button-link. Renders nothing if the link is still a TODO. */
export default function PillLink({ href, children, variant = "outline", icon, download, className = "" }: Props) {
  if (isTodo(href)) return null;
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${styles[variant]} ${className}`}
    >
      {children}
      {icon && (
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
