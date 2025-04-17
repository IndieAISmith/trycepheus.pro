
import { QuoteIcon } from "lucide-react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  company: string;
}

const Testimonial = ({ content, author, role, company }: TestimonialProps) => (
  <div className="rounded-xl border border-cepheus-gray-dark/30 bg-cepheus-darker p-6 shadow-xl hover:border-cepheus-green/30 transition-all">
    <QuoteIcon className="h-8 w-8 text-cepheus-green/60 mb-4" />
    <p className="text-cepheus-gray-light mb-6">{content}</p>
    <div className="flex items-center">
      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cepheus-green to-cepheus-accent flex items-center justify-center text-black font-bold text-lg">
        {author.charAt(0)}
      </div>
      <div className="ml-4">
        <p className="font-medium text-white">{author}</p>
        <p className="text-cepheus-gray text-sm">
          {role}, {company}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Cepheus has dramatically reduced our API costs while giving us access to more models. The drop-in compatibility with OpenAI's API made migration effortless.",
      author: "Samantha Chen",
      role: "CTO",
      company: "NexTech Solutions"
    },
    {
      content: "We were spending thousands on API calls during development. Switching to Cepheus cut our costs to zero during their beta, and the performance is just as good.",
      author: "Michael Rodriguez",
      role: "Lead Engineer",
      company: "DataFlow AI"
    },
    {
      content: "The ability to switch between different models without changing our code has been invaluable for our research. Cepheus delivers on its promises.",
      author: "Dr. Aisha Johnson",
      role: "AI Researcher",
      company: "InnovateAI Lab"
    }
  ];

  return (
    <section className="py-20 bg-cepheus-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cepheus-green/5 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted By Teams Of All Sizes
          </h2>
          <p className="mt-4 text-xl text-cepheus-gray-light max-w-3xl mx-auto">
            See what our early users are saying about Cepheus
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
