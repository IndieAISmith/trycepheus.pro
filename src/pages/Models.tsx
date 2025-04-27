import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Info, Sparkles, Code, Brain, Bot, Zap, RefreshCw, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import OpenAI from "openai";
import { toast } from "@/components/ui/sonner";

// Custom fetch implementation to avoid OPTIONS preflight requests
const customFetch = async (url: RequestInfo | URL, init?: RequestInit) => {
  // Modify the request to avoid triggering CORS preflight
  const modifiedInit: RequestInit = {
    ...init,
    headers: {
      ...init?.headers,
      // Add headers that don't trigger preflight
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    // Use 'GET' for simple requests when possible to avoid preflight
    // Only modify if it's a POST that would trigger preflight
    method: init?.method === 'POST' && !init?.body ? 'GET' : init?.method,
  };

  return fetch(url, modifiedInit);
};

// Create OpenAI client instance
const openai = new OpenAI({
  baseURL: "https://cepheus-x.vercel.app/v1/", // Correct API endpoint
  apiKey: "sk-efghijkl5678mnopabcd1234efghijkl5678mnop",
  dangerouslyAllowBrowser: true, // Required for client-side usage
  timeout: 30000, // 30 seconds timeout
  maxRetries: 3, // Retry failed requests up to 3 times
  defaultHeaders: {
    // Add headers to prevent CORS preflight OPTIONS requests
    "Content-Type": "application/json",
    "X-Skip-Preflight": "true"
  },
  defaultQuery: {
    // Add query parameter to signal no preflight needed
    skipOptions: "true"
  },
  fetch: customFetch
});

// Fallback list of models in case API call fails
const fallbackModels = [
  "gpt-4o-2024-11-20","gpt-4o-mini-2024-07-18","o1-mini-2024-09-12","gpt-search-realtime",
  "uncensored-gpt-exp-35290","meta/llama-3.3-70b-versatile","meta/llama-4-scout-17b-16e-instruct",
  "google/gemini-2.0-flash","google/gemini-2.0-flash-thinking-exp-01-21","mistralai/mistral-nemo",
  "mistralai/mistral-large-uncensored","deepseek/deepseek-r1","deepseek/deepseek-r1-distill-qwen-32b",
  "deepseek/deepseek-r1-distill-llama-70b","qwen/qwen-2.5-32b-coder","qwen/qwen-qwq-32b",
  "microsoft/phi-4","gpt-4.5-preview-2025-02-27","chatgpt-4o-latest","gpt-4o-search-preview",
  "o1-2024-12-17","o3-mini-2025-01-31","anthropic/claude-3-5-sonnet-latest","anthropic/claude-3-5-haiku-latest",
  "anthropic/claude-3-7-sonnet-latest","anthropic/claude-3-7-sonnet-20250219","deepseek-ai/deepseek-r1"
];

// Interface for model data
interface ModelData {
  name: string;
  provider: string;
  category: string;
  features: string[];
  isAvailable?: boolean;
}

// Interface for stored models in localStorage
interface StoredModels {
  timestamp: number;
  models: string[];
}

const Models = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("name");
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [fetchedModelNames, setFetchedModelNames] = useState<string[]>([]);

  // Complete list of models with features
  const allModels = [
    {
      name: "gpt-4o-2024-11-20",
      provider: "OpenAI",
      category: "GPT",
      features: [
        "Advanced reasoning capabilities",
        "Multimodal input support",
        "High accuracy on complex tasks"
      ]
    },
    {
      name: "gpt-4o-mini-2024-07-18",
      provider: "OpenAI",
      category: "GPT",
      features: [
        "Lightweight version of GPT-4o",
        "Faster inference times",
        "Cost-effective for simpler tasks"
      ]
    },
    {
      name: "o1-mini-2024-09-12",
      provider: "OpenAI",
      category: "O1",
      features: [
        "Specialized for code generation",
        "Optimized for developer workflows",
        "Supports multiple programming languages"
      ]
    },
    {
      name: "gpt-search-realtime",
      provider: "OpenAI",
      category: "GPT",
      features: [
        "Real-time information retrieval",
        "Up-to-date knowledge base",
        "Factual accuracy with citations"
      ]
    },
    {
      name: "uncensored-gpt-exp-35290",
      provider: "OpenAI",
      category: "GPT",
      features: [
        "Less restricted content generation",
        "Creative writing capabilities",
        "Alternative perspectives"
      ]
    },
    {
      name: "meta/llama-3.3-70b-versatile",
      provider: "Meta",
      category: "Llama",
      features: [
        "70 billion parameter model",
        "Versatile for multiple tasks",
        "Strong reasoning capabilities"
      ]
    },
    {
      name: "meta/llama-4-scout-17b-16e-instruct",
      provider: "Meta",
      category: "Llama",
      features: [
        "Instruction-tuned for better following",
        "Efficient 17B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "google/gemini-2.0-flash",
      provider: "Google",
      category: "Gemini",
      features: [
        "Ultra-fast inference speed",
        "Optimized for real-time applications",
        "Efficient resource utilization"
      ]
    },
    {
      name: "google/gemini-2.0-flash-thinking-exp-01-21",
      provider: "Google",
      category: "Gemini",
      features: [
        "Enhanced reasoning capabilities",
        "Experimental thinking mode",
        "Improved problem-solving skills"
      ]
    },
    {
      name: "mistralai/mistral-nemo",
      provider: "MistralAI",
      category: "Mistral",
      features: [
        "Specialized for reasoning tasks",
        "Strong mathematical capabilities",
        "Clear and concise outputs"
      ]
    },
    {
      name: "mistralai/mistral-large-uncensored",
      provider: "MistralAI",
      category: "Mistral",
      features: [
        "Less restricted content generation",
        "Creative writing capabilities",
        "Alternative perspectives"
      ]
    },
    {
      name: "deepseek/deepseek-r1",
      provider: "DeepSeek",
      category: "DeepSeek",
      features: [
        "Advanced reasoning capabilities",
        "Strong problem-solving skills",
        "High accuracy on complex tasks"
      ]
    },
    {
      name: "deepseek/deepseek-r1-distill-qwen-32b",
      provider: "DeepSeek",
      category: "DeepSeek",
      features: [
        "Distilled from larger models",
        "Efficient 32B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "deepseek/deepseek-r1-distill-llama-70b",
      provider: "DeepSeek",
      category: "DeepSeek",
      features: [
        "Distilled from Llama 70B",
        "Efficient parameter size",
        "Strong reasoning capabilities"
      ]
    },
    {
      name: "qwen/qwen-2.5-32b-coder",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Specialized for code generation",
        "Supports multiple programming languages",
        "Strong code understanding"
      ]
    },
    {
      name: "qwen/qwen-qwq-32b",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Specialized model for specific tasks",
        "Efficient 32B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "microsoft/phi-4",
      provider: "Microsoft",
      category: "Phi",
      features: [
        "Small but powerful model",
        "Efficient for edge deployment",
        "Strong reasoning capabilities"
      ]
    },
    {
      name: "gpt-4.5-preview-2025-02-27",
      provider: "OpenAI",
      category: "GPT",
      features: [
        "Preview of upcoming GPT-4.5",
        "Enhanced capabilities",
        "Early access to new features"
      ]
    },
    {
      name: "chatgpt-4o-latest",
      provider: "OpenAI",
      category: "GPT",
      features: [
        "Latest version of ChatGPT-4o",
        "Always up-to-date capabilities",
        "Consistent performance"
      ]
    },
    {
      name: "gpt-4o-search-preview",
      provider: "OpenAI",
      category: "GPT",
      features: [
        "Preview of search capabilities",
        "Real-time information retrieval",
        "Factual accuracy with citations"
      ]
    },
    {
      name: "o1-2024-12-17",
      provider: "OpenAI",
      category: "O1",
      features: [
        "Specialized for code generation",
        "Optimized for developer workflows",
        "Supports multiple programming languages"
      ]
    },
    {
      name: "o3-mini-2025-01-31",
      provider: "OpenAI",
      category: "O3",
      features: [
        "Lightweight version of O3",
        "Faster inference times",
        "Cost-effective for simpler tasks"
      ]
    },
    {
      name: "anthropic/claude-3-5-sonnet-latest",
      provider: "Anthropic",
      category: "Claude",
      features: [
        "Latest Claude 3.5 Sonnet model",
        "Strong reasoning capabilities",
        "Clear and concise outputs"
      ]
    },
    {
      name: "anthropic/claude-3-5-haiku-latest",
      provider: "Anthropic",
      category: "Claude",
      features: [
        "Lightweight Claude 3.5 model",
        "Faster inference times",
        "Cost-effective for simpler tasks"
      ]
    },
    {
      name: "anthropic/claude-3-7-sonnet-latest",
      provider: "Anthropic",
      category: "Claude",
      features: [
        "Latest Claude 3.7 Sonnet model",
        "Enhanced reasoning capabilities",
        "Improved problem-solving skills"
      ]
    },
    {
      name: "anthropic/claude-3-7-sonnet-20250219",
      provider: "Anthropic",
      category: "Claude",
      features: [
        "Specific version of Claude 3.7",
        "Consistent performance",
        "Reproducible results"
      ]
    },
    {
      name: "deepseek-ai/deepseek-r1",
      provider: "DeepSeek AI",
      category: "DeepSeek",
      features: [
        "Advanced reasoning capabilities",
        "Strong problem-solving skills",
        "High accuracy on complex tasks"
      ]
    },
    {
      name: "deepseek-ai/deepseek-r1-groq",
      provider: "DeepSeek AI",
      category: "DeepSeek",
      features: [
        "Optimized for Groq hardware",
        "Ultra-fast inference speed",
        "Efficient resource utilization"
      ]
    },
    {
      name: "deepseek-ai/deepseek-v3",
      provider: "DeepSeek AI",
      category: "DeepSeek",
      features: [
        "Latest DeepSeek model",
        "Enhanced capabilities",
        "Improved performance"
      ]
    },
    {
      name: "deepseek-ai/deepseek-v3-0324",
      provider: "DeepSeek AI",
      category: "DeepSeek",
      features: [
        "Specific version of DeepSeek v3",
        "Consistent performance",
        "Reproducible results"
      ]
    },
    {
      name: "google/gemini-1.5-flash",
      provider: "Google",
      category: "Gemini",
      features: [
        "Ultra-fast inference speed",
        "Optimized for real-time applications",
        "Efficient resource utilization"
      ]
    },
    {
      name: "google/gemini-1.5-pro",
      provider: "Google",
      category: "Gemini",
      features: [
        "Professional-grade capabilities",
        "Strong reasoning skills",
        "High accuracy on complex tasks"
      ]
    },
    {
      name: "google/gemini-2.0-pro",
      provider: "Google",
      category: "Gemini",
      features: [
        "Professional-grade capabilities",
        "Enhanced reasoning skills",
        "Improved performance"
      ]
    },
    {
      name: "google/gemini-2.5-pro-preview-03-25",
      provider: "Google",
      category: "Gemini",
      features: [
        "Preview of upcoming Gemini 2.5",
        "Enhanced capabilities",
        "Early access to new features"
      ]
    },
    {
      name: "mistralai/mistral-large",
      provider: "MistralAI",
      category: "Mistral",
      features: [
        "Large-scale model",
        "Strong reasoning capabilities",
        "High accuracy on complex tasks"
      ]
    },
    {
      name: "meta/llama-3.1-405b-versatile",
      provider: "Meta",
      category: "Llama",
      features: [
        "Massive 405B parameter model",
        "Versatile for multiple tasks",
        "State-of-the-art performance"
      ]
    },
    {
      name: "meta/llama-3.3-70b-instruct-fp8-fast",
      provider: "Meta",
      category: "Llama",
      features: [
        "FP8 quantization for speed",
        "Instruction-tuned for better following",
        "Balanced performance and speed"
      ]
    },
    {
      name: "qwen/qwen-max",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Largest Qwen model",
        "Maximum capabilities",
        "State-of-the-art performance"
      ]
    },
    {
      name: "qwen/qwen-plus",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Enhanced Qwen model",
        "Strong reasoning capabilities",
        "Improved performance"
      ]
    },
    {
      name: "qwen/qwen-turbo",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Ultra-fast inference speed",
        "Optimized for real-time applications",
        "Efficient resource utilization"
      ]
    },
    {
      name: "qwen/qwq-plus",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Enhanced QWQ model",
        "Strong reasoning capabilities",
        "Improved performance"
      ]
    },
    {
      name: "x-ai/grok-2-1212",
      provider: "x-ai",
      category: "Grok",
      features: [
        "Latest Grok model",
        "Enhanced capabilities",
        "Improved performance"
      ]
    },
    {
      name: "deepseek-ai/deepseek-r1-turbo",
      provider: "DeepSeek AI",
      category: "DeepSeek",
      features: [
        "Ultra-fast inference speed",
        "Optimized for real-time applications",
        "Efficient resource utilization"
      ]
    },
    {
      name: "deepseek-ai/deepseek-r1-distill-llama-70b",
      provider: "DeepSeek AI",
      category: "DeepSeek",
      features: [
        "Distilled from Llama 70B",
        "Efficient parameter size",
        "Strong reasoning capabilities"
      ]
    },
    {
      name: "deepseek-ai/deepseek-r1-distill-qwen-32b",
      provider: "DeepSeek AI",
      category: "DeepSeek",
      features: [
        "Distilled from Qwen 32B",
        "Efficient parameter size",
        "Strong reasoning capabilities"
      ]
    },
    {
      name: "qwen/qwq-32b",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Specialized model for specific tasks",
        "Efficient 32B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "google/gemma-3-27b-it",
      provider: "Google",
      category: "Gemma",
      features: [
        "Instruction-tuned for better following",
        "Efficient 27B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "google/gemma-3-12b-it",
      provider: "Google",
      category: "Gemma",
      features: [
        "Instruction-tuned for better following",
        "Efficient 12B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "google/gemma-3-4b-it",
      provider: "Google",
      category: "Gemma",
      features: [
        "Instruction-tuned for better following",
        "Efficient 4B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "microsoft/phi-4-multimodal-instruct",
      provider: "Microsoft",
      category: "Phi",
      features: [
        "Multimodal input support",
        "Instruction-tuned for better following",
        "Small but powerful model"
      ]
    },
    {
      name: "meta/llama-4-maverick-17b-128e-instruct-fp8",
      provider: "Meta",
      category: "Llama",
      features: [
        "FP8 quantization for speed",
        "Instruction-tuned for better following",
        "Balanced performance and speed"
      ]
    },
    {
      name: "meta/llama-3.3-70b-instruct-turbo",
      provider: "Meta",
      category: "Llama",
      features: [
        "Ultra-fast inference speed",
        "Instruction-tuned for better following",
        "Balanced performance and speed"
      ]
    },
    {
      name: "meta/llama-3.3-70b-instruct",
      provider: "Meta",
      category: "Llama",
      features: [
        "Instruction-tuned for better following",
        "Strong reasoning capabilities",
        "High accuracy on complex tasks"
      ]
    },
    {
      name: "meta/meta-llama-3.1-8b-instruct-turbo",
      provider: "Meta",
      category: "Llama",
      features: [
        "Ultra-fast inference speed",
        "Instruction-tuned for better following",
        "Balanced performance and speed"
      ]
    },
    {
      name: "meta/llama-3.2-90b-vision-instruct",
      provider: "Meta",
      category: "Llama",
      features: [
        "Vision capabilities",
        "Instruction-tuned for better following",
        "Strong reasoning capabilities"
      ]
    },
    {
      name: "meta/llama-3.2-11b-vision-instruct",
      provider: "Meta",
      category: "Llama",
      features: [
        "Vision capabilities",
        "Instruction-tuned for better following",
        "Balanced performance and speed"
      ]
    },
    {
      name: "mistralai/mistral-small-24b-instruct-2501",
      provider: "MistralAI",
      category: "Mistral",
      features: [
        "Instruction-tuned for better following",
        "Efficient 24B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "qwen/qwen2.5-coder-32b-instruct",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Specialized for code generation",
        "Instruction-tuned for better following",
        "Supports multiple programming languages"
      ]
    },
    {
      name: "qwen/qwen2.5-72b-instruct",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Instruction-tuned for better following",
        "Strong reasoning capabilities",
        "High accuracy on complex tasks"
      ]
    },
    {
      name: "nvidia/llama-3.1-nemotron-70b-instruct",
      provider: "NVIDIA",
      category: "Llama",
      features: [
        "Optimized for NVIDIA hardware",
        "Instruction-tuned for better following",
        "Strong reasoning capabilities"
      ]
    },
    {
      name: "cohere/command-a-03-2025",
      provider: "Cohere",
      category: "Command",
      features: [
        "Latest Command model",
        "Enhanced capabilities",
        "Improved performance"
      ]
    },
    {
      name: "cohere/command-r-plus-08-2024",
      provider: "Cohere",
      category: "Command",
      features: [
        "Enhanced Command-R model",
        "Strong reasoning capabilities",
        "Improved performance"
      ]
    },
    {
      name: "cohere/command-r-08-2024",
      provider: "Cohere",
      category: "Command",
      features: [
        "Latest Command-R model",
        "Strong reasoning capabilities",
        "Improved performance"
      ]
    },
    {
      name: "cohere/command-r-plus",
      provider: "Cohere",
      category: "Command",
      features: [
        "Enhanced Command-R model",
        "Strong reasoning capabilities",
        "Improved performance"
      ]
    },
    {
      name: "cohere/command-r",
      provider: "Cohere",
      category: "Command",
      features: [
        "Command-R model",
        "Strong reasoning capabilities",
        "Balanced performance and speed"
      ]
    },
    {
      name: "cohere/command-r7b-12-2024",
      provider: "Cohere",
      category: "Command",
      features: [
        "7B parameter Command model",
        "Efficient parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "cohere/command-r7b-arabic-02-2025",
      provider: "Cohere",
      category: "Command",
      features: [
        "Specialized for Arabic language",
        "Efficient 7B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "google/gemini-2.5-pro-exp-03-25",
      provider: "Google",
      category: "Gemini",
      features: [
        "Preview of upcoming Gemini 2.5",
        "Enhanced capabilities",
        "Early access to new features"
      ]
    },
    {
      name: "google/gemini-2.0-pro-exp-02-05",
      provider: "Google",
      category: "Gemini",
      features: [
        "Preview of upcoming Gemini 2.0",
        "Enhanced capabilities",
        "Early access to new features"
      ]
    },
    {
      name: "mistralai/mistral-small-3.1-24b-instruct",
      provider: "MistralAI",
      category: "Mistral",
      features: [
        "Instruction-tuned for better following",
        "Efficient 24B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "deepseek/deepseek-chat-v3-0324",
      provider: "DeepSeek",
      category: "DeepSeek",
      features: [
        "Chat-optimized DeepSeek v3",
        "Enhanced conversational capabilities",
        "Improved performance"
      ]
    },
    {
      name: "meta/llama-4-maverick",
      provider: "Meta",
      category: "Llama",
      features: [
        "Latest Llama 4 model",
        "Enhanced capabilities",
        "Improved performance"
      ]
    },
    {
      name: "google/gemma2-9b-it",
      provider: "Google",
      category: "Gemma",
      features: [
        "Instruction-tuned for better following",
        "Efficient 9B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "meta/llama-3.1-8b-instant",
      provider: "Meta",
      category: "Llama",
      features: [
        "Ultra-fast inference speed",
        "Efficient 8B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "meta/llama-3.2-1b-preview",
      provider: "Meta",
      category: "Llama",
      features: [
        "Preview of upcoming Llama 3.2",
        "Efficient 1B parameter size",
        "Early access to new features"
      ]
    },
    {
      name: "meta/llama-3.2-3b-preview",
      provider: "Meta",
      category: "Llama",
      features: [
        "Preview of upcoming Llama 3.2",
        "Efficient 3B parameter size",
        "Early access to new features"
      ]
    },
    {
      name: "meta/llama-3.2-90b-vision-preview",
      provider: "Meta",
      category: "Llama",
      features: [
        "Preview of upcoming Llama 3.2",
        "Vision capabilities",
        "Early access to new features"
      ]
    },
    {
      name: "meta/llama-3.3-70b-specdec",
      provider: "Meta",
      category: "Llama",
      features: [
        "Speculative decoding for speed",
        "Strong reasoning capabilities",
        "Balanced performance and speed"
      ]
    },
    {
      name: "meta/llama3-70b-8192",
      provider: "Meta",
      category: "Llama",
      features: [
        "Extended context window (8192 tokens)",
        "Strong reasoning capabilities",
        "High accuracy on complex tasks"
      ]
    },
    {
      name: "meta/llama3-8b-8192",
      provider: "Meta",
      category: "Llama",
      features: [
        "Extended context window (8192 tokens)",
        "Efficient 8B parameter size",
        "Balanced performance and speed"
      ]
    },
    {
      name: "qwen/qwen-2.5-32b",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Efficient 32B parameter size",
        "Strong reasoning capabilities",
        "Balanced performance and speed"
      ]
    },
    {
      name: "qwen/qwen-2.5-coder-32b",
      provider: "Qwen",
      category: "Qwen",
      features: [
        "Specialized for code generation",
        "Supports multiple programming languages",
        "Strong code understanding"
      ]
    },
    {
      name: "meta/llama3.1-8b",
      provider: "Meta",
      category: "Llama",
      features: [
        "Efficient 8B parameter size",
        "Strong reasoning capabilities",
        "Balanced performance and speed"
      ]
    },
    {
      name: "meta/llama-3.3-70b",
      provider: "Meta",
      category: "Llama",
      features: [
        "Strong reasoning capabilities",
        "High accuracy on complex tasks",
        "Balanced performance and speed"
      ]
    }
  ];

  // Function to convert fetched model names to ModelData format
  const convertToModelData = (modelNames: string[]): ModelData[] => {
    return modelNames.map(name => {
      // Extract provider from model name if it contains a slash
      let provider = "Unknown";
      let category = "API";

      if (name.includes('/')) {
        const parts = name.split('/');
        provider = parts[0].charAt(0).toUpperCase() + parts[0].slice(1); // Capitalize provider name
      } else if (name.startsWith('gpt')) {
        provider = "OpenAI";
        category = "GPT";
      } else if (name.includes('claude')) {
        provider = "Anthropic";
        category = "Claude";
      } else if (name.includes('llama')) {
        provider = "Meta";
        category = "Llama";
      } else if (name.includes('gemini')) {
        provider = "Google";
        category = "Gemini";
      } else if (name.includes('mistral')) {
        provider = "MistralAI";
        category = "Mistral";
      }

      return {
        name: name,
        provider: provider,
        category: category,
        features: [
          "Available via API",
          "Dynamically fetched",
          "Up-to-date model"
        ]
      };
    });
  };

  // Function to fetch models from API
  const fetchModelsFromAPI = async () => {
    setIsLoadingModels(true);
    try {
      // Try to fetch models from the API with options to avoid preflight
      const response = await openai.models.list({
        headers: {
          'X-Skip-Preflight': 'true'
        }
      });


      if (response.data && response.data.length > 0) {
        // Extract model IDs and sort them
        const modelIds = response.data.map(model => model.id).sort();

        // Save models to state
        setFetchedModelNames(modelIds);

        // Save models to localStorage with timestamp
        const storedData: StoredModels = {
          timestamp: Date.now(),
          models: modelIds
        };
        localStorage.setItem('cepheus-models', JSON.stringify(storedData));

        toast.success("Models updated successfully", {
          description: `${modelIds.length} models loaded from API`
        });

        return modelIds;
      } else {
        // Fallback to default models list if API returns empty list
        toast.warning("No models returned from API", {
          description: "Using fallback model list instead"
        });

        // Set the fallback models in state
        setFetchedModelNames(fallbackModels);
        return fallbackModels;
      }
    } catch (error) {


      // Fallback to default models list if API call fails
      toast.warning("Using fallback models", {
        description: "API connection failed. Using pre-configured model list instead."
      });

      // Set the fallback models in state
      setFetchedModelNames(fallbackModels);
      return fallbackModels;
    } finally {
      setIsLoadingModels(false);
    }
  };

  // Function to check if stored models are older than one day
  const areModelsOutdated = (timestamp: number): boolean => {
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const now = Date.now();
    return (now - timestamp) > oneDayInMs;
  };

  // Function to get models from localStorage or fetch from API if needed
  const getModels = async () => {
    try {
      // Check if localStorage is available (might not be in some environments)
      if (typeof window !== 'undefined' && window.localStorage) {
        // Try to get models from localStorage
        const storedModelsJson = localStorage.getItem('cepheus-models');

        if (storedModelsJson) {
          try {
            const storedModels: StoredModels = JSON.parse(storedModelsJson);

            // Check if models are outdated (older than one day)
            if (areModelsOutdated(storedModels.timestamp)) {

              return await fetchModelsFromAPI();
            } else {

              setFetchedModelNames(storedModels.models);
              return storedModels.models;
            }
          } catch (parseError) {

            // Invalid JSON in localStorage, fetch from API
            return await fetchModelsFromAPI();
          }
        } else {
          // No models in localStorage, fetch from API
          return await fetchModelsFromAPI();
        }
      } else {
        // localStorage not available, fetch from API
        return await fetchModelsFromAPI();
      }
    } catch (error) {

      return fallbackModels;
    }
  };

  // Load models when component mounts
  useEffect(() => {
    getModels();
  }, []);

  // Function to manually refresh models
  const handleRefreshModels = async () => {
    await fetchModelsFromAPI();
  };

  // Convert fetched model names to ModelData format
  const apiModels = convertToModelData(fetchedModelNames);

  // Create a set of available model names for quick lookup
  const availableModelNames = new Set(fetchedModelNames);

  // Create combined models list with availability flag
  const combinedModels = allModels.map(model => ({
    ...model,
    isAvailable: availableModelNames.has(model.name)
  }));

  // Add API models that don't exist in the catalog
  apiModels.forEach(apiModel => {
    if (!combinedModels.some(model => model.name === apiModel.name)) {
      combinedModels.push({
        ...apiModel,
        isAvailable: true // API models are always available
      });
    }
  });

  // Filter models based on availability and search query
  const filteredModels = combinedModels.filter(model =>
    model.isAvailable && (
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sort models based on selected order
  const sortedModels = [...filteredModels].sort((a, b) => {
    if (sortOrder === "provider") {
      return a.provider.localeCompare(b.provider);
    } else if (sortOrder === "name") {
      return a.name.localeCompare(b.name);
    }
    // Default to name sorting
    return a.name.localeCompare(b.name);
  });

  // Get icon based on model category
  const getModelIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'gpt':
        return <Brain className="h-5 w-5" />;
      case 'llama':
        return <Sparkles className="h-5 w-5" />;
      case 'gemini':
        return <Bot className="h-5 w-5" />;
      case 'claude':
        return <Zap className="h-5 w-5" />;
      case 'gemma':
        return <Bot className="h-5 w-5" />;
      case 'command':
        return <Code className="h-5 w-5" />;
      case 'grok':
        return <Brain className="h-5 w-5" />;
      default:
        return <Code className="h-5 w-5" />;
    }
  };

  return (
    <MainLayout>
      <div className="bg-cepheus-darker py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">Available Models</h1>
          <p className="text-lg sm:text-xl text-cepheus-gray-light max-w-3xl mx-auto text-center mb-4">
            Access {sortedModels.length} available AI models through our unified API
          </p>
          {fetchedModelNames.length > 0 && (
            <p className="text-sm text-cepheus-gray-light text-center mb-8">
              Last API update: {(() => {
                try {
                  if (typeof window !== 'undefined' && window.localStorage) {
                    const storedData = localStorage.getItem('cepheus-models');
                    if (storedData) {
                      const parsed = JSON.parse(storedData);
                      if (parsed && parsed.timestamp) {
                        return new Date(parsed.timestamp).toLocaleString();
                      }
                    }
                  }
                  return 'Never';
                } catch (error) {
                  return 'Never';
                }
              })()}
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cepheus-gray" size={18} />
            <Input
              type="text"
              placeholder="Search models..."
              className="pl-10 bg-cepheus-darker border-cepheus-gray-dark/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <span className="text-cepheus-gray-light self-center mr-1">Sort by:</span>
              <Button
                variant={sortOrder === "name" ? "default" : "outline"}
                size="sm"
                className={`${sortOrder === "name" ? "bg-cepheus-green text-white" : "border-cepheus-gray-dark/50"}`}
                onClick={() => setSortOrder("name")}
              >
                Name
              </Button>
              <Button
                variant={sortOrder === "provider" ? "default" : "outline"}
                size="sm"
                className={`${sortOrder === "provider" ? "bg-cepheus-green text-white" : "border-cepheus-gray-dark/50"}`}
                onClick={() => setSortOrder("provider")}
              >
                Provider
              </Button>
            </div>

            <Button
              variant="outline"
              className="border-cepheus-gray-dark/50"
              onClick={handleRefreshModels}
              disabled={isLoadingModels}
            >
              {isLoadingModels ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Models
                </>
              )}
            </Button>
          </div>
        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedModels.map((model, index) => {
            return (
              <div
                key={index}
                className="rounded-lg border border-cepheus-green/30 bg-cepheus-darker p-4 hover:border-cepheus-green/50 transition-all group h-full flex flex-col"
              >
                {/* Model Header with Badge */}
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Provider and Category */}
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-cepheus-green text-sm font-medium">{model.provider}</p>
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-cepheus-dark rounded-full text-xs text-cepheus-gray shrink-0">
                        {getModelIcon(model.category)}
                        <span className="hidden sm:inline">{model.category}</span>
                      </span>
                    </div>

                    {/* Model Name */}
                    <div className="flex items-start gap-2 flex-wrap">
                      <h3 className="text-base font-semibold text-white break-all" title={model.name}>
                        {model.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="mt-2 text-xs text-cepheus-gray-light flex-1">
                  <ul className="space-y-1 list-disc pl-4">
                    {model.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="line-clamp-1">{feature}</li>
                    ))}
                    {model.features.length > 2 && (
                      <li className="text-cepheus-gray">+{model.features.length - 2} more features</li>
                    )}
                  </ul>
                </div>

                {/* Footer with Details Button */}
                <div className="mt-4 pt-4 border-t border-cepheus-gray-dark/30">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="link" className="p-0 h-auto text-cepheus-gray-light hover:text-cepheus-green text-xs">
                        <Info className="h-4 w-4 mr-1" />
                        View details
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-cepheus-darker border-cepheus-gray-dark/50 p-3 max-w-xs">
                      <div className="font-medium mb-2 text-cepheus-green">{model.name} Features</div>
                      <ul className="text-xs space-y-1">
                        {model.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-cepheus-green mr-1">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-cepheus-gray mb-2">
            Displaying {sortedModels.length} available models
          </p>

          <p className="text-cepheus-gray-light text-sm sm:text-base">
            Need a specific model not listed here? <a href="#" className="text-cepheus-green hover:underline">Contact us</a> for custom integrations.
          </p>

          {fetchedModelNames.length > 0 && (
            <p className="text-cepheus-gray-light text-xs mt-2">
              Model availability is refreshed automatically on daily basis or manually using the refresh button.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Models;
