import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import "./playground.css";
import {
  Send,
  Loader2,
  Code,
  Info,
  Copy,
  Check,
  Home
} from "lucide-react";
import OpenAI from "openai";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  // Add query parameter to signal no preflight needed
  const urlObj = new URL(url.toString());
  urlObj.searchParams.append('skipOptions', 'true');

  return fetch(urlObj.toString(), modifiedInit);
};

// Function to process markdown tables
const processTable = (tableLines: string[]): string => {
  // Check if we have at least a header row and separator row
  if (tableLines.length < 2) return tableLines.join('\n');

  // Process the header row
  const headerRow = tableLines[0];
  const headerCells = headerRow.split('|')
    .map(cell => cell.trim())
    .filter(cell => cell !== '');

  // Check if the second row is a separator row (contains only -, |, and :)
  const separatorRow = tableLines[1];
  const isSeparator = /^[\s|:\-]+$/.test(separatorRow);

  if (!isSeparator) return tableLines.join('\n');

  // Process the data rows
  const dataRows = tableLines.slice(2);

  // Build the HTML table
  let tableHtml = '<div class="table-container my-4 overflow-x-auto">\n';
  tableHtml += '<table class="w-full border-collapse">\n';

  // Add the header row
  tableHtml += '<thead>\n<tr>\n';
  headerCells.forEach(cell => {
    tableHtml += `<th class="border border-cepheus-gray-dark/30 px-4 py-2 bg-cepheus-darker text-white">${cell}</th>\n`;
  });
  tableHtml += '</tr>\n</thead>\n';

  // Add the data rows
  tableHtml += '<tbody>\n';
  dataRows.forEach(row => {
    const cells = row.split('|')
      .map(cell => cell.trim())
      .filter(cell => cell !== '');

    tableHtml += '<tr>\n';
    cells.forEach(cell => {
      tableHtml += `<td class="border border-cepheus-gray-dark/30 px-4 py-2">${cell}</td>\n`;
    });
    tableHtml += '</tr>\n';
  });
  tableHtml += '</tbody>\n';

  tableHtml += '</table>\n</div>';

  return tableHtml;
};

// Function to process markdown content and properly format code blocks
const processMarkdown = (content: string): string => {
  if (!content) return '';

  // Step 1: Protect code blocks from other transformations
  const codeBlocks: string[] = [];
  let processedContent = content.replace(/```(\w*)\n([\s\S]*?)```/g, (_, language, code) => {
    const id = `CODE_BLOCK_${codeBlocks.length}`;

    // If language is specified, use it for syntax highlighting
    if (language) {
      try {
        const highlightedCode = hljs.highlight(code.trim(), { language }).value;
        codeBlocks.push(`<div class="relative group mb-4">
                  <div class="absolute -top-3 left-4 px-2 py-0.5 bg-cepheus-dark text-xs text-cepheus-green rounded-sm border border-cepheus-gray-dark/30">${language}</div>
                  <pre class="rounded-md p-4 pt-5 bg-cepheus-darker border border-cepheus-gray-dark/30 overflow-auto">
                    <code class="language-${language}">${highlightedCode}</code>
                  </pre>
                </div>`);
      } catch (e) {
        // If language isn't supported, fallback to no highlighting
        codeBlocks.push(`<div class="relative group mb-4">
                  <div class="absolute -top-3 left-4 px-2 py-0.5 bg-cepheus-dark text-xs text-cepheus-green rounded-sm border border-cepheus-gray-dark/30">${language}</div>
                  <pre class="rounded-md p-4 pt-5 bg-cepheus-darker border border-cepheus-gray-dark/30 overflow-auto">
                    <code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
                  </pre>
                </div>`);
      }
    } else {
      // No language specified
      codeBlocks.push(`<div class="relative group mb-4">
                <div class="absolute -top-3 left-4 px-2 py-0.5 bg-cepheus-dark text-xs text-cepheus-green rounded-sm border border-cepheus-gray-dark/30">code</div>
                <pre class="rounded-md p-4 pt-5 bg-cepheus-darker border border-cepheus-gray-dark/30 overflow-auto">
                  <code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
                </pre>
              </div>`);
    }

    return id;
  });

  // Step 2: Process headings (h1-h6)
  processedContent = processedContent.replace(/^(#{1,6})\s+(.+)$/gm, (_, hashes, text) => {
    const level = hashes.length;
    const fontSize = 24 - (level * 2); // h1: 22px, h2: 20px, etc.
    const marginBottom = 20 - (level * 2); // h1: 18px, h2: 16px, etc.
    return `<h${level} class="text-[${fontSize}px] font-bold text-white mb-[${marginBottom}px] mt-6 first:mt-0 border-b border-cepheus-gray-dark/30 pb-2">${text}</h${level}>`;
  });

  // Step 3: Process bold text
  processedContent = processedContent.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');

  // Step 4: Process italic text
  processedContent = processedContent.replace(/\*(.+?)\*/g, '<em class="italic text-cepheus-gray-light">$1</em>');

  // Step 5: Process links
  processedContent = processedContent.replace(/\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cepheus-green hover:underline">$1</a>');

  // Step 6: Process unordered lists
  processedContent = processedContent.replace(/^[\s]*[-*+][\s]+(.+)$/gm, (_, item) => {
    return `<li class="ml-6 mb-1 list-disc text-cepheus-gray-light"><span class="text-white">${item}</span></li>`;
  });

  // Step 7: Process ordered lists
  processedContent = processedContent.replace(/^[\s]*(\d+)\.[\s]+(.+)$/gm, (_, _number, item) => {
    return `<li class="ml-6 mb-1 list-decimal text-cepheus-gray-light"><span class="text-white">${item}</span></li>`;
  });

  // Step 8: Group list items
  processedContent = processedContent.replace(/<\/li>\s*<li/g, '</li><li');
  processedContent = processedContent.replace(/(<li[^>]*>.*?<\/li>)+/g, (match) => {
    return `<ul class="my-4">${match}</ul>`;
  });

  // Step 9: Process blockquotes
  processedContent = processedContent.replace(/^>[\s]*(.+)$/gm, (_, text) => {
    return `<blockquote class="border-l-4 border-cepheus-green pl-4 py-1 my-4 text-cepheus-gray-light italic">${text}</blockquote>`;
  });

  // Step 10: Process horizontal rules
  processedContent = processedContent.replace(/^---+$/gm,
    '<hr class="my-6 border-t border-cepheus-gray-dark/30" />');

  // Step 11: Process tables
  // This is a simple table parser that handles basic markdown tables
  // First, find table blocks (lines with | character)
  let tableBlocks: string[] = [];
  let inTable = false;
  let tableLines: string[] = [];

  // Split content into lines for table processing
  const contentLines = processedContent.split('\n');
  let processedLines: string[] = [];

  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i];

    if (line.includes('|') && line.trim().startsWith('|')) {
      // Potential table line
      if (!inTable) {
        inTable = true;
      }
      tableLines.push(line);
    } else if (inTable) {
      // Table ended
      inTable = false;
      if (tableLines.length > 1) {
        // Process the table and add a placeholder
        const tableId = `TABLE_BLOCK_${tableBlocks.length}`;
        tableBlocks.push(processTable(tableLines));
        processedLines.push(tableId);
        tableLines = [];
      } else {
        // Not a real table, just add the lines back
        processedLines = [...processedLines, ...tableLines];
        tableLines = [];
      }
      // Add the current non-table line
      processedLines.push(line);
    } else {
      // Regular line
      processedLines.push(line);
    }
  }

  // Handle case where table is at the end of content
  if (inTable && tableLines.length > 1) {
    const tableId = `TABLE_BLOCK_${tableBlocks.length}`;
    tableBlocks.push(processTable(tableLines));
    processedLines.push(tableId);
  } else if (tableLines.length > 0) {
    // Not a real table at the end, add lines back
    processedLines = [...processedLines, ...tableLines];
  }

  // Join the processed lines back into content
  processedContent = processedLines.join('\n');

  // Step 12: Process inline code
  processedContent = processedContent.replace(/`([^`]+)`/g,
    '<code class="bg-cepheus-darker px-1.5 py-0.5 rounded text-sm text-cepheus-green font-mono border border-cepheus-gray-dark/30">$1</code>');

  // Step 12: Process paragraphs (but not inside other elements)
  processedContent = processedContent.replace(/^(?!<h|<ul|<li|<blockquote|<hr|CODE_BLOCK_)(.+)$/gm, (match) => {
    if (match.trim() === '') return '';
    return `<p class="mb-4 last:mb-0 leading-relaxed">${match}</p>`;
  });

  // Step 13: Restore code blocks
  codeBlocks.forEach((block, i) => {
    processedContent = processedContent.replace(`CODE_BLOCK_${i}`, block);
  });

  // Step 14: Restore table blocks
  tableBlocks.forEach((block, i) => {
    processedContent = processedContent.replace(`TABLE_BLOCK_${i}`, block);
  });

  // Step 15: Process line breaks
  // First, replace double newlines with a special marker
  processedContent = processedContent.replace(/\n\n/g, '__DOUBLE_NEWLINE__');
  // Then replace single newlines with a <br/> tag
  processedContent = processedContent.replace(/\n/g, '<br/>');
  // Finally, replace the double newline markers with paragraph breaks
  processedContent = processedContent.replace(/__DOUBLE_NEWLINE__/g, '</p><p class="mb-4 last:mb-0 leading-relaxed">');

  // Step 16: Add a container for better styling
  return `<div class="markdown-content text-white">${processedContent}</div>`;
};

// Code example dialog component
const CodeExampleDialog = ({ model }: { model: string }) => {
  const [copied, setCopied] = useState(false);

  const pythonCode = `# Python code example
import openai

# Initialize client
client = openai.OpenAI(
    base_url="https://cepheus-x.vercel.app/v1/",
    api_key="sk-efghijkl5678mnopabcd1234efghijkl5678mnop"
)

# Create completion
response = client.chat.completions.create(
    model="${model || 'gpt-4o'}",
    messages=[
        {
            "role": "user",
            "content": "Hello from Cepheus!"
        }
    ]
)

# Print response
print(response.choices[0].message.content)`;

  const javascriptCode = `// JavaScript code example
import OpenAI from 'openai';

// Initialize client
const openai = new OpenAI({
  baseURL: 'https://cepheus-x.vercel.app/v1/',
  apiKey: 'sk-efghijkl5678mnopabcd1234efghijkl5678mnop',
  dangerouslyAllowBrowser: true,
});

// Main function
async function main() {
  // Create completion
  const response = await openai.chat.completions.create({
    model: '${model || 'gpt-4o'}',
    messages: [
      {
        role: 'user',
        content: 'Hello from Cepheus!',
      },
    ],
  });

  // Log response
  console.log(
    response.choices[0].message.content
  );
}

// Run the function
main();`;

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm">
          <Code className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="whitespace-nowrap">View Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[90vw] sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-cepheus-darker border-cepheus-gray-dark/30 p-3 sm:p-6 z-[100] overflow-x-hidden">
        <DialogHeader className="mb-2 sm:mb-3">
          <DialogTitle className="text-white flex items-center gap-2 text-sm sm:text-base">
            <Code className="h-4 w-4 sm:h-5 sm:w-5 text-cepheus-green" />
            Code Examples for {model || "Selected Model"}
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="python" className="mt-1 sm:mt-2 w-full">
          <TabsList className="bg-cepheus-dark w-full">
            <TabsTrigger value="python" className="text-xs sm:text-sm">Python</TabsTrigger>
            <TabsTrigger value="javascript" className="text-xs sm:text-sm">JavaScript</TabsTrigger>
          </TabsList>
          <TabsContent value="python" className="relative">
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 text-cepheus-gray-light hover:text-cepheus-green"
                onClick={() => copyToClipboard(pythonCode)}
              >
                {copied ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
              </Button>
            </div>
            <pre className="rounded-md p-2 sm:p-4 bg-cepheus-dark overflow-auto text-xs sm:text-sm max-h-[50vh] whitespace-pre-wrap break-all">
              <code className="language-python w-full overflow-x-hidden">{pythonCode}</code>
            </pre>
          </TabsContent>
          <TabsContent value="javascript" className="relative">
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 text-cepheus-gray-light hover:text-cepheus-green"
                onClick={() => copyToClipboard(javascriptCode)}
              >
                {copied ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
              </Button>
            </div>
            <pre className="rounded-md p-2 sm:p-4 bg-cepheus-dark overflow-auto text-xs sm:text-sm max-h-[50vh] whitespace-pre-wrap break-all">
              <code className="language-javascript w-full overflow-x-hidden">{javascriptCode}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const Playground = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState<string[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State management is complete

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

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fetch available models when component mounts
  useEffect(() => {
    const fetchModels = async () => {
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
          setModels(modelIds);

          // Always set the first model as the default selection
          if (modelIds.length > 0) {
            setSelectedModel(modelIds[0]);
          }
        } else {
          // Fallback to default models list if API returns empty list
          setModels(fallbackModels);

          // Set the first model from fallback list as the default selection
          if (fallbackModels.length > 0) {
            setSelectedModel(fallbackModels[0]);
          }
        }
      } catch (error) {


        // Fallback to default models list if API call fails
        setModels(fallbackModels);

        // Set the first model from fallback list as the default selection
        if (fallbackModels.length > 0) {
          setSelectedModel(fallbackModels[0]);
        }
      } finally {
        setIsLoadingModels(false);
      }
    };

    fetchModels();
  }, []);

  // Function to simulate API call for development/fallback purposes
  const simulateApiCall = async (model: string, messages: Array<{role: string, content: string}>) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create a code example for demonstration
    const codeExample = `
# Python example using OpenAI library
import openai

# Initialize the client
openai.api_key = "your-api-key"

# Create a chat completion
response = openai.ChatCompletion.create(
    model="${model}",
    messages=[{"role": "user", "content": "${messages[messages.length - 1].content}"}],
    max_tokens=max_tokens,
    temperature=temperature,
)

# Get the response
print(response.choices[0].message["content"])

# If you're running this as a script
if __name__ == "__main__":
    prompt = "Your prompt here"
    output = generate_text(prompt)
`;

    // Return a simulated response with proper code formatting
    return {
      id: "cmpl-" + Math.random().toString(36).substring(2, 10),
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: model,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: `[SIMULATION MODE] This is a simulated response as we couldn't connect to the Cepheus API. In a production environment with proper connectivity, you would receive an actual response from the ${model} model.\n\nYour message was: "${messages[messages.length - 1].content}"\n\nHere's an example of how you might use the OpenAI library with this model:\n\n\`\`\`python${codeExample}\`\`\``
          },
          finish_reason: "stop"
        }
      ],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 20,
        total_tokens: 30
      }
    };
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat
    const newUserMessage = { role: "user", content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput("");
    setIsLoading(true);

    try {


      // Try to make API call using OpenAI library
      try {
        // Configure request to avoid OPTIONS preflight
        const response = await openai.chat.completions.create(
          {
            model: selectedModel,
            messages: [...messages, newUserMessage].map(msg => ({
              role: msg.role as "user" | "assistant" | "system",
              content: msg.content
            }))
          },
          // Add options to help prevent OPTIONS requests
          {
            headers: {
              'X-Skip-Preflight': 'true'
            }
          }
        );



        // Format the response content for proper markdown rendering
        let content = response.choices[0].message.content || "No response content";

        // Remove surrounding quotes if present
        if (content.startsWith('"') && content.endsWith('"')) {
          content = content.substring(1, content.length - 1);
        }

        // Process escape sequences properly
        content = content
          .replace(/\\"/g, '"')       // Unescape quotes
          .replace(/\\n/g, '\n')      // Convert \n to actual newlines
          .replace(/\\t/g, '\t')      // Convert \t to actual tabs
          .replace(/\\r/g, '')        // Remove \r characters
          .replace(/\\\\/g, '\\');    // Convert \\ to \

        // Ensure code blocks are properly formatted with markdown syntax
        if (content.includes('```')) {
          // Content already has markdown code blocks
          // No need to modify
        } else if (content.includes('function') || content.includes('class') || content.includes('import ') || content.includes('const ')) {
          // Content likely contains code but not properly formatted, try to detect language
          let language = '';
          if (content.includes('function') || content.includes('const ') || content.includes('let ') || content.includes('var ')) {
            language = 'javascript';
          } else if (content.includes('import ') && content.includes('from')) {
            language = 'typescript';
          } else if (content.includes('def ') || content.includes('class ') && content.includes(':')) {
            language = 'python';
          }

          // Wrap in code block if language detected
          if (language) {
            content = '```' + language + '\n' + content + '\n```';
          }
        }

        const aiResponse = {
          role: "assistant",
          content: content
        };

        setMessages(prev => [...prev, aiResponse]);
      } catch (apiError) {
        // If we can't connect to the API, fall back to simulation mode
        const simulatedResponse = await simulateApiCall(selectedModel, [...messages, newUserMessage]);

        // Format code blocks with markdown syntax for proper rendering
        let content = simulatedResponse.choices[0].message.content;

        // Remove surrounding quotes if present
        if (content.startsWith('"') && content.endsWith('"')) {
          content = content.substring(1, content.length - 1);
        }

        // Process escape sequences properly
        content = content
          .replace(/\\"/g, '"')       // Unescape quotes
          .replace(/\\n/g, '\n')      // Convert \n to actual newlines
          .replace(/\\t/g, '\t')      // Convert \t to actual tabs
          .replace(/\\r/g, '')        // Remove \r characters
          .replace(/\\\\/g, '\\');    // Convert \\ to \

        // Ensure code blocks are properly formatted with markdown syntax
        if (content.includes('```')) {
          // Content already has markdown code blocks
          // No need to modify
        } else if (content.includes('function') || content.includes('class') || content.includes('import ') || content.includes('const ')) {
          // Content likely contains code but not properly formatted, try to detect language
          let language = '';
          if (content.includes('function') || content.includes('const ') || content.includes('let ') || content.includes('var ')) {
            language = 'javascript';
          } else if (content.includes('import ') && content.includes('from')) {
            language = 'typescript';
          } else if (content.includes('def ') || content.includes('class ') && content.includes(':')) {
            language = 'python';
          }

          // Wrap in code block if language detected
          if (language) {
            content = '```' + language + '\n' + content + '\n```';
          }
        }

        const aiResponse = {
          role: "assistant",
          content: content
        };

        setMessages(prev => [...prev, aiResponse]);

        // Also add a system message explaining the fallback
        setMessages(prev => [...prev, {
          role: "system",
          content: "Note: Unable to connect to the Cepheus API. Using simulation mode instead. In a production environment with proper connectivity, you would receive actual responses from the AI model."
        }]);
      }
    } catch (error) {


      // Extract error message from OpenAI error object
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;

        // Try to extract more specific error information if available
        if ('error' in (error as any) && (error as any).error) {
          const openaiError = (error as any).error;
          errorMessage = openaiError.message || errorMessage;
        }
      }

      setMessages(prev => [...prev, {
        role: "system",
        content: `Error: ${errorMessage}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-cepheus-dark overflow-hidden">

      {/* Main Content */}
      <div className="w-full flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="bg-cepheus-darker border-b border-cepheus-gray-dark/30 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2 text-cepheus-gray-light hover:text-cepheus-green hover:bg-cepheus-darker"
                      asChild
                    >
                      <Link to="/">
                        <Home className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Back to Home</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <img  src="/playground-logo.svg"  alt="Cepheus Logo" className="h-10"/>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto sm:mr-2">
                <span className="text-sm text-cepheus-gray-light whitespace-nowrap">Model:</span>
                <Select
                  value={selectedModel}
                  onValueChange={setSelectedModel}
                  disabled={isLoadingModels}
                >
                  <SelectTrigger className="w-full sm:w-[280px] md:w-[320px] bg-cepheus-dark border-cepheus-gray-dark/50 focus:ring-cepheus-green focus:border-cepheus-green/70 h-9">
                    {isLoadingModels ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-cepheus-green" />
                        <span>Loading models...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select a model" />
                    )}
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    {models.length > 0 ? (
                      models.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-center text-cepheus-gray-light">
                        No models available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <CodeExampleDialog model={selectedModel} />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-cepheus-gray-light hover:text-cepheus-green"
                      >
                        <Info className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Interface */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages area */}
            <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto bg-gradient-to-b from-cepheus-darker to-cepheus-dark/90">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-cepheus-gray-light px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-cepheus-gray-dark mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p className="text-center max-w-md text-base sm:text-lg mb-2">
                    Start a conversation
                  </p>
                  <p className="text-center text-xs sm:text-sm opacity-70">
                    Send a message to begin interacting with the AI model
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role !== 'user' && (
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-cepheus-green/20 flex items-center justify-center mr-2 mt-1">
                          {message.role === 'system' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-cepheus-green" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                            </svg>
                          )}
                        </div>
                      )}
                      <div
                        className={`max-w-[95%] sm:max-w-[85%] md:max-w-[80%] rounded-lg p-3 sm:p-4 shadow-md ${
                          message.role === 'user'
                            ? 'bg-cepheus-green text-black'
                            : message.role === 'system'
                              ? 'bg-red-900/90 text-white'
                              : 'bg-cepheus-dark text-white'
                        }`}
                      >
                        {message.role === 'assistant' ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: processMarkdown(message.content)
                            }}
                            className="markdown-content prose prose-invert prose-sm sm:prose max-w-none"
                          />
                        ) : (
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        )}
                      </div>
                      {message.role === 'user' && (
                        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-cepheus-green flex items-center justify-center ml-2 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-cepheus-green/20 flex items-center justify-center mr-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-cepheus-green" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                        </svg>
                      </div>
                      <div className="max-w-[95%] sm:max-w-[85%] md:max-w-[80%] rounded-lg p-3 sm:p-4 bg-cepheus-dark text-white shadow-md">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-cepheus-green" />
                          <p className="text-sm sm:text-base">Generating response...</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="p-3 sm:p-4 border-t border-cepheus-gray-dark/30 bg-cepheus-dark">
              <div className="flex flex-col sm:flex-row gap-3">
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here..."
                  className="min-h-[60px] sm:min-h-[80px] resize-none bg-cepheus-darker border-cepheus-gray-dark/50 focus:border-cepheus-green/70 focus:ring-cepheus-green/50"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !userInput.trim()}
                  className="bg-cepheus-green hover:bg-cepheus-green-dark text-black sm:self-end h-10 px-4 transition-all duration-200 shadow-md disabled:opacity-50"
                >
                  <Send className="h-4 w-4 mr-2" />
                  <span>Send</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
