import MainLayout from "@/components/layout/MainLayout";
import CookbookCard from "@/components/cookbook/CookbookCard";

const Cookbook = () => {
  const articles = [
    {
      title: "Developing Hallucination Guardrails",
      description: "Learn how to implement guardrails to detect and correct hallucinations in AI responses, ensuring your applications provide accurate and reliable information.",
      link: "/cookbook/hallucination-guardrails",
      articleNumber: 1,
      totalArticles: 2
    },
    {
      title: "How to Handle Rate Limits",
      description: "Master the implementation of robust rate limit handling for your AI applications, including retry logic, batch processing, and error handling strategies.",
      link: "/cookbook/rate-limits",
      articleNumber: 2,
      totalArticles: 2
    }
  ];

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
          <div className="grid grid-cols-1 gap-8">
            {articles.map((article, index) => (
              <CookbookCard
                key={index}
                title={article.title}
                description={article.description}
                link={article.link}
                articleNumber={article.articleNumber}
                totalArticles={article.totalArticles}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cookbook;
