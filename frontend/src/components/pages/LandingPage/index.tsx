import WelcomePage from "./welcome/WelcomePage";
import ContactSection from "./contact/ContactSection";
import FeaturesSection from "./features/FeaturePage";
import TestimonialsSection from "./testimonials/TestimonialsSection";
import PricingSection from "./pricing/PricingSection";
import FAQSection from "./faq/FAQSection";
import Roadmap from "./timeline";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-20">
      <FeaturesSection animation={true} />
      <Roadmap />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
