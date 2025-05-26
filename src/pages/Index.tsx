
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/CountdownTimer';
import Footer from '@/components/Footer';
import { ArrowRight, Star, Users, BookOpen, Trophy } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full px-6 py-2 text-sm font-medium text-yellow-300 border border-yellow-400/30">
                <Star className="w-4 h-4 mr-2" />
                Africa's Premier Leadership & Tech Academy
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                Shape the
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Future of Africa
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                Transform your potential into impact. Join FALATA's world-class programs that blend cutting-edge technology with visionary leadership training.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all">
                  <Link to="/apply/leadership">
                    Start Leadership Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg px-8 py-4 rounded-full backdrop-blur-sm">
                  <Link to="/apply/tech">Join Tech Academy</Link>
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">500+</div>
                  <div className="text-sm text-slate-400">Graduates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">95%</div>
                  <div className="text-sm text-slate-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">50+</div>
                  <div className="text-sm text-slate-400">Partners</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop" 
                  alt="Students collaborating" 
                  className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 shadow-xl">
                  <div className="text-black font-bold text-lg">Next Cohort</div>
                  <div className="text-black text-sm">June 2025</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl transform rotate-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section - Reduced Size */}
      <section className="py-4 bg-gradient-to-r from-slate-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CountdownTimer />
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full px-6 py-2 text-sm font-semibold text-purple-700 mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              World-Class Programs
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Path to Excellence
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Two comprehensive programs designed to unlock your potential and drive Africa's transformation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Leadership Program */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-10 border border-purple-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-8 right-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Leadership
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop" 
                alt="Leadership training" 
                className="w-full h-56 object-cover rounded-2xl mb-8 group-hover:scale-105 transition-transform duration-500"
              />
              
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Leadership Academy</h3>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Develop visionary leadership skills that drive transformation across Africa's diverse sectors and communities.
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  'Strategic Leadership & Vision',
                  'Public Speaking & Influence',
                  'Project & Team Management',
                  'Innovation & Entrepreneurship'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-4"></div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl">
                <Link to="/programmes#leadership">Explore Leadership Program</Link>
              </Button>
            </div>

            {/* Tech Program */}
            <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-10 border border-emerald-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Technology
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=300&fit=crop" 
                alt="Tech training" 
                className="w-full h-56 object-cover rounded-2xl mb-8 group-hover:scale-105 transition-transform duration-500"
              />
              
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Tech Academy</h3>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Master cutting-edge technologies and digital innovation skills for the modern tech ecosystem.
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  'Software Development & AI',
                  'Data Science & Analytics',
                  'Digital Marketing & Growth',
                  'Cybersecurity & Cloud Tech'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-4"></div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button asChild className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl">
                <Link to="/programmes#tech">Explore Tech Program</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full px-6 py-2 text-sm font-semibold text-yellow-300 border border-yellow-400/30">
                <Users className="w-4 h-4 mr-2" />
                Our Mission
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Empowering Africa's
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Next Generation
                </span>
              </h2>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                FALATA bridges the gap between potential and excellence through world-class training programs that combine traditional leadership wisdom with cutting-edge technology skills.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-yellow-400">15+</div>
                  <div className="text-slate-400">Years Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-yellow-400">100%</div>
                  <div className="text-slate-400">Placement Rate</div>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold rounded-full">
                <Link to="/about">
                  Discover Our Story
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <img 
                    src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=400&fit=crop" 
                    alt="Team collaboration" 
                    className="rounded-2xl shadow-xl"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop" 
                    alt="Tech innovation" 
                    className="rounded-2xl shadow-xl"
                  />
                </div>
                <div className="space-y-6 pt-12">
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop" 
                    alt="Leadership meeting" 
                    className="rounded-2xl shadow-xl"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=400&fit=crop" 
                    alt="Students learning" 
                    className="rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full px-6 py-2 text-sm font-semibold text-purple-700 mb-6">
              <Trophy className="w-4 h-4 mr-2" />
              Upcoming Events
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Transform Through
              <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join transformative events that connect, inspire, and accelerate your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Leadership Development Summit",
                date: "June 2025",
                location: "TLBC Auditorium, Kwata Awka",
                color: "from-purple-500 to-indigo-500"
              },
              {
                title: "Tech Academy Cohort 1",
                date: "June 2025",
                location: "Online Training Program",
                color: "from-emerald-500 to-teal-500"
              },
              {
                title: "Tech Fest 2025",
                date: "August 2025",
                location: "Venue TBA",
                color: "from-orange-500 to-red-500"
              }
            ].map((event, index) => (
              <div key={index} className="group bg-white border border-slate-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`w-full h-2 bg-gradient-to-r ${event.color} rounded-full mb-6`}></div>
                <div className="text-slate-500 font-medium mb-2">{event.date}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{event.title}</h3>
                <p className="text-slate-600 mb-6">{event.location}</p>
                <Button variant="outline" size="sm" className="group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  Learn More
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-slate-900 to-purple-900 hover:from-slate-800 hover:to-purple-800 text-white font-semibold rounded-full px-8">
              <Link to="/events">
                View All Events
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
