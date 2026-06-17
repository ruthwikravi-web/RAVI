import { Link } from "react-router";
import { ArrowRight, Zap } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#E84545]/10 flex items-center justify-center mx-auto mb-8">
          <Zap className="w-8 h-8 text-[#E84545]" />
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Stop managing workflows.
          <br />
          Start automating them.
        </h2>
        <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
          Join 500+ operations teams who have eliminated repetitive work with
          FlowPilot.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#0A0A0A] font-medium rounded-lg hover:scale-[1.02] transition-transform"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}
