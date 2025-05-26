
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { BookOpen, Users, Trophy, Star } from 'lucide-react';

const Programmes = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Programmes</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Comprehensive training programs designed to unlock your potential and drive transformation
          </p>
        </div>
      </section>

      {/* Program Overview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Program Overview</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our programs are meticulously crafted to bridge the gap between academic knowledge and real-world application. 
            Whether you're looking to enhance your leadership capabilities or dive deep into technology, our expert-led 
            curricula provide the practical skills and strategic thinking needed to excel in today's dynamic landscape.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Leadership Academy */}
            <div id="leadership" className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full px-6 py-2 text-sm font-semibold text-purple-700 mb-6">
                  <Trophy className="w-4 h-4 mr-2" />
                  Leadership Academy
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Leadership Academy</h2>
              </div>

              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop" 
                alt="Leadership training" 
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />

              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Develop visionary leadership skills that drive transformation across Africa's diverse sectors and communities. 
                  Our Leadership Academy prepares you to lead with confidence, integrity, and impact.
                </p>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Core Tracks</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'Strategic Leadership & Vision Development',
                      'Public Speaking & Communication Excellence',
                      'Project Management & Team Leadership',
                      'Innovation & Entrepreneurship',
                      'Emotional Intelligence & Decision Making',
                      'Change Management & Organizational Development'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <Star className="w-4 h-4 text-purple-600 mr-3" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="text-2xl font-bold text-purple-600">12 Weeks</div>
                    <div className="text-sm text-gray-600">Program Duration</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="text-2xl font-bold text-purple-600">Certificate</div>
                    <div className="text-sm text-gray-600">Upon Completion</div>
                  </div>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl">
                  <Link to="/apply/leadership">Apply for Leadership Academy</Link>
                </Button>
              </div>
            </div>

            {/* Tech Academy */}
            <div id="tech" className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-2 text-sm font-semibold text-emerald-700 mb-6">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Tech Academy
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Tech Academy</h2>
              </div>

              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=300&fit=crop" 
                alt="Tech training" 
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />

              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Master cutting-edge technologies and digital innovation skills for the modern tech ecosystem. 
                  Our Tech Academy equips you with practical, in-demand skills for the digital future.
                </p>

                <div className="bg-emerald-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Core Tracks</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'Frontend Web Development (React, HTML, CSS)',
                      'Mobile App Development & UI/UX Design',
                      'Data Science & Analytics',
                      'Digital Marketing & Social Media Management',
                      'Cybersecurity Fundamentals',
                      'Cloud Computing & DevOps'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <Star className="w-4 h-4 text-emerald-600 mr-3" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="text-2xl font-bold text-emerald-600">16 Weeks</div>
                    <div className="text-sm text-gray-600">Program Duration</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <div className="text-2xl font-bold text-emerald-600">₦10,000</div>
                    <div className="text-sm text-gray-600">Training Fee</div>
                  </div>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl">
                  <Link to="/apply/tech">Apply for Tech Academy</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Programs?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive benefits that set our graduates apart
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Mentorship",
                description: "Learn from industry professionals with years of real-world experience"
              },
              {
                icon: BookOpen,
                title: "Practical Projects",
                description: "Work on real-world projects that build your portfolio and skills"
              },
              {
                icon: Trophy,
                title: "Career Support",
                description: "Access to job opportunities and career advancement resources"
              },
              {
                icon: Star,
                title: "Community Network",
                description: "Join a thriving community of alumni and industry professionals"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-sm">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programmes;
