import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="sticky top-0 z-50 bg-cepheus-darker/95 backdrop-blur-sm border-b border-cepheus-gray-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-cepheus-green">Cepheus</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/docs" className="text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-sm font-medium">
                Docs
              </Link>
              <Link to="/cookbook" className="text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-sm font-medium">
                Cookbook
              </Link>
              <Link to="/prompt-engineering" className="text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-sm font-medium">
                Prompt Engineering
              </Link>
              <Link to="/models" className="text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-sm font-medium">
                Models
              </Link>
              <div className="relative">
                <button 
                  onClick={toggleDropdown} 
                  className="flex items-center text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-sm font-medium"
                >
                  About <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-cepheus-dark border border-cepheus-gray-dark/30">
                    <div className="py-1">
                      <Link to="/about" className="block px-4 py-2 text-sm text-gray-300 hover:text-cepheus-green hover:bg-cepheus-darker">
                        About Us
                      </Link>
                      <Link to="/privacy" className="block px-4 py-2 text-sm text-gray-300 hover:text-cepheus-green hover:bg-cepheus-darker">
                        Privacy Policy
                      </Link>
                      <Link to="/blog" className="block px-4 py-2 text-sm text-gray-300 hover:text-cepheus-green hover:bg-cepheus-darker">
                        Blog
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button asChild variant="default" className="bg-cepheus-green hover:bg-cepheus-green-dark text-black font-medium">
              <Link to="/docs">Get Started</Link>
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-cepheus-green focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-cepheus-darker border-b border-cepheus-gray-dark/30">
            <Link to="/" className="block text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/docs" className="block text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-base font-medium">
              Docs
            </Link>
            <Link to="/cookbook" className="block text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-base font-medium">
              Cookbook
            </Link>
            <Link to="/prompt-engineering" className="block text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-base font-medium">
              Prompt Engineering
            </Link>
            <Link to="/models" className="block text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-base font-medium">
              Models
            </Link>
            <Link to="/about" className="block text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-base font-medium">
              About Us
            </Link>
            <Link to="/privacy" className="block text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-base font-medium">
              Privacy Policy
            </Link>
            <Link to="/blog" className="block text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-base font-medium">
              Blog
            </Link>
            <div className="pt-2">
              <Button asChild variant="default" className="w-full bg-cepheus-green hover:bg-cepheus-green-dark text-black font-medium">
                <Link to="/docs">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
