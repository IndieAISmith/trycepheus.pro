
import { Link } from "react-router-dom";
import { BookOpen, Code, Cpu, FileText } from "lucide-react";

interface ResourceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const ResourceCard = ({ icon: Icon, title, description, link, linkText }: ResourceCardProps) => (
  <div className="rounded-xl border border-cepheus-gray-dark/30 bg-cepheus-darker p-6 transition-all hover:border-cepheus-green/50 hover:shadow-lg hover:shadow-cepheus-green/5">
    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cepheus-green/20 to-cepheus-accent/20 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-cepheus-green" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-cepheus-gray-light mb-4 text-sm">{description}</p>
    <Link to={link} className="text-cepheus-green hover:text-cepheus-green-light text-sm font-medium">
      {linkText}
    </Link>
  </div>
);

const ResourcesSection = () => {
  const resources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides to help you integrate and use our API effectively.",
      link: "/docs",
      linkText: "Read the docs"
    },
    {
      icon: Code,
      title: "Cookbook",
      description: "Practical recipes and tutorials for common AI implementation patterns.",
      link: "/cookbook",
      linkText: "Explore recipes"
    },
    {
      icon: FileText,
      title: "Prompt Engineering",
      description: "Learn how to craft effective prompts for better AI outputs.",
      link: "/prompt-engineering",
      linkText: "Master prompting"
    },
    {
      icon: Cpu,
      title: "Models Library",
      description: "Explore our comprehensive catalog of supported AI models.",
      link: "/models",
      linkText: "View models"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Explore Resources
          </h2>
          <p className="mt-4 text-xl text-cepheus-gray-light max-w-3xl mx-auto">
            Everything you need to get started with Cepheus
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              icon={resource.icon}
              title={resource.title}
              description={resource.description}
              link={resource.link}
              linkText={resource.linkText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
