import { Workflow, Brain, ShieldCheck, BarChart3, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Workflow,
    label: "BUILDER",
    title: "AI Workflow Builder",
    desc: "Describe workflows in natural language. FlowPilot's AI automatically creates, validates, and deploys them.",
    metric: "10x faster setup",
  },
  {
    icon: Brain,
    label: "INTELLIGENCE",
    title: "Predictive Automation",
    desc: "AI learns your team's patterns and suggests optimizations before bottlenecks even appear.",
    metric: "94% accuracy",
  },
  {
    icon: ShieldCheck,
    label: "COMPLIANCE",
    title: "Immutable Audit Logs",
    desc: "Every action is logged with cryptographic integrity. SOC 2, HIPAA, and GDPR compliant out of the box.",
    metric: "SOC 2 Type II",
  },
  {
    icon: BarChart3,
    label: "ANALYTICS",
    title: "Advanced Analytics",
    desc: "Real-time dashboards showing workflow performance, time saved, error rates, and team productivity.",
    metric: "Real-time",
  },
  {
    icon: Globe,
    label: "INTEGRATIONS",
    title: "150+ Integrations",
    desc: "Connect Slack, Salesforce, HubSpot, Jira, Notion, Airtable, and more with native two-way sync.",
    metric: "Native sync",
  },
  {
    icon: Lock,
    label: "SECURITY",
    title: "Enterprise Security",
    desc: "Role-based access control, SSO, end-to-end encryption, and granular permission policies.",
    metric: "SSO ready",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-xs font-mono text-[#E84545] tracking-wider uppercase mb-4 block">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Everything you need.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A complete automation platform built for modern operations teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl bg-card border border-border hover:border-[#E84545]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-[#E84545]/10 transition-colors">
                  <f.icon className="w-5 h-5 text-muted-foreground group-hover:text-[#E84545] transition-colors" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
                  {f.label}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {f.desc}
              </p>
              <span className="text-xs font-medium text-[#E84545]">
                {f.metric}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
