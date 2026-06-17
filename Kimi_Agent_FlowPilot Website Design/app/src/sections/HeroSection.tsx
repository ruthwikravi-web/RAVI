import { Link } from "react-router";
import { ArrowRight, Play, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
          <Shield className="w-3.5 h-3.5 text-white/80" />
          <span className="text-sm text-white/80">
            Trusted by Operations Teams
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6 gradient-hero-text">
          Automate the
          <br />
          Unautomated.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
          FlowPilot ingests your unstructured operations and builds self-healing
          workflows in seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#0A0A0A] font-medium rounded-lg hover:scale-[1.02] transition-transform"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
            <Play className="w-4 h-4" />
            Watch Interactive Product Tour
          </button>
        </div>

        {/* Trust Bar */}
        <div className="mt-16 flex items-center justify-center gap-2 text-white/40 text-sm">
          <span className="font-mono text-xs tracking-wider">BACKED BY</span>
          <span className="text-white/60 font-semibold">Y Combinator</span>
        </div>
      </div>
    </section>
  );
}
