
import { useCallback, useState } from "react";
import { Mail, Twitter } from "lucide-react";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = useCallback(async () => {
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1&su=&to=dandanaher.dev%40gmail.com";

    const openedWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");

    if (!openedWindow) {
      try {
        await navigator.clipboard.writeText("dandanaher.dev@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.warn("Clipboard access unavailable", error);
      }
    } else {
      openedWindow.focus?.();
    }
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="flex h-[360px] w-[360px] flex-col items-center justify-between rounded-3xl border border-white/20 bg-white/60 p-8 text-[#2a2b29] shadow-lg shadow-slate-900/5 backdrop-blur">
        <h2 className="text-center text-xl font-semibold">
          Contact
        </h2>
        <div className="w-full space-y-3">
          <button
            type="button"
            onClick={handleEmailClick}
            className="group flex w-full items-center justify-between rounded-2xl border border-white/40 bg-white/80 px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white"
          >
            <span className="flex items-center gap-3 text-left">
              <Mail className="h-5 w-5 text-[#626360] transition group-hover:text-[#2a2b29]" />
              
            </span>
            <span className="text-sm text-[#626360] transition group-hover:text-[#2a2b29]">
              dandanaher.dev@gmail.com
            </span>
          </button>
          <a
            href="https://x.com/devDanaher"
            target="_blank"
            rel="noreferrer"
            className="group flex w-full items-center justify-between rounded-2xl border border-white/40 bg-white/80 px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white"
          >
            <span className="flex items-center gap-3 text-left">
              <Twitter className="h-5 w-5 text-[#626360] transition group-hover:text-[#2a2b29]" />
              
            </span>
            <span className="text-sm text-[#626360] transition group-hover:text-[#2a2b29]">
              @devDanaher
            </span>
          </a>
        </div>
        <span className="h-6 text-sm text-[#626360]" aria-live="polite">
          {copied ? "Email copied to clipboard" : ""}
        </span>
      </div>
    </div>
  );
};

export default Contact;
