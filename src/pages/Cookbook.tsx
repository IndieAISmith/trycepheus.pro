
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import CodeBlock from "@/components/shared/CodeBlock";

const Cookbook = () => {
  const guardrailsCode = `# Python implementation for hallucination guardrails
import openai
import re

client = openai.OpenAI(
    base_url="https://cepheus-x.vercel.app/v1/",
    api_key="sk-efghijkl5678mnopabcd1234efghijkl5678mnop"
)

def check_for_hallucination(response, facts):
    # Check response against known facts
    hallucination_detected = False
    explanation = ""
    
    for fact in facts:
        if fact["check_type"] == "should_contain" and fact["key"] not in response:
            hallucination_detected = True
            explanation += f"Response is missing key information: {fact['key']}\\n"
        elif fact["check_type"] == "should_not_contain" and fact["key"] in response:
            hallucination_detected = True
            explanation += f"Response contains incorrect information: {fact['key']}\\n"
    
    return hallucination_detected, explanation

# Example usage
facts_to_check = [
    {"check_type": "should_contain", "key": "Cepheus provides OpenAI-compatible APIs"},
    {"check_type": "should_not_contain", "key": "Cepheus was founded in 1995"}
]

prompt = "What is Cepheus and when was it founded?"

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt}]
)

response_text = response.choices[0].message.content
hallucination, explanation = check_for_hallucination(response_text, facts_to_check)

if hallucination:
    print("Hallucination detected:")
    print(explanation)
    
    # Generate corrected response
    correction_prompt = f"""
    Your previous response may contain inaccuracies. Please revise your answer 
    based on these facts:
    - Cepheus provides OpenAI-compatible APIs
    - Cepheus is currently in beta phase
    - The founding date of Cepheus should not be mentioned as it's not public information
    
    Original query: {prompt}
    """
    
    corrected_response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": correction_prompt}]
    )
    
    print("\\nCorrected response:")
    print(corrected_response.choices[0].message.content)
else:
    print("No hallucinations detected. Response is factual.")
    print(response_text)`;

const rateLimitsCode = `# Python implementation for handling rate limits
import openai
import time
import random
from tenacity import retry, wait_exponential, stop_after_attempt, retry_if_exception_type

client = openai.OpenAI(
    base_url="https://cepheus-x.vercel.app/v1/",
    api_key="sk-efghijkl5678mnopabcd1234efghijkl5678mnop"
)

# Custom retry decorator
@retry(
    wait=wait_exponential(multiplier=1, min=4, max=10),
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type(openai.RateLimitError)
)
def make_api_call_with_retry(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}]
        )
        return response
    except openai.RateLimitError as e:
        print(f"Rate limit exceeded: {e}")
        # Add jitter to avoid thundering herd problem
        time.sleep(random.uniform(0.5, 1.5))
        raise e  # Re-raise to trigger retry
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise

# Batch processing function to stay within rate limits
def process_prompts_in_batches(prompts, batch_size=5, delay_between_batches=3):
    results = []
    
    # Process in batches
    for i in range(0, len(prompts), batch_size):
        batch = prompts[i:i+batch_size]
        batch_results = []
        
        print(f"Processing batch {i//batch_size + 1} of {(len(prompts) + batch_size - 1) // batch_size}")
        
        for prompt in batch:
            try:
                result = make_api_call_with_retry(prompt)
                batch_results.append(result.choices[0].message.content)
            except Exception as e:
                print(f"Failed after multiple retries: {e}")
                batch_results.append(f"Error: {str(e)}")
        
        results.extend(batch_results)
        
        # Wait between batches to respect rate limits
        if i + batch_size < len(prompts):
            print(f"Waiting {delay_between_batches} seconds before next batch...")
            time.sleep(delay_between_batches)
    
    return results

# Example usage
example_prompts = [
    "What is artificial intelligence?",
    "Explain neural networks briefly.",
    "What is machine learning?",
    "Describe deep learning.",
    "What is natural language processing?",
    "Explain computer vision.",
    "What is reinforcement learning?",
    "Describe generative AI.",
    "What are transformers in AI?",
    "Explain the difference between supervised and unsupervised learning."
]

# Process with batch size of 3 to stay within 20 RPM limit
responses = process_prompts_in_batches(example_prompts, batch_size=3, delay_between_batches=3)

# Print results
for i, response in enumerate(responses):
    print(f"\\nPrompt {i+1}: {example_prompts[i]}")
    print(f"Response: {response[:100]}...")  # Show just the first 100 chars`;

  return (
    <MainLayout>
      <div className="bg-cepheus-darker py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Cookbook</h1>
          <p className="text-xl text-cepheus-gray-light max-w-3xl mx-auto text-center mb-8">
            Practical recipes and patterns for common AI implementation scenarios
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Developing Hallucination Guardrails</h2>
            <div className="text-cepheus-gray mb-2">Article 1 of 2</div>
            
            <p className="text-cepheus-gray-light mb-6">
              Large language models can sometimes generate false or misleading information, known as hallucinations. 
              This recipe demonstrates how to implement guardrails to detect and correct hallucinations in AI responses.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">The Hallucination Problem</h3>
            <p className="text-cepheus-gray-light mb-6">
              Even advanced models like GPT-4o can occasionally generate incorrect information, especially when asked about 
              specific facts, numbers, or events. For applications where accuracy is critical, implementing guardrails can 
              significantly reduce the risk of misinformation.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Implementation Strategy</h3>
            <p className="text-cepheus-gray-light mb-6">
              The following implementation demonstrates how to:
            </p>
            <ul className="list-disc pl-6 text-cepheus-gray-light mb-6 space-y-2">
              <li>Check AI-generated responses against known facts</li>
              <li>Detect potential hallucinations based on content rules</li>
              <li>Generate corrected responses when hallucinations are detected</li>
            </ul>
            
            <CodeBlock code={guardrailsCode} language="python" title="Hallucination Detection and Correction" />
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Key Takeaways</h3>
            <ul className="list-disc pl-6 text-cepheus-gray-light mb-6 space-y-2">
              <li>Define clear factual boundaries for your AI assistant</li>
              <li>Implement both "should contain" and "should not contain" checks</li>
              <li>Use a two-pass approach: first generate a response, then verify and correct if needed</li>
              <li>For critical applications, consider human review of AI-generated content</li>
            </ul>
          </article>
          
          <article className="mb-16">
            <h2 className="text-2xl font-bold mb-4">How to Handle Rate Limits</h2>
            <div className="text-cepheus-gray mb-2">Article 2 of 2</div>
            
            <p className="text-cepheus-gray-light mb-6">
              Cepheus has a rate limit of 20 requests per minute (RPM) during its beta phase. For applications that need to process 
              multiple requests, implementing proper rate limit handling is essential to avoid errors and ensure reliable operation.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Rate Limiting Challenges</h3>
            <p className="text-cepheus-gray-light mb-6">
              When working with rate-limited APIs, challenges include:
            </p>
            <ul className="list-disc pl-6 text-cepheus-gray-light mb-6 space-y-2">
              <li>Managing multiple concurrent requests without exceeding limits</li>
              <li>Handling rate limit errors gracefully</li>
              <li>Implementing retry logic with backoff strategies</li>
              <li>Optimizing throughput while staying within limits</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Implementation Strategy</h3>
            <p className="text-cepheus-gray-light mb-6">
              The following code demonstrates a robust approach to handling rate limits:
            </p>
            
            <CodeBlock code={rateLimitsCode} language="python" title="Rate Limit Handling with Retry Logic" />
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Key Techniques</h3>
            <ul className="list-disc pl-6 text-cepheus-gray-light mb-6 space-y-2">
              <li><strong>Exponential Backoff:</strong> Gradually increasing wait time between retries</li>
              <li><strong>Jitter:</strong> Adding random variation to retry timing to prevent request clustering</li>
              <li><strong>Batch Processing:</strong> Grouping requests to optimize throughput while respecting limits</li>
              <li><strong>Error Handling:</strong> Specifically catching and handling rate limit errors</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3 mt-8">Additional Considerations</h3>
            <p className="text-cepheus-gray-light mb-6">
              For production applications:
            </p>
            <ul className="list-disc pl-6 text-cepheus-gray-light mb-6 space-y-2">
              <li>Consider implementing a queue system for handling high volumes of requests</li>
              <li>Monitor your API usage to stay within limits</li>
              <li>Implement circuit breakers to prevent overwhelming the API during outages</li>
              <li>For truly high-volume needs, contact Cepheus about enterprise plans</li>
            </ul>
          </article>
          
          <div className="bg-cepheus-darker rounded-lg border border-cepheus-gray-dark/30 p-6 mt-12">
            <h3 className="text-xl font-semibold mb-3">Explore More Resources</h3>
            <p className="text-cepheus-gray-light mb-4">
              Check out our other documentation to learn more about using Cepheus effectively.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/docs" className="text-cepheus-green hover:text-cepheus-green-light font-medium">
                Documentation
              </Link>
              <Link to="/prompt-engineering" className="text-cepheus-green hover:text-cepheus-green-light font-medium">
                Prompt Engineering
              </Link>
              <Link to="/models" className="text-cepheus-green hover:text-cepheus-green-light font-medium">
                Models
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cookbook;
