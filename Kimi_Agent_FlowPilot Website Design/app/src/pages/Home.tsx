import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import HeroSection from "@/sections/HeroSection";
import ProblemSection from "@/sections/ProblemSection";
import SolutionSection from "@/sections/SolutionSection";
import HighVelocitySection from "@/sections/HighVelocitySection";
import FeaturesSection from "@/sections/FeaturesSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import IntegrationsSection from "@/sections/IntegrationsSection";
import YCSection from "@/sections/YCSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import SecuritySection from "@/sections/SecuritySection";
import PricingSection from "@/sections/PricingSection";
import FAQSection from "@/sections/FAQSection";
import CTASection from "@/sections/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HighVelocitySection />
        <FeaturesSection />
        <HowItWorksSection />
        <IntegrationsSection />
        <YCSection />
        <TestimonialsSection />
        <SecuritySection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
