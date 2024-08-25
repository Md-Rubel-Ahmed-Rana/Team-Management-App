import WelcomePage from "./welcome/WelcomePage";
import ContactSection from "./contact/ContactSection";
import FeaturesSection from "./features/FeaturePage";
import TestimonialsSection from "./testimonials/TestimonialsSection";
import PricingSection from "./pricing/PricingSection";
import FAQSection from "./faq/FAQSection";
import Roadmap from "./timeline";
import PopularTeam from "./popularTeam";
import PopularProjects from "./popularProject";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-20">
      <FeaturesSection animation={true} />
      <Roadmap />
      <PopularTeam />
      <PopularProjects />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
