
import { Zap, Globe, Shield, Gauge, Code, Cpu } from "lucide-react";

const Feature = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="relative rounded-lg p-6 border border-cepheus-gray-dark/30 hover:border-cepheus-green/50 transition-all bg-cepheus-darker/50 backdrop-blur-sm group">
    <div className="absolute -top-3 -left-3 bg-gradient-to-br from-cepheus-green to-cepheus-accent rounded-md p-2 shadow-lg shadow-cepheus-green/20 transition-transform group-hover:scale-110">
      <Icon className="h-5 w-5 text-black" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2 mt-3">{title}</h3>
    <p className="text-cepheus-gray-light">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Scale to thousands of GPUs in seconds with optimized inference for high-volume workloads."
    },
    {
      icon: Globe,
      title: "80+ Models",
      description: "Access cutting-edge AI models from OpenAI, Anthropic, Meta, Google, and more with a single API."
    },
    {
      icon: Shield,
      title: "No Rate Limiting",
      description: "Free 20 RPM during beta phase. Upgrade anytime for higher limits when needed."
    },
    {
      icon: Gauge,
      title: "High Performance",
      description: "Enjoy optimized inference speeds with batch processing capabilities for efficient scaling."
    },
    {
      icon: Code,
      title: "Simple Integration",
      description: "Drop-in replacement for OpenAI's API. Migrate your existing code with minimal changes."
    },
    {
      icon: Cpu,
      title: "100% Compatible",
      description: "Complete OpenAI API compatibility ensures your existing applications work with zero changes."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-cepheus-green/5 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
            Scale To Thousands Of GPUs In Seconds
          </h2>
          <p className="mt-4 text-xl text-cepheus-gray-light max-w-3xl mx-auto">
            Unleash the power of AI with Cepheus' high-performance infrastructure
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
