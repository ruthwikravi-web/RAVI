import { Star, TrendingDown, Clock, Users } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of Operations",
    company: "Meridian Labs",
    avatar: "/images/avatar-sarah.jpg",
    quote:
      "FlowPilot eliminated 60% of our manual operational work within the first month. Our team can finally focus on strategic initiatives instead of chasing approvals.",
    metric: "60%",
    metricLabel: "workload reduction",
    metricIcon: TrendingDown,
  },
  {
    name: "Marcus Rivera",
    role: "Head of RevOps",
    company: "ScaleForge",
    avatar: "/images/avatar-marcus.jpg",
    quote:
      "We went from 15 different tools and spreadsheets to one unified workflow engine. The AI builder is genuinely impressive — it understood our sales process better than some of our own team.",
    metric: "12h",
    metricLabel: "saved per week",
    metricIcon: Clock,
  },
  {
    name: "Elena Vasquez",
    role: "Customer Success Director",
    company: "NexStream",
    avatar: "/images/avatar-elena.jpg",
    quote:
      "Our onboarding time for new ops hires dropped from 3 weeks to 3 days. FlowPilot's automated workflows handle the repetitive stuff so our team can focus on customers.",
    metric: "3x",
    metricLabel: "faster onboarding",
    metricIcon: Users,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-32 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-xs font-mono text-[#E84545] tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Loved by operations teams.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-[#E84545] text-[#E84545]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                "{t.quote}"
              </p>

              {/* Metric */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary mb-6">
                <t.metricIcon className="w-5 h-5 text-[#E84545]" />
                <div>
                  <span className="text-2xl font-bold text-foreground">
                    {t.metric}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {t.metricLabel}
                  </span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
