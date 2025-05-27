
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = () => {
    scrollToTop();
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/FALATA.jpg" 
                alt="FALATA Logo" 
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">FALATA</h3>
                <p className="text-sm text-gray-400">Future Africa Leadership & Tech Academy</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Empowering the next generation of African leaders and tech innovators through comprehensive training programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" onClick={handleLinkClick}>Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" onClick={handleLinkClick}>About Us</Link></li>
              <li><Link to="/programmes" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" onClick={handleLinkClick}>Programmes</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" onClick={handleLinkClick}>Events</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base" onClick={handleLinkClick}>Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400 text-sm sm:text-base">
              <p>3 Uche Ekwunife Crescent</p>
              <p>Kwata Awka, Nigeria</p>
              <p>
                <a 
                  href="tel:+2349060121720" 
                  className="hover:text-white transition-colors"
                >
                  Phone: 09060121720
                </a>
              </p>
              <p>
                <a 
                  href="mailto:futureafrica.leadtech@gmail.com" 
                  className="hover:text-white transition-colors break-all"
                >
                  Email: futureafrica.leadtech@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 Future Africa Leadership and Tech Academy (FALATA). All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
