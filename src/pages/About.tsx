
import Footer from '@/components/Footer';
import StayConnected from '@/components/StayConnected';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in">About FALATA</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto animate-scale-in">
            Empowering the next generation of African leaders and tech innovators through comprehensive training programs
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 transition-all duration-300 hover:text-gray-800">
                Future Africa Leadership and Tech Academy (FALATA) is dedicated to bridging the gap between potential and excellence. We provide world-class training that combines traditional leadership wisdom with cutting-edge technology skills.
              </p>
              <p className="text-base sm:text-lg text-gray-600 transition-all duration-300 hover:text-gray-800">
                Our comprehensive programs are designed to prepare the next generation of African leaders for the challenges and opportunities of tomorrow.
              </p>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Students learning" 
                className="rounded-lg shadow-lg w-full h-auto transition-all duration-300 hover:scale-105 hover:shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Core Values</h2>
            <p className="text-lg sm:text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-scale-in">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300">
                <span className="text-white text-2xl font-bold">E</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-sm sm:text-base text-gray-600">We strive for the highest standards in everything we do</p>
            </div>
            
            <div className="text-center transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300">
                <span className="text-white text-2xl font-bold">I</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-sm sm:text-base text-gray-600">We embrace new ideas and cutting-edge technologies</p>
            </div>
            
            <div className="text-center transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-scale-in sm:col-span-2 lg:col-span-1" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-300">
                <span className="text-white text-2xl font-bold">C</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Community</h3>
              <p className="text-sm sm:text-base text-gray-600">We build strong, supportive learning communities</p>
            </div>
          </div>
        </div>
      </section>

      <StayConnected />
      <Footer />
    </div>
  );
};

export default About;
