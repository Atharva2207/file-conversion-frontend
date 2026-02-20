import { Link } from "react-router-dom";
import { tools } from "../utils/tools";
import HeaderMenu from "../components/ThemeToggle";
import { FileText, ArrowRight } from "lucide-react";

const Index = () => {
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

      {/* Hero */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
            Every tool you need to work with files
          </h1>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            Convert, compress, and transform. Fast, free, and secure.
            No signup required.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                to={`/tool/${tool.id}`}
                className="group bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${tool.bgColor} flex items-center justify-center`}>
                    <tool.icon className={`w-5 h-5 ${tool.color}`} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {tool.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex items-center gap-1.5 mt-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-secondary text-muted-foreground uppercase">
                    {tool.fromLabel}
                  </span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary uppercase">
                    {tool.toLabel}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-20 border-t border-border pt-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">Secure</p>
              <p className="text-sm text-muted-foreground">
                Encrypted in transit. Files auto-delete after download.
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">Fast</p>
              <p className="text-sm text-muted-foreground">
                Most conversions complete in under 5 seconds.
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">Free</p>
              <p className="text-sm text-muted-foreground">
                No signup, no limits, no hidden costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2025 FileConverter</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;