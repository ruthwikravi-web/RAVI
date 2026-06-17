import { Plug, MessageSquare, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Plug,
    title: "Connect Tools",
    desc: "Link your existing stack in minutes. Slack, CRM, email, project management — FlowPilot connects to 150+ tools natively.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Describe Workflow",
    desc: "Tell FlowPilot what you want in plain English. Our AI understands intent and translates it into executable workflows.",
  },
  {
    number: "03",
    icon: Zap,
    title: "AI Executes",
    desc: "Sit back and watch. FlowPilot runs your workflows autonomously, handles errors, and delivers results to your team.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-32 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-xs font-mono text-[#E84545] tracking-wider uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Three steps to automation.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="p-8 rounded-xl border border-border bg-card hover:border-[#E84545]/30 transition-all duration-300 h-full">
                <span className="text-xs font-mono text-muted-foreground mb-6 block">
                  {step.number}
                </span>
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-[#E84545]/10 transition-colors">
                  <step.icon className="w-6 h-6 text-muted-foreground group-hover:text-[#E84545] transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
