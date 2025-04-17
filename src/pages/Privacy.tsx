
import MainLayout from "@/components/layout/MainLayout";

const Privacy = () => {
  return (
    <MainLayout>
      <div className="bg-cepheus-darker py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
          <p className="text-xl text-cepheus-gray-light max-w-3xl mx-auto text-center mb-8">
            How we handle and protect your data
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-cepheus-gray-light text-lg text-center">
            This page will be populated with Cepheus' privacy policy.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
