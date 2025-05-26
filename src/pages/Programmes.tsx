
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { useState } from 'react';

const Programmes = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const programImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop"
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">OUR PROGRAMMES</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Explore our Leadership Academy and Tech Academy Programmes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection('leadership')}
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              >
                Leadership Academy Programmes
              </Button>
              <Button 
                onClick={() => scrollToSection('tech')}
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Tech Academy Programmes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Academy */}
      <section id="leadership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Academy</h2>
            <p className="text-xl text-gray-600">Developing visionary leaders for Africa's future</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Overview</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our Leadership Academy is designed to develop the next generation of African leaders who will drive positive change across various sectors. The program combines theoretical knowledge with practical application, ensuring graduates are well-equipped to lead in today's dynamic environment.
              </p>
              
              <h4 className="text-xl font-bold text-gray-900 mb-4">Core Modules:</h4>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Strategic Leadership & Vision Setting:</strong> Learn to develop and communicate compelling visions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Public Speaking & Communication:</strong> Master the art of influential communication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Project Management & Execution:</strong> Deliver results through effective project management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Entrepreneurship & Innovation:</strong> Drive innovation and create sustainable businesses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Emotional Intelligence & Team Building:</strong> Lead teams with empathy and effectiveness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>African Development Context:</strong> Understand unique challenges and opportunities in Africa</span>
                </li>
              </ul>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-bold text-blue-900 mb-2">Next Session Starting:</h4>
                <p className="text-blue-700 text-lg font-semibold">June 2025</p>
                <p className="text-blue-600 mt-2">Duration: 12 weeks intensive program</p>
                <p className="text-blue-600">Mode: Hybrid (Online + Weekend Physical Sessions)</p>
              </div>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/apply/leadership">Apply for Leadership Training</Link>
              </Button>
            </div>

            <div>
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop" 
                alt="Leadership training session" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

          {/* Image Carousel */}
          <div className="mt-16">
            <div className="relative">
              <img 
                src={programImages[currentImageIndex]}
                alt="Program activities" 
                className="w-full h-96 object-cover rounded-lg shadow-lg transition-opacity duration-500"
              />
              
              <div className="flex justify-center mt-6 space-x-2">
                {programImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Academy */}
      <section id="tech" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tech Academy</h2>
            <p className="text-xl text-gray-600">Mastering technology for the digital age</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop" 
                alt="Tech training session" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Overview</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our Tech Academy provides comprehensive training in cutting-edge technologies and digital skills essential for the modern tech ecosystem. Students learn from industry experts and work on real-world projects that prepare them for successful tech careers.
              </p>
              
              <h4 className="text-xl font-bold text-gray-900 mb-4">Core Tracks:</h4>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Full-Stack Web Development:</strong> Frontend and backend development with modern frameworks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Data Science & AI:</strong> Machine learning, data analysis, and artificial intelligence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Mobile App Development:</strong> iOS and Android app development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Digital Marketing & Analytics:</strong> Online marketing strategies and tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Cybersecurity Fundamentals:</strong> Protecting digital assets and systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>UI/UX Design:</strong> Creating user-centered digital experiences</span>
                </li>
              </ul>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-bold text-green-900 mb-2">Cohort 1 Starting:</h4>
                <p className="text-green-700 text-lg font-semibold">June 2025</p>
                <p className="text-green-600 mt-2">Duration: 16 weeks intensive program</p>
                <p className="text-green-600">Mode: Online with practical projects</p>
                <p className="text-green-600 font-semibold">Investment: ₦10,000</p>
              </div>

              <Button asChild size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                <Link to="/apply/tech">Apply for Tech Academy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose FALATA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose FALATA?</h2>
            <p className="text-xl text-gray-600">Excellence in leadership and technology education</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of practical experience in leadership and technology.</p>
            </div>

            <div className="bg-green-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Practical Application</h3>
              <p className="text-gray-600">Work on real-world projects and case studies that prepare you for actual challenges in your field.</p>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Networking Opportunities</h3>
              <p className="text-gray-600">Connect with like-minded professionals and build lasting relationships within our alumni network.</p>
            </div>

            <div className="bg-yellow-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Curriculum</h3>
              <p className="text-gray-600">Up-to-date programs that cover both foundational principles and cutting-edge developments.</p>
            </div>

            <div className="bg-red-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certification & Recognition</h3>
              <p className="text-gray-600">Receive industry-recognized certificates that enhance your professional credentials.</p>
            </div>

            <div className="bg-indigo-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Career Support</h3>
              <p className="text-gray-600">Ongoing mentorship and career guidance to help you achieve your professional goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stay Connected</h2>
          <p className="text-xl text-gray-600 mb-8">Follow us for program updates and industry insights</p>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
              <span className="sr-only">Facebook</span>
              <span className="text-xl">f</span>
            </a>
            <a href="#" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
              <span className="sr-only">Twitter</span>
              <span className="text-xl">t</span>
            </a>
            <a href="#" className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <span className="text-xl">in</span>
            </a>
            <a href="#" className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
              <span className="sr-only">Instagram</span>
              <span className="text-xl">ig</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programmes;
