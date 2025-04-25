<div align="center">
  <img src="/public/cepheus-logo.svg" alt="Cepheus Logo" width="300"/>
  <h1>Cepheus - OpenAI-Compatible API Gateway</h1>
  <p>
    <strong>Your Universal Gateway to 80+ Advanced AI Models</strong>
  </p>
  <p>
    <a href="https://cepheus-x.vercel.app/docs">Documentation</a> •
    <a href="https://cepheus-x.vercel.app/models">Models</a> •
    <a href="https://cepheus-x.vercel.app/cookbook">Cookbook</a> •
    <a href="https://cepheus-x.vercel.app/playground">Playground</a>
  </p>
</div>

## 🚀 Overview

Cepheus revolutionizes AI integration by providing a unified, OpenAI-compatible API gateway to access 80+ cutting-edge AI models. Whether you're building the next breakthrough application or enhancing existing systems, Cepheus simplifies AI integration while giving you unprecedented model choice and flexibility.

### ✨ Key Features

- **OpenAI-Compatible API**: Seamless migration - just change the base URL and API key
- **80+ AI Models**: Unified access to models from industry leaders
- **Real-time Model Updates**: Automatic access to the latest model versions
- **Developer-First Design**: Built by developers, for developers
- **Free Beta Access**: 20 requests per minute, no credit card required

## 🎯 Available Models

### Featured Models

- **GPT Series**
  - `gpt-4o-2024-11-20`: Advanced reasoning, multimodal support
  - `gpt-4o-mini-2024-07-18`: Lightweight, cost-effective variant
  - `gpt-search-realtime`: Real-time information retrieval

- **Claude Series**
  - `anthropic/claude-3-7-sonnet-latest`: Enhanced reasoning capabilities
  - `anthropic/claude-3-7-sonnet-20250219`: Consistent, reproducible results

- **Llama Series**
  - `meta/llama-3.3-70b-versatile`: 70B parameter model for versatile tasks
  - `meta/llama3-70b-8192`: Extended 8192 token context window
  - `meta/llama-3.3-70b-specdec`: Speculative decoding for improved speed

- **Specialized Models**
  - `qwen/qwen-2.5-coder-32b`: Specialized for code generation
  - `deepseek/deepseek-r1`: Advanced reasoning and problem-solving
  - `o1-mini-2024-09-12`: Optimized for developer workflows

## 🔧 Integration Examples

### Python
```python
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

print(response.choices[0].message.content)
```

### JavaScript/TypeScript
```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://cepheus-x.vercel.app/v1/',
  apiKey: 'sk-efghijkl5678mnopabcd1234efghijkl5678mnop',
  dangerouslyAllowBrowser: true,
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
```

### cURL
```bash
curl https://cepheus-x.vercel.app/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-efghijkl5678mnopabcd1234efghijkl5678mnop" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "Hello from Cepheus!"
      }
    ]
  }'
```

## 🛡️ Enterprise Features

### Hallucination Prevention
```python
def check_for_hallucination(response, facts):
    hallucination_detected = False
    explanation = ""
    
    for fact in facts:
        if fact["check_type"] == "should_contain" and fact["key"] not in response:
            hallucination_detected = True
            explanation += f"Response is missing key information: {fact['key']}\n"
    
    return hallucination_detected, explanation
```

### Advanced Features
- **Context Window Management**: Support for extended context windows up to 8192 tokens
- **System Messages**: Fine-tune model behavior with system-level instructions
- **Rate Limit Handling**: Built-in retry logic and batch processing
- **Error Handling**: Comprehensive error detection and recovery
- **Response Validation**: Automatic fact-checking and hallucination detection

## 📚 Documentation & Resources

### Interactive Tools
- **[Playground](/playground)**: Test models in real-time
- **[Model Explorer](/models)**: Compare and select models
- **[Cookbook](/cookbook)**: Implementation recipes and patterns

### Learning Resources
- Comprehensive API documentation
- Integration guides for popular frameworks
- Best practices for AI implementation
- Performance optimization tips
- Security guidelines

## 🎯 Use Cases

### Development
- Rapid prototyping
- Code generation and review
- Technical documentation
- Debug assistance

### Enterprise
- Content generation
- Data analysis
- Customer support automation
- Process optimization

### Research
- Model comparison
- Performance benchmarking
- AI capability testing
- Research paper analysis

## 🔒 Security & Compliance

- **Data Privacy**: No data retention beyond processing
- **API Security**: Industry-standard encryption
- **Access Control**: Fine-grained permissions
- **Audit Logging**: Comprehensive request tracking
- **Compliance**: GDPR and CCPA ready

## 🚀 Getting Started

1. **Sign Up**
   - Visit [cepheus-x.vercel.app](https://cepheus-x.vercel.app)
   - Get API key instantly

2. **Quick Integration**
   - Update base URL in existing code
   - Insert new API key
   - Start making requests

3. **Explore & Scale**
   - Test different models
   - Monitor usage in dashboard
   - Upgrade as needed

## 💡 Why Choose Cepheus?

- **Flexibility**: Switch between models without code changes
- **Cost-Effective**: Pay only for what you use
- **Future-Proof**: Automatic access to new models
- **Developer-Centric**: Built for developer productivity
- **Reliable**: Enterprise-grade infrastructure

## 🤝 Community & Support

- Active Discord community
- Regular office hours
- Priority enterprise support
- Comprehensive documentation
- Regular webinars and tutorials

## 📬 Contact

- **API Website**: [cepheus-x.vercel.app](https://cepheus-x.vercel.app)
- **Documentation**: [cepheus-x.vercel.app/docs](https://cepheus-x.vercel.app/docs)
---

<div align="center">
  <p><strong>Start Building with Cepheus Today</strong></p>
  <p>Free during beta • 20 requests per minute • No credit card required</p>
  <p>Powering the next generation of AI applications</p>
</div>
