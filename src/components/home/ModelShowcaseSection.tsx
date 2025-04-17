import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ModelCardProps {
  name: string;
  provider: string;
  description: string;
  isHot?: boolean;
}

const ModelCard = ({ name, provider, description, isHot = false }: ModelCardProps) => (
  <div className="relative rounded-lg border border-cepheus-gray-dark/30 bg-cepheus-darker p-4 sm:p-6 transition-all hover:border-cepheus-green/50 group h-full">
    {isHot && (
      <div className="absolute -top-3 -right-3 bg-cepheus-accent px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white">
        Popular
      </div>
    )}
    <div className="mb-3">
      <h3 className="text-base sm:text-lg font-semibold text-white">{name}</h3>
      <p className="text-cepheus-green text-sm">{provider}</p>
    </div>
    <p className="text-cepheus-gray-light text-xs sm:text-sm mb-4">{description}</p>
    <div className="mt-auto">
      <Link to={`/models`} className="text-cepheus-green hover:text-cepheus-green-light text-sm font-medium flex items-center">
        View details
        <ArrowRightIcon className="ml-1 h-3 w-3" />
      </Link>
    </div>
  </div>
);

const ModelShowcaseSection = () => {
  const featuredModels = [
    {
      name: "GPT-4o",
      provider: "OpenAI",
      description: "Latest multimodal model with advanced reasoning and vision capabilities.",
      isHot: true
    },
    {
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      description: "Powerful model with excellent instruction following and reasoning.",
      isHot: true
    },
    {
      name: "Llama 3.1 405B",
      provider: "Meta",
      description: "Meta's largest and most capable open model with 405B parameters.",
      isHot: false
    },
    {
      name: "Gemini 2.0 Pro",
      provider: "Google",
      description: "Google's flagship general-purpose model for complex tasks.",
      isHot: false
    },
    {
      name: "DeepSeek-R1",
      provider: "DeepSeek AI",
      description: "Optimized for reasoning with excellent performance on complex problems.",
      isHot: true
    },
    {
      name: "Qwen 2.5 32B",
      provider: "Qwen",
      description: "Powerful and efficient multilingual model from Alibaba.",
      isHot: false
    }
  ];

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-grid-pattern"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cepheus-accent/10 rounded-full filter blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Built With <span className="gradient-text">80+ Models</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-cepheus-gray-light max-w-3xl mx-auto">
            Access the most powerful AI models through a single unified API
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredModels.map((model, index) => (
            <ModelCard
              key={index}
              name={model.name}
              provider={model.provider}
              description={model.description}
              isHot={model.isHot}
            />
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <Button asChild variant="outline" className="border-cepheus-gray-dark hover:bg-cepheus-darker">
            <Link to="/models" className="flex items-center mx-auto">
              View All Models <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModelShowcaseSection;
