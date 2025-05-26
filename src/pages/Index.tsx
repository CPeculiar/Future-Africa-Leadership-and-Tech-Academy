
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/CountdownTimer';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Shape Africa's Future
                <span className="block text-yellow-400">Leaders & Tech Innovators</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Join FALATA - where leadership meets technology. Empowering the next generation through comprehensive training programs designed for African excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  <Link to="/apply/leadership">Apply for Leadership</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link to="/apply/tech">Join Tech Academy</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop" 
                alt="Students in learning environment" 
                className="rounded-lg shadow-2xl max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CountdownTimer />
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your path to excellence with our comprehensive leadership and technology programs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Leadership Program */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop" 
                alt="Leadership training" 
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Leadership Academy</h3>
              <p className="text-gray-600 mb-6">
                Develop essential leadership skills, strategic thinking, and management capabilities to lead Africa's transformation in various sectors.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Strategic Leadership & Management</li>
                <li>• Public Speaking & Communication</li>
                <li>• Project Management</li>
                <li>• Entrepreneurship & Innovation</li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/programmes#leadership">Learn More</Link>
              </Button>
            </div>

            {/* Tech Program */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=300&fit=crop" 
                alt="Tech training" 
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tech Academy</h3>
              <p className="text-gray-600 mb-6">
                Master cutting-edge technologies and digital skills essential for the modern tech ecosystem. Learn from industry experts.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Software Development</li>
                <li>• Data Analysis & AI</li>
                <li>• Digital Marketing</li>
                <li>• Cybersecurity Fundamentals</li>
              </ul>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link to="/programmes#tech">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Future Africa Leadership and Tech Academy (FALATA) is dedicated to nurturing the next generation of African leaders and tech innovators. We bridge the gap between potential and excellence through comprehensive, practical training programs.
              </p>
              <Button asChild size="lg">
                <Link to="/about">Discover Our Story</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop" 
                alt="Team collaboration" 
                className="rounded-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop" 
                alt="Tech innovation" 
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Join us for transformative events and networking opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-600 font-semibold mb-2">June 2025</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Leadership Development Summit</h3>
              <p className="text-gray-600 mb-4">TLBC Auditorium, Kwata Awka</p>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-green-600 font-semibold mb-2">June 2025</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tech Academy Cohort 1</h3>
              <p className="text-gray-600 mb-4">Online Training Program</p>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-purple-600 font-semibold mb-2">August 2025</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tech Fest 2025</h3>
              <p className="text-gray-600 mb-4">Venue TBA</p>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
