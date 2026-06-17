import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does setup take?",
    a: "Most teams are up and running within 15 minutes. Connect your tools, describe your first workflow in natural language, and FlowPilot handles the rest. No engineering resources required.",
  },
  {
    q: "What integrations are supported?",
    a: "FlowPilot supports 150+ native integrations including Slack, Gmail, HubSpot, Salesforce, Notion, Jira, Airtable, GitHub, Stripe, Twilio, and Zendesk. If a tool has an API, we can connect to it.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. FlowPilot is SOC 2 Type II certified with end-to-end AES-256 encryption, role-based access control, and immutable audit logs. We never store or train on your data.",
  },
  {
    q: "Do you offer enterprise support?",
    a: "Yes. Enterprise customers get a dedicated account manager, priority support with 2-hour SLA, custom integrations, SSO/SAML, and the option for on-premise deployment.",
  },
  {
    q: "Can I build custom workflows?",
    a: "Yes! FlowPilot's AI Workflow Builder lets you describe any workflow in plain English. You can also use our visual builder to create complex multi-step automations with conditional logic.",
  },
  {
    q: "What happens if I exceed my execution limit?",
    a: "We'll notify you when you reach 80% of your limit. You can upgrade your plan at any time, or purchase additional execution packs. We never stop critical workflows.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-32 bg-background border-y border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#E84545] tracking-wider uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Questions? Answered.
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border rounded-lg px-6 data-[state=open]:border-[#E84545]/30"
            >
              <AccordionTrigger className="text-left text-sm font-medium py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
