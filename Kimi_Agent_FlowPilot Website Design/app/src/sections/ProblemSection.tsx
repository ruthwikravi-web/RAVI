import { useState, useEffect, useRef } from "react";
import { Clock, AlertTriangle, Users, Puzzle } from "lucide-react";

const WORDS = ["DELAYS", "CHAOS", "BURNOUT"];

const problems = [
  {
    icon: Clock,
    title: "20+ hours/week",
    desc: "Lost to repetitive operational tasks",
  },
  {
    icon: AlertTriangle,
    title: "Human Errors",
    desc: "From manual data entry and copy-paste",
  },
  {
    icon: Users,
    title: "Approval Bottlenecks",
    desc: "Cross-team coordination delays",
  },
  {
    icon: Puzzle,
    title: "Tool Fragmentation",
    desc: "Work scattered across 10+ platforms",
  },
];

export default function ProblemSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % WORDS.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Draw text on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 200;
    ctx.clearRect(0, 0, 600, 200);
    ctx.fillStyle = "#0A0A0A";
    ctx.font = "900 120px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(WORDS[currentWord], 300, 100);
  }, [currentWord]);

  return (
    <section id="problem" className="py-32 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Text Morph Display */}
        <div className="flex flex-col items-center justify-center mb-20">
          <div className="relative w-full max-w-2xl h-[200px] flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className={`w-full max-w-[600px] h-[200px] transition-all duration-300 ${
                isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
              }`}
              style={{ imageRendering: "auto" }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className={`text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-foreground transition-all duration-300 ${
                  isAnimating
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {WORDS[currentWord]}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Operational debt accumulates silently until it breaks your momentum.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl border border-border bg-card hover:border-[#E84545]/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-[#E84545]/10 transition-colors">
                <p.icon className="w-5 h-5 text-muted-foreground group-hover:text-[#E84545] transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
