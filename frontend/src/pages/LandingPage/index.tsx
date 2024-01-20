import WelcomePage from "./welcome/WelcomePage";
import ContactSection from "./contact/ContactSection";
import FeaturesSection from "./features/FeaturePage";
import TestimonialsSection from "./testimonials/TestimonialsSection";
import HowItWorksSection from "./works/HowItWorksSection ";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-20">
      <WelcomePage />
      <FeaturesSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
