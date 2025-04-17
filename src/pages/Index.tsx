
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProblemSolutionSection from "@/components/home/ProblemSolutionSection";
import CodeExampleSection from "@/components/home/CodeExampleSection";
import CoreFeaturesSection from "@/components/home/CoreFeaturesSection";
import PricingSection from "@/components/home/PricingSection";
import ModelShowcaseSection from "@/components/home/ModelShowcaseSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ResourcesSection from "@/components/home/ResourcesSection";
import OnboardingSection from "@/components/home/OnboardingSection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <ProblemSolutionSection />
      <CodeExampleSection />
      <CoreFeaturesSection />
      <PricingSection />
      <ModelShowcaseSection />
      <TestimonialsSection />
      <ResourcesSection />
      <OnboardingSection />
    </MainLayout>
  );
};

export default Index;
