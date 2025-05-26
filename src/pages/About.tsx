
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const About = () => {
  const team = [
    {
      name: "Dr. Amara Okafor",
      position: "Executive Director",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop"
    },
    {
      name: "Prof. Chidi Eze",
      position: "Academic Director",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop"
    },
    {
      name: "Fatima Abdullahi",
      position: "Program Manager",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop"
    },
    {
      name: "Kemi Adebayo",
      position: "Tech Lead",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop"
    },
    {
      name: "Samuel Nwosu",
      position: "Leadership Coordinator",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop"
    },
    {
      name: "Aisha Mohammed",
      position: "Student Affairs Manager",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About FALATA</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Empowering Africa's next generation of leaders and tech innovators through excellence in education
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6">
                Future Africa Leadership and Tech Academy (FALATA) is a premier educational institution dedicated to developing the next generation of African leaders and technology innovators. Founded with the vision of transforming Africa through quality education and practical skills development.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe that Africa's future lies in the hands of well-trained, visionary leaders who understand both traditional leadership principles and modern technological advancement. Our programs are designed to bridge this gap and create well-rounded professionals.
              </p>
              <Button asChild size="lg">
                <Link to="/programmes">Explore Our Programmes</Link>
              </Button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop" 
                alt="Students learning" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg">
                To be Africa's leading academy that produces world-class leaders and tech innovators who will drive sustainable development and transformation across the continent.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg">
                To provide comprehensive, practical, and innovative training programs that develop leadership capabilities and technological expertise among African youth and professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Objectives</h2>
            <p className="text-xl text-gray-600">Driving excellence through focused goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Leadership Development</h3>
              <p className="text-gray-600">Cultivate strategic thinking and management skills</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tech Innovation</h3>
              <p className="text-gray-600">Foster technological expertise and digital literacy</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Practical Skills</h3>
              <p className="text-gray-600">Provide hands-on training and real-world experience</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Network Building</h3>
              <p className="text-gray-600">Create connections among African professionals</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">5</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainable Impact</h3>
              <p className="text-gray-600">Drive long-term positive change in communities</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">6</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence Culture</h3>
              <p className="text-gray-600">Promote high standards and continuous improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose FALATA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose FALATA?</h2>
            <p className="text-xl text-gray-600">Excellence in every aspect of education and training</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Faculty</h3>
              <p className="text-gray-600">Learn from industry professionals and academic experts</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Modern Curriculum</h3>
              <p className="text-gray-600">Up-to-date programs that meet current industry needs</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Networking</h3>
              <p className="text-gray-600">Connect with like-minded professionals and leaders</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Career Growth</h3>
              <p className="text-gray-600">Accelerate your career with practical skills and knowledge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stay Connected</h2>
          <p className="text-xl text-gray-600 mb-8">Follow us on social media for updates and insights</p>
          
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

export default About;
