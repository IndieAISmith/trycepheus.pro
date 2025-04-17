import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CookbookCardProps {
  title: string;
  description: string;
  link: string;
  articleNumber: number;
  totalArticles: number;
}

const CookbookCard = ({ title, description, link, articleNumber, totalArticles }: CookbookCardProps) => {
  return (
    <div className="rounded-lg border border-cepheus-gray-dark/30 bg-cepheus-darker p-6 hover:border-cepheus-green/50 transition-all group">
      <div className="text-cepheus-gray mb-2">Article {articleNumber} of {totalArticles}</div>
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <p className="text-cepheus-gray-light mb-6">{description}</p>
      <Link 
        to={link} 
        className="text-cepheus-green hover:text-cepheus-green-light font-medium flex items-center"
      >
        Read article
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};

export default CookbookCard; 