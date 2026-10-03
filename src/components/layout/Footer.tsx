import { ArrowUp } from "lucide-react";
import { contact } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="px-4 pb-10 sm:px-6 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center">
        <p>{contact.footer}</p>
        <a href="#top" className="inline-flex items-center gap-1.5 font-medium text-ink hover:underline">
          Back to top <ArrowUp className="size-4" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
