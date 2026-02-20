import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import HeaderMenu from "../components/ThemeToggle";

export default function Terms() {
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
        <h1 className="text-3xl font-extrabold text-foreground mb-8">Terms of Service</h1>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Service</h2>
            <p>FileConverter provides free online file conversion tools. We convert files between formats including PDF, DOCX, JPG, PNG, CSV, and others.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Upload illegal, harmful, or copyrighted content you don't own</li>
              <li>Attempt to overload or disrupt the service</li>
              <li>Use automated tools to abuse the service</li>
              <li>Upload files larger than the stated limit (10 MB)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Limitations</h2>
            <p>The service is provided "as is" without warranties. We are not responsible for conversion accuracy, data loss, or service interruptions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. File Ownership</h2>
            <p>You retain full ownership of your files. We do not claim any rights to files you upload. Files are processed temporarily and deleted after download.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Rate Limits</h2>
            <p>To ensure fair usage, conversions are limited to 10 per minute per user. Excessive usage may result in temporary restrictions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Changes</h2>
            <p>We may update these terms at any time. Continued use of the service constitutes acceptance of updated terms.</p>
          </section>
        </div>
      </main>
    </div>
  );
}