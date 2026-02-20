import { Moon, Sun, Globe, Shield, EllipsisVertical, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "hi", label: "हिन्दी" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "pt", label: "Português" },
  { code: "ar", label: "العربية" },
  { code: "ko", label: "한국어" },
];

export default function HeaderMenu() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<"main" | "language" | "security">("main");
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        setPage("main");
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const currentLang = LANGUAGES.find((l) => l.code === language);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => {
          setOpen(!open);
          setPage("main");
        }}
        className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
        aria-label="Menu"
      >
        <EllipsisVertical className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-64 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
          {/* Main menu */}
          {page === "main" && (
            <div className="py-1">
              {/* Theme toggle */}
              <button
                onClick={() => setDark(!dark)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {dark ? (
                    <Sun className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Moon className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-sm text-foreground">
                    {dark ? "Light mode" : "Dark mode"}
                  </span>
                </div>
                <div
                  className={`w-8 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                    dark ? "bg-primary" : "bg-border"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                      dark ? "translate-x-3" : "translate-x-0"
                    }`}
                  />
                </div>
              </button>

              {/* Language */}
              <button
                onClick={() => setPage("language")}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Language</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {currentLang?.label}
                </span>
              </button>

              {/* Security */}
              <button
                onClick={() => setPage("security")}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Security</span>
                </div>
              </button>
            </div>
          )}

          {/* Language page */}
          {page === "language" && (
            <div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <button
                  onClick={() => setPage("main")}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
                <span className="text-sm font-semibold text-foreground">
                  Language
                </span>
                <div className="w-10" />
              </div>
              <div className="py-1 max-h-64 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setPage("main");
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-secondary/50 transition-colors ${
                      language === lang.code ? "bg-primary/5" : ""
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        language === lang.code
                          ? "text-primary font-semibold"
                          : "text-foreground"
                      }`}
                    >
                      {lang.label}
                    </span>
                    {language === lang.code && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security page */}
          {page === "security" && (
            <div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <button
                  onClick={() => setPage("main")}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
                <span className="text-sm font-semibold text-foreground">
                  Security
                </span>
                <div className="w-10" />
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      End-to-end encryption
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      All files are encrypted using AES-256 during transfer
                    </p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Auto-delete
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Files are permanently deleted immediately after download
                    </p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      No data stored
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      We never store, analyze, or share your files. Zero tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}