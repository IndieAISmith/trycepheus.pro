
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingSection = () => {
  return (
    <section className="py-20 bg-cepheus-darker relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cepheus-green/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cepheus-accent/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Free For Limited Time
          </h2>
          <p className="mt-4 text-xl text-cepheus-gray-light max-w-3xl mx-auto">
            Get unlimited access to all models during our beta phase
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="relative rounded-xl border border-cepheus-gray-dark/30 bg-cepheus-dark p-8 shadow-xl transition-all hover:shadow-cepheus-green/10 hover:border-cepheus-green/50">
            <div className="absolute -top-3 -right-3 bg-cepheus-green px-3 py-1 rounded-full text-xs font-semibold text-black">
              Current Beta
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Beta Access</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-extrabold text-cepheus-green">Free</span>
              <span className="ml-2 text-cepheus-gray-light">during beta</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cepheus-green mr-2 flex-shrink-0 mt-0.5" />
                <span>20 requests per minute</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cepheus-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Access to all 80+ models</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cepheus-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Standard support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cepheus-green mr-2 flex-shrink-0 mt-0.5" />
                <span>Single API key</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cepheus-green mr-2 flex-shrink-0 mt-0.5" />
                <span>No credit card required</span>
              </li>
            </ul>
            
            <Button asChild className="w-full bg-cepheus-green hover:bg-cepheus-green-dark text-black">
              <Link to="/docs">Get Started Free</Link>
            </Button>
          </div>
          
          {/* Pro Plan (Coming Soon) */}
          <div className="rounded-xl border border-cepheus-gray-dark/30 bg-cepheus-dark p-8 shadow-xl transition-all hover:shadow-cepheus-accent/10 hover:border-cepheus-accent/30">
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-extrabold text-white">$49</span>
              <span className="ml-2 text-cepheus-gray-light">/month</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cepheus-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>100 requests per minute</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cepheus-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>Access to all 80+ models</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cepheus-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cepheus-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>Multiple API keys</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-cepheus-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>Usage analytics</span>
              </li>
            </ul>
            
            <Button variant="outline" disabled className="w-full">
              Coming Soon
            </Button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="rounded-xl border border-cepheus-gray-dark/30 bg-cepheus-dark p-8 shadow-xl transition-all hover:shadow-blue-500/10 hover:border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-extrabold text-white">Custom</span>
              <span className="ml-2 text-cepheus-gray-light">pricing</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Unlimited requests</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Access to all models + exclusives</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Dedicated support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Custom integrations</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>SLA guarantees</span>
              </li>
            </ul>
            
            <Button variant="outline" disabled className="w-full">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
