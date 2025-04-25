import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileSidebarProps {
  links: {
    href: string;
    label: string;
  }[];
}

const MobileSidebar = ({ links }: MobileSidebarProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  // Only render on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-300 hover:text-cepheus-green hover:bg-transparent"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 bg-cepheus-darker border-cepheus-gray-dark/30 backdrop-blur-md">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-cepheus-gray-dark/30 flex items-center">
            <Logo size="md" />
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="flex flex-col">
              {links.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-cepheus-green hover:bg-cepheus-dark/50 px-4 py-4 text-base font-medium transition-colors border-b border-cepheus-gray-dark/20"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </nav>
          <div className="p-4 border-t border-cepheus-gray-dark/30">
            <SheetClose asChild>
              <Button asChild variant="default" className="w-full bg-cepheus-green hover:bg-cepheus-green-dark text-black font-medium py-6 text-base">
                <Link to="/docs">Get Started</Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
