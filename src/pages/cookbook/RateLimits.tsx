import MainLayout from "@/components/layout/MainLayout";
import CodeBlock from "@/components/shared/CodeBlock";

const RateLimits = () => {
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
          <h1 className="text-4xl font-bold mb-4 text-center">How to Handle Rate Limits</h1>
          <p className="text-xl text-cepheus-gray-light max-w-3xl mx-auto text-center mb-8">
            Learn how to implement robust rate limit handling for your AI applications
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="space-y-8">
            <div className="text-cepheus-gray mb-2">Article 2 of 2</div>
            
            <p className="text-cepheus-gray-light text-lg">
              Cepheus has a rate limit of 20 requests per minute (RPM) during its beta phase. For applications that need to process 
              multiple requests, implementing proper rate limit handling is essential to avoid errors and ensure reliable operation.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8">Rate Limiting Challenges</h2>
            <p className="text-cepheus-gray-light text-lg">
              When working with rate-limited APIs, challenges include:
            </p>
            <ul className="list-disc pl-6 text-cepheus-gray-light text-lg space-y-2">
              <li>Managing multiple concurrent requests without exceeding limits</li>
              <li>Handling rate limit errors gracefully</li>
              <li>Implementing retry logic with backoff strategies</li>
              <li>Optimizing throughput while staying within limits</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8">Implementation Strategy</h2>
            <p className="text-cepheus-gray-light text-lg">
              The following code demonstrates a robust approach to handling rate limits:
            </p>
            
            <CodeBlock code={rateLimitsCode} language="python" title="Rate Limit Handling with Retry Logic" />
            
            <h2 className="text-2xl font-bold text-white mt-8">Key Techniques</h2>
            <ul className="list-disc pl-6 text-cepheus-gray-light text-lg space-y-2">
              <li><strong>Exponential Backoff:</strong> Gradually increasing wait time between retries</li>
              <li><strong>Jitter:</strong> Adding random variation to retry timing to prevent request clustering</li>
              <li><strong>Batch Processing:</strong> Grouping requests to optimize throughput while respecting limits</li>
              <li><strong>Error Handling:</strong> Specifically catching and handling rate limit errors</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8">Additional Considerations</h2>
            <p className="text-cepheus-gray-light text-lg">
              For production applications:
            </p>
            <ul className="list-disc pl-6 text-cepheus-gray-light text-lg space-y-2">
              <li>Consider implementing a queue system for handling high volumes of requests</li>
              <li>Monitor your API usage to stay within limits</li>
              <li>Implement circuit breakers to prevent overwhelming the API during outages</li>
              <li>For truly high-volume needs, contact Cepheus about enterprise plans</li>
            </ul>
          </article>
        </div>
      </div>
    </MainLayout>
  );
};

export default RateLimits; 