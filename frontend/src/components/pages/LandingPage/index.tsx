import WelcomePage from "./welcome/WelcomePage";
import ContactSection from "./contact/ContactSection";
import FeaturesSection from "./features/FeaturePage";
import TestimonialsSection from "./testimonials/TestimonialsSection";
import HowItWorksSection from "./works/HowItWorksSection ";
import PricingSection from "./pricing/PricingSection";
import FAQSection from "./faq/FAQSection";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-20">
      <WelcomePage />
      <FeaturesSection animation={true} />
      <TestimonialsSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
