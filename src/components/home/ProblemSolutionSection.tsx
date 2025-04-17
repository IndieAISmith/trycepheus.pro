
import { CircleOff, CheckCircle2 } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section className="py-20 bg-cepheus-darker relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-cepheus-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cepheus-green/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Problem Column */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-8">
            <div className="flex items-center mb-6">
              <CircleOff className="h-8 w-8 text-red-500 mr-3" />
              <h3 className="text-2xl font-bold text-white">The Problem</h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex">
                <span className="bg-red-500/20 rounded-full h-6 w-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="text-red-400">✕</span>
                </span>
                <div>
                  <h4 className="text-lg font-medium text-white">Expensive API Costs</h4>
                  <p className="text-cepheus-gray-light mt-1">
                    Premium AI model APIs can cost thousands per month, making experimentation costly.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-red-500/20 rounded-full h-6 w-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="text-red-400">✕</span>
                </span>
                <div>
                  <h4 className="text-lg font-medium text-white">Vendor Lock-in</h4>
                  <p className="text-cepheus-gray-light mt-1">
                    Using a single provider's API ties your application to their pricing and limitations.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-red-500/20 rounded-full h-6 w-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="text-red-400">✕</span>
                </span>
                <div>
                  <h4 className="text-lg font-medium text-white">Limited Model Selection</h4>
                  <p className="text-cepheus-gray-light mt-1">
                    Most platforms only offer their own models, restricting your options for best-fit solutions.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-red-500/20 rounded-full h-6 w-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="text-red-400">✕</span>
                </span>
                <div>
                  <h4 className="text-lg font-medium text-white">Strict Rate Limits</h4>
                  <p className="text-cepheus-gray-light mt-1">
                    Tight API call restrictions slow down development and testing processes.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Solution Column */}
          <div className="rounded-xl border border-cepheus-green/30 bg-cepheus-green/5 p-8">
            <div className="flex items-center mb-6">
              <CheckCircle2 className="h-8 w-8 text-cepheus-green mr-3" />
              <h3 className="text-2xl font-bold text-white">The Cepheus Solution</h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex">
                <span className="bg-cepheus-green/20 rounded-full h-6 w-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="text-cepheus-green">✓</span>
                </span>
                <div>
                  <h4 className="text-lg font-medium text-white">Free Access During Beta</h4>
                  <p className="text-cepheus-gray-light mt-1">
                    Experiment with 80+ premium AI models completely free during our beta phase.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-cepheus-green/20 rounded-full h-6 w-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="text-cepheus-green">✓</span>
                </span>
                <div>
                  <h4 className="text-lg font-medium text-white">Model Flexibility</h4>
                  <p className="text-cepheus-gray-light mt-1">
                    Switch between models from OpenAI, Anthropic, Meta, Google, and others without changing code.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-cepheus-green/20 rounded-full h-6 w-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="text-cepheus-green">✓</span>
                </span>
                <div>
                  <h4 className="text-lg font-medium text-white">Compatible API</h4>
                  <p className="text-cepheus-gray-light mt-1">
                    Drop-in replacement for OpenAI's API with zero code changes required for migration.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-cepheus-green/20 rounded-full h-6 w-6 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <span className="text-cepheus-green">✓</span>
                </span>
                <div>
                  <h4 className="text-lg font-medium text-white">Generous Rate Limits</h4>
                  <p className="text-cepheus-gray-light mt-1">
                    20 requests per minute free tier with options to scale as your needs grow.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
