
import MainLayout from "@/components/layout/MainLayout";

const Blog = () => {
  return (
    <MainLayout>
      <div className="bg-cepheus-darker py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Blog</h1>
          <p className="text-xl text-cepheus-gray-light max-w-3xl mx-auto text-center mb-8">
            Insights, tutorials, and news from the Cepheus team
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-cepheus-gray-light text-lg text-center">
            This page will be populated with blog articles from the provided URLs.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
