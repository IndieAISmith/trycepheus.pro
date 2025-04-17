import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/shared/CodeBlock";

const CodeExampleSection = () => {
  const [activeTab, setActiveTab] = useState("python");
  
  const pythonCode = `# Python code example
import openai

client = openai.OpenAI(
    base_url="https://cepheus-x.vercel.app/v1/",
    api_key="sk-efghijkl5678mnopabcd1234efghijkl5678mnop"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": "Hello from Cepheus!"
    }]
)

print(response.choices[0].message.content)`;

  const javascriptCode = `// JavaScript code example
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://cepheus-x.vercel.app/v1/',
  apiKey: 'sk-efghijkl5678mnopabcd1234efghijkl5678mnop',
});

async function main() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: 'Hello from Cepheus!',
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

main();`;

  const curlCode = `# CURL example
curl https://cepheus-x.vercel.app/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-efghijkl5678mnopabcd1234efghijkl5678mnop" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "Hello from Cepheus!"
      }
    ]
  }'`;

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 pattern-grid"></div>
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-cepheus-accent/5 rounded-full filter blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Batch Processing Optimized For High-Volume Workloads
          </h2>
          <p className="text-lg sm:text-xl text-cepheus-gray-light max-w-3xl mx-auto">
            Integrate Cepheus API into your application with just a few lines of code
          </p>
        </div>
        
        <div className="bg-cepheus-darker rounded-xl border border-cepheus-gray-dark/30 p-4 sm:p-6 md:p-8 shadow-xl overflow-hidden">
          <Tabs defaultValue="python" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 bg-cepheus-dark border border-cepheus-gray-dark/30 overflow-x-auto flex whitespace-nowrap">
              <TabsTrigger value="python" className="data-[state=active]:bg-cepheus-green data-[state=active]:text-black">
                Python
              </TabsTrigger>
              <TabsTrigger value="javascript" className="data-[state=active]:bg-cepheus-green data-[state=active]:text-black">
                JavaScript
              </TabsTrigger>
              <TabsTrigger value="curl" className="data-[state=active]:bg-cepheus-green data-[state=active]:text-black">
                cURL
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="python">
              <CodeBlock code={pythonCode} language="python" title="Python SDK Example" />
            </TabsContent>
            
            <TabsContent value="javascript">
              <CodeBlock code={javascriptCode} language="javascript" title="JavaScript SDK Example" />
            </TabsContent>
            
            <TabsContent value="curl">
              <CodeBlock code={curlCode} language="bash" title="cURL Example" />
            </TabsContent>
            
            <div className="mt-6 text-cepheus-gray text-xs sm:text-sm">
              <p>
                <span className="text-cepheus-green font-medium">Note:</span> Replace the API key with your own from the Cepheus dashboard. The base URL and API key format must be maintained exactly as shown.
              </p>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CodeExampleSection;
