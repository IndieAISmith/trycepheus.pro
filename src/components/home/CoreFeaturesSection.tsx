
import { Server, Sparkles, Zap, Layers, Globe, Shield } from "lucide-react";

const CoreFeaturesSection = () => {
  const features = [
    {
      icon: Server,
      title: "High-Performance Infrastructure",
      description: "Enterprise-grade servers optimized for AI inference with lightning-fast response times."
    },
    {
      icon: Sparkles,
      title: "Multi-Model Support",
      description: "Access to 80+ leading AI models through a single, unified API interface."
    },
    {
      icon: Zap,
      title: "Easy Integration",
      description: "Drop-in replacement for OpenAI's API - switch with just one line of code change."
    },
    {
      icon: Layers,
      title: "Robust Architecture",
      description: "Load-balanced infrastructure designed for high reliability and uptime."
    },
    {
      icon: Globe,
      title: "Global Availability",
      description: "Distributed servers ensure low-latency responses around the world."
    },
    {
      icon: Shield,
      title: "Secure by Design",
      description: "Enterprise-grade security with encrypted connections and data protection."
    }
  ];
  
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
            Powerful Features For Seamless Performance
          </h2>
          <p className="mt-4 text-xl text-cepheus-gray-light max-w-3xl mx-auto">
            Everything you need to build production-ready AI applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="h-12 w-12 rounded-md bg-gradient-to-br from-cepheus-green to-cepheus-accent flex items-center justify-center shadow-lg shadow-cepheus-green/20">
                  <feature.icon className="h-6 w-6 text-black" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-cepheus-gray-light">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeaturesSection;
