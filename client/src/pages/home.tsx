import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import InstructorsSection from "@/components/instructors-section";
import ScheduleSection from "@/components/schedule-section";
import PricingSection from "@/components/pricing-section";
import TestimonialsSection from "@/components/testimonials-section";
import CommunitySection from "@/components/community-section";
import ContactSection from "@/components/contact-section";

import Footer from "@/components/footer";
import { SimpleChatbot } from "@/components/simple-chatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-kaizen-darker text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <InstructorsSection />
      <ScheduleSection />
      <PricingSection />
      <TestimonialsSection />
      <CommunitySection />
      <ContactSection />
      <Footer />
      <SimpleChatbot />
    </div>
  );
}
