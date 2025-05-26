
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Users } from 'lucide-react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Leadership Development Summit",
      date: "June 2025",
      venue: "TLBC Auditorium",
      address: "3 Uche Ekwunife Crescent, Kwata Awka",
      type: "Physical Event",
      description: "Join us for an intensive leadership development summit featuring industry experts and networking opportunities.",
      hasApplication: true,
      applicationType: "leadership"
    },
    {
      id: 2,
      title: "Cohort 1 Training",
      date: "June 2025",
      venue: "Online Training",
      address: "Virtual Platform",
      type: "Online Event",
      description: "Our flagship tech training program starts with comprehensive courses in modern technologies.",
      hasApplication: true,
      applicationType: "tech"
    },
    {
      id: 3,
      title: "Tech Fest 2025",
      date: "August 2025",
      venue: "Venue to be announced",
      address: "TBA",
      type: "Physical Event",
      description: "A celebration of technology and innovation featuring demos, competitions, and networking.",
      hasApplication: true,
      applicationType: "tech"
    }
  ];

  const whyChooseFalata = [
    {
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience."
    },
    {
      title: "Practical Training",
      description: "Hands-on projects and real-world applications of theoretical concepts."
    },
    {
      title: "Community Support",
      description: "Join a supportive community of like-minded individuals and mentors."
    },
    {
      title: "Career Opportunities",
      description: "Access to job opportunities and career advancement resources."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Upcoming Events</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Join us for exciting events, workshops, and training programs designed to shape the future of Africa
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{event.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                      <span>{event.venue} - {event.address}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    {event.hasApplication && (
                      <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                        <Link to={event.applicationType === 'leadership' ? '/apply/leadership' : '/apply/tech'}>
                          Apply Now
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="outline">
                      <Link to={`/events/${event.id}`}>
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose FALATA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FALATA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing world-class education and training that prepares you for the future
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFalata.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
