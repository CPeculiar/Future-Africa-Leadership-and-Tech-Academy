
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/CountdownTimer';
import Footer from '@/components/Footer';
import { ArrowRight, Star, Users, BookOpen, Trophy, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import heroIMG from '/test3.jpg'
import TECH from '/test7.jpg'
import LEAD from '/test5.jpg'
import aboutIMG from '/test1.png'
import aboutIMG3 from '/pic3.jpg'
import aboutIMG2 from '/pic5.jpg'
import aboutIMG4 from '/test9.jpg'
import aboutIMG1 from '/pic2.jpg'
import aboutIMG5 from '/pic7.jpg'
import aboutIMG6 from '/pic10.jpg'


const Index = () => {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const missionImages = [
    { src: aboutIMG1, alt: "Leadership Team" },
    { src: aboutIMG3, alt: "2022 Graduation set" },
    { src: aboutIMG5, alt: "2022 Graduating Students" },
    { src: aboutIMG2, alt: "2023 Graduation set" },
    { src: aboutIMG6, alt: "Collaborations" },
    { src: aboutIMG4, alt: "Tech brainstorming" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "2349060121720"; // Nigerian format with country code
    const message = "Hello! I'm interested in FALATA programs.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show WhatsApp button after scrolling past the hero section (approximately 80vh)
      const scrollPosition = window.scrollY;
      const showThreshold = window.innerHeight * 0.8;
      setShowWhatsApp(scrollPosition > showThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide effect for mission images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % missionImages.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [missionImages.length]);

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left space-y-6 sm:space-y-8">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-yellow-300 border border-yellow-400/30">
                <Star className="w-4 h-4 mr-2" />
                Africa's Premier Leadership & Tech Academy
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                Shape the
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Future of Africa
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your potential into impact. Join FALATA's world-class programs that blend cutting-edge technology with visionary leadership training.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all">
                  <Link to="/apply/leadership" onClick={scrollToTop}>
                    Start Your Leadership Journey
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-sm">
                  <Link to="/apply/tech" onClick={scrollToTop}>Join Our Tech Academy</Link>
                </Button>
              </div>

              {/* <div className="flex items-center justify-center lg:justify-start space-x-6 sm:space-x-8 pt-6 sm:pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">500+</div>
                  <div className="text-xs sm:text-sm text-slate-400">Graduates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">95%</div>
                  <div className="text-xs sm:text-sm text-slate-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">50+</div>
                  <div className="text-xs sm:text-sm text-slate-400">Partners</div>
                </div>
              </div> */}
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <div className="relative z-10">
                <img 
                  // src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop"
                  src={heroIMG} 
                  alt="Students collaborating" 
                  className="rounded-3xl shadow-2xl w-full max-w-full mx-auto transform transition-transform duration-500 hover:scale-105 h-96 sm:h-auto object-cover"
                />
                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-4 sm:p-6 shadow-xl">
                  <div className="text-black font-bold text-base sm:text-lg">Next Cohort</div>
                  <div className="text-black text-sm">June 2025</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl transform rotate-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section - Reduced Size */}
      <section className="py-2 sm:py-4 bg-gradient-to-r from-slate-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CountdownTimer />
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-purple-700 mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              World-Class Programs
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Path to Excellence
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Two comprehensive programs designed to unlock your potential and drive Africa's transformation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Leadership Program */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-6 sm:p-10 border border-purple-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-6 sm:top-8 right-6 sm:right-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                Leadership
              </div>
              
              <img 
                // src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop"
                src={LEAD} 
                alt="Leadership training" 
                className="w-full h-48 sm:h-56 object-cover rounded-2xl mb-6 sm:mb-8 group-hover:scale-105 transition-transform duration-500"
              />
              
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Leadership Academy</h3>
              <p className="text-slate-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                Develop visionary leadership skills that drive transformation across Africa's diverse sectors and communities.
              </p>
              
              <div className="space-y-3 mb-6 sm:mb-8">
                {[
                  'Strategic Leadership & Vision',
                  'Public Speaking & Influence',
                  'Project & Team Management',
                  'Innovation & Entrepreneurship',
                  'Coaching & Mentorship for Leaders',
                  'Leadership in Crisis & Risk Management',
                  'Community Leadership & Civic Engagement',
                  'Emotional Intelligence & Conflict Resolution',
                  'Executive Communication & Presentation Skills',
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-4"></div>
                    <span className="text-slate-700 font-medium text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 sm:py-4 rounded-xl">
                <Link to="/programmes#leadership" onClick={scrollToTop}>Explore Leadership Program</Link>
              </Button>
            </div>

            {/* Tech Program */}
            <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 sm:p-10 border border-emerald-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-6 sm:top-8 right-6 sm:right-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                Technology
              </div>
              
              <img 
                // src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=300&fit=crop" 
                src={TECH}
                alt="Tech training" 
                className="w-full h-48 sm:h-56 object-cover rounded-2xl mb-6 sm:mb-8 group-hover:scale-105 transition-transform duration-500"
              />
              
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Tech Academy</h3>
              <p className="text-slate-600 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                Master cutting-edge technologies and digital innovation skills for the modern tech ecosystem.
              </p>
              
              <div className="space-y-3 mb-6 sm:mb-8">
                {[
                  'Mobile Video Editing & Animation',
                  'Web Development & Design',
                  'Software Development & AI',
                  'Data Science & Analytics',
                  'Digital Marketing & Growth',
                  'Cybersecurity & Cloud Tech',
                  'Graphics Designing & Multimedia',
                  'No-Code / Low-Code Development',
                  'Tech Entrepreneurship & Startup Launchpad',
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-4"></div>
                    <span className="text-slate-700 font-medium text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button asChild className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 sm:py-4 rounded-xl">
                <Link to="/programmes#tech" onClick={scrollToTop}>Explore Tech Program</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-yellow-300 border border-yellow-400/30">
                <Users className="w-4 h-4 mr-2" />
                Our Mission
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                Empowering Africa's
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Next Generation
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                FALATA bridges the gap between potential and excellence through world-class training 
                programs that combine traditional leadership wisdom with cutting-edge technology skills.
              </p>
              
              <div className="grid grid-cols-2 gap-6 sm:gap-8">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">8+</div>
                  <div className="text-slate-400 text-sm sm:text-base">Years Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">100%</div>
                  <div className="text-slate-400 text-sm sm:text-base">Placement Rate</div>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold rounded-full">
                <Link to="/about" onClick={scrollToTop}>
                  Discover Our Story
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              {/* Mobile Layout - Auto-sliding carousel */}
              <div className="block lg:hidden">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  {/* Carousel container */}
                  <div 
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {missionImages.map((image, index) => (
                      <div key={index} className="w-full flex-shrink-0 relative">
                        <img 
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent"></div>
                        {/* Image indicator text */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                            <p className="text-white text-sm font-medium">{image.alt}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Dots indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {missionImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-yellow-400 w-6' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4 sm:space-y-6">
                    <img 
                      src={aboutIMG} 
                      alt="Team collaboration" 
                      className="rounded-2xl shadow-xl w-full"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop" 
                      alt="Tech innovation" 
                      className="rounded-2xl shadow-xl w-full"
                    />
                  </div>
                  <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                    <img 
                      src={aboutIMG2}
                      alt="Leadership meeting" 
                      className="rounded-2xl shadow-xl w-full sm:h-80 object-cover"
                    />
                    <img 
                      src={aboutIMG3}
                      alt="Students learning" 
                      className="rounded-2xl shadow-xl w-full sm:h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold text-purple-700 mb-6">
              <Trophy className="w-4 h-4 mr-2" />
              Upcoming Events
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Transform Through
              <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Join transformative events that connect, inspire, and accelerate your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                id: 1,
                title: "Leadership Development Summit",
                date: "July 2025",
                location: "TLBC Auditorium Awka, Anambra State.",
                color: "from-purple-500 to-indigo-500"
              },
              {
                id: 2,
                title: "Tech Academy Cohort 1",
                date: "June 2025",
                location: "Online Training Program",
                color: "from-emerald-500 to-teal-500"
              },
              {
                id: 3,
                title: "Tech Fest 2025",
                date: "August 2025",
                location: "Venue: TBA",
                color: "from-orange-500 to-red-500"
              }
            ].map((event, index) => (
              <div key={index} className="group bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`w-full h-2 bg-gradient-to-r ${event.color} rounded-full mb-6`}></div>
                <div className="text-slate-500 font-medium mb-2 text-sm sm:text-base">{event.date}</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">{event.title}</h3>
                <p className="text-slate-600 mb-6 text-sm sm:text-base">{event.location}</p>
                <Button asChild variant="outline" size="sm" className="group-hover:bg-slate-900 group-hover:text-white transition-colors w-full sm:w-auto">
                  <Link to={`/events/${event.id}`} onClick={scrollToTop}>
                    Learn More
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-slate-900 to-purple-900 hover:from-slate-800 hover:to-purple-800 text-white font-semibold rounded-full px-6 sm:px-8">
              <Link to="/events" onClick={scrollToTop}>
                View All Events
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Chat Button - Fixed Position with conditional visibility */}
      {showWhatsApp && (
        <button
          onClick={handleWhatsAppClick}
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-3xl animate-pulse"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} className="fill-current" />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Index;
