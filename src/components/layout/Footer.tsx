import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";


const Footer = () => {
  return (
    <footer className="border-t border-cepheus-gray-dark/30 bg-cepheus-darker pt-8 sm:pt-12 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center">
            <img  src="/cepheus-logo.svg"  alt="Cepheus Logo" className="h-10"/>         </Link>
            <p className="mt-2 text-gray-400 text-sm">
              Free OpenAI-compatible APIs with 20 RPM rate limits during beta.
            </p>
            <div className="flex mt-4 space-x-3">
              <a href="#" className="text-gray-400 hover:text-cepheus-green">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cepheus-green">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cepheus-green">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-cepheus-green-light font-medium">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-cepheus-green text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/cookbook" className="text-gray-400 hover:text-cepheus-green text-sm">
                  Cookbook
                </Link>
              </li>
              <li>
                <Link to="/prompt-engineering" className="text-gray-400 hover:text-cepheus-green text-sm">
                  Prompt Engineering
                </Link>
              </li>
              <li>
                <Link to="/models" className="text-gray-400 hover:text-cepheus-green text-sm">
                  Models
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-cepheus-green-light font-medium">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-cepheus-green text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-cepheus-green text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-cepheus-green text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:contact@trycepheus.pro" className="text-gray-400 hover:text-cepheus-green text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-cepheus-green-light font-medium">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-cepheus-dark border border-cepheus-gray-dark/50 text-gray-300 px-3 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-1 focus:ring-cepheus-green flex-grow"
              />
              <button className="bg-cepheus-green hover:bg-cepheus-green-dark text-black px-3 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-cepheus-gray-dark/30 mt-8 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Cepheus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
