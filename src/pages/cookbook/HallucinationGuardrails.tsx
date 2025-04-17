import MainLayout from "@/components/layout/MainLayout";
import CodeBlock from "@/components/shared/CodeBlock";

const HallucinationGuardrails = () => {
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

  return (
    <MainLayout>
      <div className="bg-cepheus-darker py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Developing Hallucination Guardrails</h1>
          <p className="text-xl text-cepheus-gray-light max-w-3xl mx-auto text-center mb-8">
            Learn how to implement guardrails to detect and correct hallucinations in AI responses
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="space-y-8">
            <div className="text-cepheus-gray mb-2">Article 1 of 2</div>
            
            <p className="text-cepheus-gray-light text-lg">
              Large language models can sometimes generate false or misleading information, known as hallucinations. 
              This recipe demonstrates how to implement guardrails to detect and correct hallucinations in AI responses.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8">The Hallucination Problem</h2>
            <p className="text-cepheus-gray-light text-lg">
              Even advanced models like GPT-4o can occasionally generate incorrect information, especially when asked about 
              specific facts, numbers, or events. For applications where accuracy is critical, implementing guardrails can 
              significantly reduce the risk of misinformation.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-8">Implementation Strategy</h2>
            <p className="text-cepheus-gray-light text-lg">
              The following implementation demonstrates how to:
            </p>
            <ul className="list-disc pl-6 text-cepheus-gray-light text-lg space-y-2">
              <li>Check AI-generated responses against known facts</li>
              <li>Detect potential hallucinations based on content rules</li>
              <li>Generate corrected responses when hallucinations are detected</li>
            </ul>
            
            <CodeBlock code={guardrailsCode} language="python" title="Hallucination Detection and Correction" />
            
            <h2 className="text-2xl font-bold text-white mt-8">Key Takeaways</h2>
            <ul className="list-disc pl-6 text-cepheus-gray-light text-lg space-y-2">
              <li>Define clear factual boundaries for your AI assistant</li>
              <li>Implement both "should contain" and "should not contain" checks</li>
              <li>Use a two-pass approach: first generate a response, then verify and correct if needed</li>
              <li>For critical applications, consider human review of AI-generated content</li>
            </ul>
          </article>
        </div>
      </div>
    </MainLayout>
  );
};

export default HallucinationGuardrails; 