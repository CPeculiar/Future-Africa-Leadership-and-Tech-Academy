
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThreads } from '@fortawesome/free-brands-svg-icons';


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
            href="https://www.facebook.com/share/1DZd8b2Tp2" target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Facebook"
          >
            <Facebook className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>
          
          <a 
            href="https://x.com/FALATA_Official"  target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>
          
          <a 
            href="https://youtube.com/@falataofficial" target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="YouTube"
          >
            <Youtube className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>
          
          <a 
            href="http://tiktok.com/@falata_official" target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="TikTok"
          >
            <TikTokIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>
          
          <a 
            href="https://www.instagram.com/falata.official" target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>

          <a 
            href="https://www.threads.net/@falata.official" target="_blank" rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Threads"
          >
            <FontAwesomeIcon icon={faThreads} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default StayConnected;

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
