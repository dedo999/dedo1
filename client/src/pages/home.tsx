import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import LatestNewsSection from "@/components/latest-news-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
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
      <Navigation />
      <HeroSection />
      <LatestNewsSection />
      <AboutSection />
      <ServicesSection />
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
