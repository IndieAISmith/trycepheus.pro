import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Define navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Docs" },
    { href: "/cookbook", label: "Cookbook" },
    { href: "/models", label: "Models" },
    { href: "/playground", label: "Playground" },
    { href: "/about", label: "About Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-cepheus-darker/95 backdrop-blur-sm border-b border-cepheus-gray-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo size="sm" />
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
              <Link to="/models" className="text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-sm font-medium">
                Models
              </Link>
              <Link to="/playground" className="text-gray-300 hover:text-cepheus-green px-3 py-2 rounded-md text-sm font-medium">
                Playground
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
            <MobileSidebar links={navLinks} />
          </div>
        </div>
      </div>


    </nav>
  );
};

export default Navbar;
