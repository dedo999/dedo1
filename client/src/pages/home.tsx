import MobileNavbar from "@/components/mobile-navbar";
import MobileOptimizedHero from "@/components/mobile-optimized-hero";
import AboutSection from "@/components/about-section";
import MobileOptimizedServices from "@/components/mobile-optimized-services";
import InstructorsSection from "@/components/instructors-section";
import ScheduleSection from "@/components/schedule-section";
import PricingSection from "@/components/pricing-section";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import StructuredData from "@/components/structured-data";
import { SimpleChatbot } from "@/components/simple-chatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-kaizen-darker text-white overflow-x-hidden">
      <StructuredData />
      <MobileNavbar />
      <MobileOptimizedHero />
      <AboutSection />
      <MobileOptimizedServices />
      <InstructorsSection />
      <ScheduleSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <SimpleChatbot />
    </div>
  );
}
