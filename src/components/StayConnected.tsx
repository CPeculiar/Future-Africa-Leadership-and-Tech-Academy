
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

const StayConnected = () => {
  return (
    <section className="bg-gradient-to-b from-gray-400 via-gray-600 to-gray-900 text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Stay Connected</h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          We'd love to hear from you on our social network.
        </p>
        
        <div className="flex justify-center space-x-4 sm:space-x-6">
          <a 
            href="#" 
            className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Facebook"
          >
            <Facebook className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>
          
          <a 
            href="#" 
            className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>
          
          <a 
            href="#" 
            className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>
          
          <a 
            href="#" 
            className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="YouTube"
          >
            <Youtube className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>
          
          <a 
            href="#" 
            className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default StayConnected;
