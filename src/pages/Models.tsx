
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown, Info } from "lucide-react";

const Models = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("provider");
  
  // Sample of the models from the provided list
  const allModels = [
    { name: "gpt-4o-2024-11-20", provider: "OpenAI", category: "GPT" },
    { name: "gpt-4o-mini-2024-07-18", provider: "OpenAI", category: "GPT" },
    { name: "o1-mini-2024-09-12", provider: "OpenAI", category: "O1" },
    { name: "gpt-search-realtime", provider: "OpenAI", category: "GPT" },
    { name: "uncensored-gpt-exp-35290", provider: "OpenAI", category: "GPT" },
    { name: "meta/llama-3.3-70b-versatile", provider: "Meta", category: "Llama" },
    { name: "meta/llama-4-scout-17b-16e-instruct", provider: "Meta", category: "Llama" },
    { name: "google/gemini-2.0-flash", provider: "Google", category: "Gemini" },
    { name: "google/gemini-2.0-flash-thinking-exp-01-21", provider: "Google", category: "Gemini" },
    { name: "mistralai/mistral-nemo", provider: "MistralAI", category: "Mistral" },
    { name: "mistralai/mistral-large-uncensored", provider: "MistralAI", category: "Mistral" },
    { name: "deepseek/deepseek-r1", provider: "DeepSeek", category: "DeepSeek" },
    { name: "deepseek/deepseek-r1-distill-qwen-32b", provider: "DeepSeek", category: "DeepSeek" },
    { name: "deepseek/deepseek-r1-distill-llama-70b", provider: "DeepSeek", category: "DeepSeek" },
    { name: "qwen/qwen-2.5-32b-coder", provider: "Qwen", category: "Qwen" },
    { name: "qwen/qwen-qwq-32b", provider: "Qwen", category: "Qwen" },
    { name: "microsoft/phi-4", provider: "Microsoft", category: "Phi" },
    { name: "gpt-4.5-preview-2025-02-27", provider: "OpenAI", category: "GPT" },
    { name: "chatgpt-4o-latest", provider: "OpenAI", category: "GPT" },
    { name: "gpt-4o-search-preview", provider: "OpenAI", category: "GPT" },
    { name: "o1-2024-12-17", provider: "OpenAI", category: "O1" },
    { name: "o3-mini-2025-01-31", provider: "OpenAI", category: "O3" },
    { name: "anthropic/claude-3-5-sonnet-latest", provider: "Anthropic", category: "Claude" },
    { name: "anthropic/claude-3-5-haiku-latest", provider: "Anthropic", category: "Claude" },
    { name: "anthropic/claude-3-7-sonnet-latest", provider: "Anthropic", category: "Claude" },
    // Add more models from the list as needed
  ];

  // Filter models based on search query
  const filteredModels = allModels.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    model.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort models based on selected order
  const sortedModels = [...filteredModels].sort((a, b) => {
    if (sortOrder === "provider") {
      return a.provider.localeCompare(b.provider);
    } else if (sortOrder === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <MainLayout>
      <div className="bg-cepheus-darker py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Available Models</h1>
          <p className="text-xl text-cepheus-gray-light max-w-3xl mx-auto text-center mb-8">
            Access 80+ cutting-edge AI models through our unified API
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cepheus-gray" size={18} />
            <Input
              type="text"
              placeholder="Search models..."
              className="pl-10 bg-cepheus-darker border-cepheus-gray-dark/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            className="border-cepheus-gray-dark/50"
            onClick={() => setSortOrder(sortOrder === "provider" ? "name" : "provider")}
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort by {sortOrder === "provider" ? "Name" : "Provider"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedModels.map((model, index) => (
            <div 
              key={index} 
              className="rounded-lg border border-cepheus-gray-dark/30 bg-cepheus-darker p-6 hover:border-cepheus-green/50 transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white truncate" title={model.name}>
                    {model.name}
                  </h3>
                  <p className="text-cepheus-green text-sm">{model.provider}</p>
                </div>
                <span className="px-2 py-1 bg-cepheus-dark rounded text-xs text-cepheus-gray">
                  {model.category}
                </span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-cepheus-gray-dark/30 flex items-center justify-between">
                <Button variant="link" className="p-0 h-auto text-cepheus-gray-light hover:text-cepheus-green text-sm">
                  <Info className="h-4 w-4 mr-1" />
                  View details
                </Button>
                
                <Button variant="link" className="p-0 h-auto text-cepheus-green hover:text-cepheus-green-light text-sm">
                  Sample prompt
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-cepheus-gray mb-2">Displaying {sortedModels.length} models</p>
          <p className="text-cepheus-gray-light">
            Need a specific model not listed here? <a href="#" className="text-cepheus-green hover:underline">Contact us</a> for custom integrations.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Models;
