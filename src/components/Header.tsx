
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programmes', path: '/programmes' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    scrollToTop();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={scrollToTop}>
            <img 
              src="/src/assets/images/FALATA.jpg" 
              alt="FALATA Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">FALATA</h1>
              <p className="text-xs text-gray-600">Future Africa Leadership & Tech Academy</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={scrollToTop}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActive(item.path) ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-gray-600 block h-0.5 w-6 rounded-sm transition-all duration-500 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`bg-gray-600 block h-0.5 w-6 rounded-sm transition-all duration-500 ease-in-out my-0.5 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`bg-gray-600 block h-0.5 w-6 rounded-sm transition-all duration-500 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </Button>
        </div>

        {/* Mobile Navigation with enhanced smooth transitions */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-xl transition-all duration-700 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 max-h-96 translate-y-0 visible' 
            : 'opacity-0 max-h-0 -translate-y-4 invisible'
        } overflow-hidden`}>
          <nav className="px-4 py-6">
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block text-base font-medium transition-all duration-700 ease-in-out hover:text-purple-600 hover:translate-x-3 py-3 px-4 rounded-xl hover:bg-purple-50 transform ${
                    isActive(item.path) ? 'text-purple-600 bg-purple-50 translate-x-2' : 'text-gray-700'
                  } ${isMenuOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : `${(navItems.length - index) * 50}ms`
                  }}
                  onClick={handleLinkClick}
                >
                  <span className="inline-block transition-transform duration-300 hover:scale-105">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
