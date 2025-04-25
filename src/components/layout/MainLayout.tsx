
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import GeometricHeader from "./GeometricHeader";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
  useGeometricHeader?: boolean;
}

const MainLayout = ({ children, useGeometricHeader }: MainLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const shouldUseGeometricHeader = useGeometricHeader !== undefined ? useGeometricHeader : isHomePage;

  return (
    <div className="flex flex-col min-h-screen bg-cepheus-dark">
      {shouldUseGeometricHeader ? (
        <GeometricHeader />
      ) : (
        <Navbar />
      )}
      <main className={`flex-grow w-full overflow-x-hidden ${shouldUseGeometricHeader ? 'pt-0' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
