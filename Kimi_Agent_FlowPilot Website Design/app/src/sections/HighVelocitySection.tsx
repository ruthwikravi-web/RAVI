import { ArrowRight, Gauge } from "lucide-react";

export default function HighVelocitySection() {
  return (
    <section className="py-32 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Video Column */}
          <div className="lg:col-span-3 relative">
            <div className="rounded-xl overflow-hidden border border-border aspect-video">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/high-velocity.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -inset-4 bg-[#2874F0]/5 rounded-2xl -z-10 blur-2xl" />
          </div>

          {/* Text Column */}
          <div className="lg:col-span-2">
            <div className="w-10 h-10 rounded-lg bg-[#2874F0]/10 flex items-center justify-center mb-6">
              <Gauge className="w-5 h-5 text-[#2874F0]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Process at the Speed of Light.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our inference engine doesn't just follow rules; it interprets
              intent. Watch as years of backlogged tasks are cleared in
              milliseconds.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2874F0]" />
                Sub-100ms workflow execution
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2874F0]" />
                Parallel task processing
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2874F0]" />
                Automatic error recovery
              </li>
            </ul>
            <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-[#E84545] transition-colors group">
              See the Benchmarks
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
