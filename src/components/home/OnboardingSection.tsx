
import { Code, Settings, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OnboardingSection = () => {
  const steps = [
    {
      number: "01",
      icon: Settings,
      title: "Create an account",
      description: "Sign up for free beta access to get your API key.",
    },
    {
      number: "02",
      icon: Code,
      title: "Integrate the API",
      description: "Add our base URL and API key to your OpenAI SDK configuration.",
    },
    {
      number: "03",
      icon: FileCode,
      title: "Start building",
      description: "Begin making API calls to any of our 80+ supported models.",
    },
  ];

  return (
    <section className="py-20 bg-cepheus-darker relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cepheus-green/10 rounded-full filter blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How To Ship Your First App
          </h2>
          <p className="mt-4 text-xl text-cepheus-gray-light max-w-3xl mx-auto">
            Get up and running with Cepheus in minutes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative rounded-xl border border-cepheus-gray-dark/30 bg-cepheus-dark p-8 transition-all group hover:border-cepheus-green/50">
              <div className="absolute -top-5 -left-5 bg-cepheus-dark text-4xl font-bold text-cepheus-green/20 border border-cepheus-gray-dark/30 rounded-full h-12 w-12 flex items-center justify-center transition-colors group-hover:text-cepheus-green/30">
                {step.number}
              </div>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cepheus-green/20 to-cepheus-accent/20 flex items-center justify-center mb-6">
                <step.icon className="h-6 w-6 text-cepheus-green" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-cepheus-gray-light">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild className="text-black bg-cepheus-green hover:bg-cepheus-green-dark px-6 py-5 text-lg">
            <Link to="/docs">Get Started Now</Link>
          </Button>
          <p className="mt-4 text-cepheus-gray">No credit card required. Free during beta phase.</p>
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
