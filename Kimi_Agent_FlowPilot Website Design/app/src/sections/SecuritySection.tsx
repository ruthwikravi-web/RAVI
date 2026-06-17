import { ShieldCheck, KeyRound, ScrollText, Fingerprint, Server, Eye } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "SOC 2 Type II",
    desc: "Independently audited security controls",
  },
  {
    icon: KeyRound,
    title: "End-to-End Encryption",
    desc: "AES-256 encryption at rest and TLS 1.3 in transit",
  },
  {
    icon: ScrollText,
    title: "Audit Logs",
    desc: "Complete immutable logs of every system action",
  },
  {
    icon: Fingerprint,
    title: "SSO & SAML",
    desc: "Enterprise single sign-on with Okta, Azure AD, Google",
  },
  {
    icon: Server,
    title: "Role-Based Access",
    desc: "Granular permissions at workflow and data level",
  },
  {
    icon: Eye,
    title: "Data Residency",
    desc: "Choose where your data lives — US, EU, or APAC",
  },
];

export default function SecuritySection() {
  return (
    <section className="py-32 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-mono text-[#E84545] tracking-wider uppercase mb-4 block">
              Security
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Enterprise-grade security.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Your workflow data is sensitive. We treat it that way with
              bank-level encryption, compliance certifications, and granular
              access controls.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {features.slice(0, 3).map((f, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center"
                  >
                    <f.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Trusted by teams at Fortune 500 companies
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-border bg-card hover:border-[#E84545]/30 transition-all"
              >
                <f.icon className="w-6 h-6 text-[#E84545] mb-3" />
                <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
