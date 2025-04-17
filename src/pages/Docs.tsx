
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/shared/CodeBlock";

const Docs = () => {
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

  const systemMessageExample = `# System message example
response = client.chat.completions.create(
    model="deepseek-ai/deepseek-r1",
    messages=[
        {"role": "system", "content": "You are a helpful AI assistant that specializes in explaining complex topics simply."},
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ]
)`;

  const formattedCodeExample = `# Code formatting with Markdown
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Write a Python function to calculate the factorial of a number and format it as code."}
    ]
)

# The API will return markdown-formatted code:
# \`\`\`python
# def factorial(n):
#     if n == 0:
#         return 1
#     else:
#         return n * factorial(n-1)
# \`\`\``;

  const fewShotExample = `# Few-shot learning example
response = client.chat.completions.create(
    model="deepseek-ai/deepseek-r1",
    messages=[
        {"role": "system", "content": "You are a customer service bot that responds in a friendly, helpful tone."},
        {"role": "user", "content": "My order arrived damaged."},
        {"role": "assistant", "content": "I'm sorry to hear that your order arrived damaged. That's definitely not the experience we want you to have. I'd be happy to help arrange a replacement or refund. Could you please provide your order number?"},
        {"role": "user", "content": "I never received my order."}
    ]
)`;

  const contextExample = `# Including context example
article = """Cepheus is a constellation in the northern sky, named after the mythological King Cepheus of Aethiopia. It was one of the 48 constellations listed by the 2nd century astronomer Ptolemy, and remains one of the 88 modern constellations recognized by the International Astronomical Union."""

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": f"Using the following information, answer: What is Cepheus? {article}"}
    ]
)`;

  return (
    <MainLayout>
      <div className="bg-cepheus-darker py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Documentation</h1>
          <p className="text-xl text-cepheus-gray-light max-w-3xl mx-auto text-center mb-8">
            Learn how to integrate and use Cepheus' OpenAI-compatible API
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <p className="text-cepheus-gray-light mb-6">
            Cepheus provides a drop-in replacement for OpenAI's API. If you're already using OpenAI's SDK, you can switch to Cepheus by simply changing the base URL and API key.
          </p>

          <Tabs defaultValue="python" className="mb-10">
            <TabsList className="mb-4 bg-cepheus-dark border border-cepheus-gray-dark/30">
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
          </Tabs>

          <h2 className="text-2xl font-bold mb-4">Text Input and Output</h2>
          <p className="text-cepheus-gray-light mb-6">
            Cepheus supports text input and output in the same format as OpenAI's Chat Completions API. You can send messages to the API and receive responses in a conversational format.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-10">Choosing a Model</h2>
          <p className="text-cepheus-gray-light mb-6">
            Cepheus supports 80+ models from various providers including OpenAI, Anthropic, Meta, Google, and more. You can specify which model to use in your API request.
          </p>
          <p className="text-cepheus-gray-light mb-6">
            For reasoning-heavy tasks, we recommend using <code className="bg-cepheus-darker px-1 py-0.5 rounded text-cepheus-green">deepseek-ai/deepseek-r1</code>, which is optimized for complex reasoning and problem-solving.
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-10">Prompt Engineering</h2>
          <p className="text-cepheus-gray-light mb-6">
            Crafting effective prompts is crucial for getting the best results from any AI model. Here are some best practices:
          </p>
          <ul className="list-disc pl-6 text-cepheus-gray-light mb-6 space-y-2">
            <li>Be specific and clear in your instructions</li>
            <li>Provide context when necessary</li>
            <li>Break complex tasks into smaller steps</li>
            <li>Use examples to demonstrate the desired output format</li>
            <li>Specify the tone, style, or perspective you want the model to adopt</li>
          </ul>
          
          <h2 className="text-2xl font-bold mb-4 mt-10">Message Roles and Instruction Following</h2>
          <p className="text-cepheus-gray-light mb-6">
            Cepheus supports the same message roles as OpenAI's API: <code className="bg-cepheus-darker px-1 py-0.5 rounded text-cepheus-green">system</code>, <code className="bg-cepheus-darker px-1 py-0.5 rounded text-cepheus-green">user</code>, and <code className="bg-cepheus-darker px-1 py-0.5 rounded text-cepheus-green">assistant</code>.
          </p>
          <CodeBlock code={systemMessageExample} language="python" title="System Message Example" />
          
          <h2 className="text-2xl font-bold mb-4 mt-10">Message Formatting</h2>
          <p className="text-cepheus-gray-light mb-6">
            Most models support formatting in Markdown, which allows for rich text formatting, code blocks with syntax highlighting, tables, and more.
          </p>
          <CodeBlock code={formattedCodeExample} language="python" title="Code Formatting Example" />
          
          <h2 className="text-2xl font-bold mb-4 mt-10">Few-shot Learning</h2>
          <p className="text-cepheus-gray-light mb-6">
            Few-shot learning allows you to guide model behavior by providing examples in the conversation. This is especially useful for teaching the model to respond in a specific style or format.
          </p>
          <CodeBlock code={fewShotExample} language="python" title="Few-shot Learning Example" />
          
          <h2 className="text-2xl font-bold mb-4 mt-10">Include Relevant Context</h2>
          <p className="text-cepheus-gray-light mb-6">
            For tasks that require specific information, include the relevant context in your prompt to ensure accurate responses.
          </p>
          <CodeBlock code={contextExample} language="python" title="Including Context Example" />
        </div>
      </div>
    </MainLayout>
  );
};

export default Docs;
