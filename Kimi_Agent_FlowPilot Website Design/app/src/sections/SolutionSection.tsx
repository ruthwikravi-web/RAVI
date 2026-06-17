import { Check, ArrowRight } from "lucide-react";

const features = [
  "Real-time ingestion",
  "Conflict resolution",
  "Auto-scaling",
];

export default function SolutionSection() {
  return (
    <section id="product" className="py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Column */}
          <div>
            <span className="text-xs font-mono text-[#E84545] tracking-wider uppercase mb-4 block">
              The Solution
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              One Command Center.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Stop switching between Slack, Jira, and spreadsheets. FlowPilot
              normalizes your signals into a single execution environment.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span className="text-sm text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-[#E84545] transition-colors group">
              See how it works
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Visual Column */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border">
              <img
                src="/images/dashboard.jpg"
                alt="FlowPilot Dashboard"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-[#E84545]/5 rounded-2xl -z-10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
