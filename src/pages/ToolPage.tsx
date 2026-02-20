import { useParams, Link, useNavigate } from "react-router-dom";
import { getToolById, getAcceptString } from "../utils/tools";
import HeaderMenu from "../components/ThemeToggle";
import { useConversion } from "../hooks/useConversion";
import { downloadFile } from "../services/conversionApi";
import { formatFileSize } from "../utils/helpers";
import { useState, useRef } from "react";
import { cn } from "../lib/utils";
import {
  FileText,
  Upload,
  ArrowRight,
  ArrowLeft,
  X,
  Loader2,
  CheckCircle2,
  Download,
  RotateCcw,
  AlertCircle,
  FileIcon,
} from "lucide-react";

export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const tool = getToolById(toolId || "");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { job, loading, error, progress, startConversion, reset } = useConversion();

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground mb-2">Tool not found</p>
          <Link to="/" className="text-sm text-primary hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = job?.status === "COMPLETED";
  const isFailed = job?.status === "FAILED";

  const handleFileSelect = (f: File) => {
    setFile(f);
    reset();
  };

  const handleConvert = () => {
    if (file) {
      startConversion(file, tool.to);
    }
  };

  const handleReset = () => {
    setFile(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold text-foreground tracking-tight">
              FileConverter
            </span>
          </Link>
          <HeaderMenu />
        </div>
      </header>

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All tools
        </button>
      </div>

      {/* Tool header */}
      <section className="pt-8 pb-6 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`w-14 h-14 rounded-xl ${tool.bgColor} flex items-center justify-center mx-auto mb-4`}>
            <tool.icon className={`w-7 h-7 ${tool.color}`} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
            {tool.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {tool.description}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-secondary text-muted-foreground uppercase">
              {tool.fromLabel}
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-primary/10 text-primary uppercase">
              {tool.toLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Main area */}
      <section className="px-6 pb-24">
        <div className="max-w-xl mx-auto space-y-4">

          {/* Step 1: Upload */}
          {!file && !job && (
            <div
              className={cn(
                "flex flex-col items-center justify-center w-full rounded-xl border-2 border-dashed p-12 md:p-16 cursor-pointer transition-all duration-200",
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40 hover:bg-secondary/50"
              )}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
              }}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); }
              }}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0]); }}
                accept={getAcceptString(tool.from)}
              />
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors",
                dragActive ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
              )}>
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-base font-semibold text-foreground mb-1">
                {dragActive ? "Drop your file here" : `Select ${tool.fromLabel} file`}
              </p>
              <p className="text-sm text-muted-foreground">
                or drag and drop — up to 10 MB
              </p>
            </div>
          )}

          {/* Step 2: File selected → Convert */}
          {file && !loading && !isCompleted && !isFailed && (
            <>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-lg ${tool.bgColor} flex items-center justify-center shrink-0`}>
                      <FileIcon className={`w-5 h-5 ${tool.color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleConvert}
                className="w-full py-3.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99] transition-all"
              >
                Convert to {tool.toLabel}
              </button>
            </>
          )}

          {/* Step 3: Converting */}
          {loading && (
            <div className="bg-card border border-border rounded-xl p-10 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-primary mx-auto animate-spin" />
              <div>
                <p className="text-sm font-semibold text-foreground">Converting your file…</p>
                <p className="text-xs text-muted-foreground mt-1">This usually takes a few seconds</p>
              </div>
              {progress && progress.percent > 0 && (
                <div className="max-w-xs mx-auto">
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Done */}
          {isCompleted && job && (
            <div className="bg-card border border-success/30 rounded-xl p-10 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">Conversion complete</p>
                <p className="text-sm text-muted-foreground mt-1">Your {tool.toLabel} file is ready</p>
              </div>
              <button
                onClick={() => downloadFile(job.id)}
                className="w-full py-3.5 rounded-xl text-sm font-semibold bg-success text-success-foreground hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download {tool.toLabel}
              </button>
              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Convert another
                </button>
                <Link
                  to="/"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  All tools
                </Link>
              </div>
            </div>
          )}

          {/* Error */}
          {(error || isFailed) && (
            <div className="bg-card border border-destructive/30 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {job?.error_message || error || "Conversion failed"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Make sure your file is a valid {tool.fromLabel} file
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-sm font-semibold text-primary mt-2 hover:underline underline-offset-4"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 FileConverter</span>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}