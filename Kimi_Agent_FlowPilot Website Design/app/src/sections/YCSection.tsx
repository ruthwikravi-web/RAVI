import { Shield, Lock, FileCheck } from "lucide-react";

const badges = [
  { icon: Shield, label: "SOC 2 Type II" },
  { icon: Lock, label: "GDPR Compliant" },
  { icon: FileCheck, label: "HIPAA Ready" },
];

export default function YCSection() {
  return (
    <section className="py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* YC Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium mb-8">
            <span className="font-mono text-xs tracking-wider">YC W24</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Built for fast-growing teams.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            FlowPilot is backed by Y Combinator and trusted by modern
            operations teams to automate mission-critical workflows. We
            understand the pace of startups because we are one.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {badges.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card"
              >
                <b.icon className="w-4 h-4 text-[#E84545]" />
                <span className="text-sm font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
