
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
      {/* Background pattern/grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 -left-32 w-64 h-64 bg-cepheus-green/10 rounded-full filter blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-cepheus-accent/10 rounded-full filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-cepheus-gray-light">
            <span className="text-cepheus-green"> Fast, reliable, and free during beta.</span>
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4">
            <Button asChild className="text-black bg-cepheus-green hover:bg-cepheus-green-dark px-6 py-5 w-full sm:w-auto text-base sm:text-lg">
              <Link to="/docs">Get Started</Link>
            </Button>
            <Button asChild variant="outline" className="border-cepheus-gray-dark hover:bg-cepheus-darker px-6 py-5 w-full sm:w-auto text-base sm:text-lg">
              <Link to="/models" className="flex items-center justify-center">
                Explore Models <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 sm:mt-8 text-cepheus-gray text-sm sm:text-base">
            <p>Free during beta • 20 requests per minute • No credit card required</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
