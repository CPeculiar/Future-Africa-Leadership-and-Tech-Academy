
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import StayConnected from "@/components/StayConnected";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center px-4 sm:px-6 animate-fade-in">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold mb-4 text-gray-300 animate-scale-in">404</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Oops! Page not found
          </p>
          <a 
            href="/" 
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 hover:scale-105 transform animate-scale-in"
            style={{ animationDelay: '400ms' }}
          >
            Return to Home
          </a>
        </div>
      </div>
      <StayConnected />
      <Footer />
    </div>
  );
};

export default NotFound;
