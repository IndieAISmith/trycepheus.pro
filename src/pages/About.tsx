import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <MainLayout>
      <div className="bg-cepheus-darker py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
          <p className="text-xl text-cepheus-gray-light max-w-3xl mx-auto text-center mb-8">
            Learn more about Cepheus and our mission
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-cepheus-gray-light text-lg">
              At Cepheus, we're on a mission to democratize access to advanced AI capabilities. We believe that powerful AI technology should be accessible to developers and businesses of all sizes, enabling innovation and growth across industries.
            </p>
          </section>

          {/* What We Do Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">What We Do</h2>
            <p className="text-cepheus-gray-light text-lg">
              We provide a unified, OpenAI-compatible API gateway that gives you access to over 80 cutting-edge AI models from various providers. Our platform simplifies AI integration, reduces development time, and offers flexible pricing options to suit your needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-cepheus-dark p-6 rounded-lg border border-cepheus-gray-dark/30">
                <h3 className="text-xl font-semibold text-white mb-2">Unified Access</h3>
                <p className="text-cepheus-gray-light">One API to access multiple AI models, eliminating the need for separate integrations.</p>
              </div>
              <div className="bg-cepheus-dark p-6 rounded-lg border border-cepheus-gray-dark/30">
                <h3 className="text-xl font-semibold text-white mb-2">Developer-First</h3>
                <p className="text-cepheus-gray-light">Built by developers for developers, with comprehensive documentation and support.</p>
              </div>
              <div className="bg-cepheus-dark p-6 rounded-lg border border-cepheus-gray-dark/30">
                <h3 className="text-xl font-semibold text-white mb-2">Flexible Pricing</h3>
                <p className="text-cepheus-gray-light">Free during beta, with scalable pricing options for businesses of all sizes.</p>
              </div>
            </div>
          </section>

          {/* Our Values Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cepheus-dark p-6 rounded-lg border border-cepheus-gray-dark/30">
                <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
                <p className="text-cepheus-gray-light">We constantly explore and integrate new AI models and technologies to provide the best solutions for our users.</p>
              </div>
              <div className="bg-cepheus-dark p-6 rounded-lg border border-cepheus-gray-dark/30">
                <h3 className="text-xl font-semibold text-white mb-2">Reliability</h3>
                <p className="text-cepheus-gray-light">We maintain high uptime and performance standards to ensure your applications run smoothly.</p>
              </div>
              <div className="bg-cepheus-dark p-6 rounded-lg border border-cepheus-gray-dark/30">
                <h3 className="text-xl font-semibold text-white mb-2">Transparency</h3>
                <p className="text-cepheus-gray-light">We believe in clear communication and honest pricing, with no hidden fees or complicated terms.</p>
              </div>
              <div className="bg-cepheus-dark p-6 rounded-lg border border-cepheus-gray-dark/30">
                <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
                <p className="text-cepheus-gray-light">We foster a supportive community of developers and businesses working together to advance AI technology.</p>
              </div>
            </div>
          </section>

          {/* Join Us Section */}
          <section className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-white">Join Us on Our Journey</h2>
            <p className="text-cepheus-gray-light text-lg">
              We're just getting started, and we'd love for you to be part of our story. Whether you're a developer looking to build the next big thing or a business seeking to leverage AI, Cepheus is here to help you succeed.
            </p>
            <div className="mt-8">
              <Button asChild className="inline-block bg-cepheus-green hover:bg-cepheus-green-dark text-black font-medium px-6 py-3 rounded-md">
                <Link to="/docs">Get Started Free</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
