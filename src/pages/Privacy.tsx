import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import HeaderMenu from "../components/ThemeToggle";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
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

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-extrabold text-foreground mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Information We Collect</h2>
            <p>We do not collect personal information. We do not require accounts or signups. Files uploaded for conversion are processed in memory and never stored permanently.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. File Handling</h2>
            <p>Files you upload are:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Encrypted during transfer using HTTPS (TLS 1.3)</li>
              <li>Processed on our servers temporarily</li>
              <li>Automatically deleted immediately after download</li>
              <li>Never shared with third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Cookies</h2>
            <p>We use minimal cookies for theme preference and language selection only. No tracking cookies are used.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Analytics</h2>
            <p>We may use privacy-respecting analytics to understand general usage patterns. No personal data is tracked.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Advertising</h2>
            <p>We may display ads through Google AdSense. Google may use cookies to serve relevant ads. You can opt out at <a href="https://adssettings.google.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Contact</h2>
            <p>For questions about this policy, contact us at: <span className="text-foreground">privacy@fileconverter.com</span></p>
          </section>
        </div>
      </main>
    </div>
  );
}