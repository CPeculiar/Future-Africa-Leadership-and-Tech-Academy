
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { MessageCircle, AtSign } from 'lucide-react'; // Using MessageCircle for TikTok and AtSign for Threads

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
                src="/favicon.ico" 
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
              <a href="https://www.facebook.com/share/19MUXoUN9e/" className="text-gray-400 hover:text-blue-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={24} />
              </a>
              <a href="https://x.com/FALATA_Official" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <span className="sr-only">TikTok</span>
                <TikTokIcon size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <span className="sr-only">Threads</span>
                <ThreadsIcon size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Custom TikTok Icon Component
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.302-1.99-1.302-3.338h-3.017v14.909c0 2.396-1.904 4.32-4.32 4.32-2.396 0-4.32-1.904-4.32-4.32 0-2.396 1.904-4.32 4.32-4.32.462 0 .905.072 1.32.207V8.678c-.425-.06-.862-.091-1.32-.091-4.142 0-7.509 3.367-7.509 7.509S5.959 23.605 10.1 23.605s7.509-3.367 7.509-7.509V9.854c1.555 1.019 3.4 1.612 5.391 1.612v-3.168c-1.019 0-1.991-.34-2.755-.906-.425-.319-.811-.698-1.137-1.137-.453-.604-.792-1.302-.906-2.075-.057-.377-.057-.755 0-1.132.057-.377.189-.736.377-1.066.189-.33.434-.623.717-.868z"/>
  </svg>
);

const ThreadsIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-.542-1.947-1.499-3.418-2.845-4.37-1.433-1.016-3.222-1.492-5.314-1.417-2.69.097-4.774.986-6.197 2.640-1.377 1.602-2.085 3.937-2.103 6.939v.033c.018 3.009.729 5.35 2.112 6.958 1.429 1.661 3.516 2.549 6.21 2.641 2.717-.082 4.76-.963 6.072-2.617.811-1.022 1.36-2.305 1.634-3.817-.735-.256-1.504-.506-2.308-.756-.244.952-.65 1.747-1.205 2.363-.832.924-2.006 1.394-3.49 1.394-1.722 0-3.102-.61-4.099-1.814-.895-1.08-1.344-2.584-1.344-4.486 0-1.933.449-3.4 1.334-4.36.839-.909 1.937-1.37 3.265-1.37 1.302 0 2.37.46 3.175 1.368.805.908 1.207 2.09 1.207 3.516 0 .729-.195 1.408-.58 2.016-.39.616-.949 1.053-1.662 1.299l.75 1.845c1.15-.395 2.067-1.086 2.724-2.053.666-.978 1.003-2.134 1.003-3.436 0-1.934-.53-3.657-1.577-5.123C16.944.846 14.897 0 12.186 0z"/>
    <path d="M12.5 15c-.825 0-1.495-.672-1.495-1.5s.67-1.5 1.495-1.5 1.5.672 1.5 1.5-.675 1.5-1.5 1.5z"/>
  </svg>
);