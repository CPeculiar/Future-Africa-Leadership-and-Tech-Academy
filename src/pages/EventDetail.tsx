import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import StayConnected from '@/components/StayConnected';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  
  const events = {
    "1": {
      title: "Leadership Development Summit",
      date: "June 2025",
      time: "9:00 AM - 5:00 PM",
      venue: "TLBC Auditorium",
      address: "3 Uche Ekwunife Crescent, Kwata Awka",
      type: "Physical Event",
      capacity: "200 participants",
      description: "Join us for an intensive leadership development summit featuring industry experts and networking opportunities.",
      fullDescription: "Our Leadership Development Summit is a comprehensive day-long event designed to equip emerging and established leaders with the tools, strategies, and insights needed to excel in today's dynamic environment. The summit features keynote speakers, interactive workshops, panel discussions, and extensive networking opportunities.",
      agenda: [
        "9:00 AM - Registration & Welcome Coffee",
        "10:00 AM - Opening Keynote: The Future of Leadership in Africa",
        "11:30 AM - Workshop: Strategic Thinking and Decision Making",
        "1:00 PM - Networking Lunch",
        "2:00 PM - Panel Discussion: Leadership in the Digital Age",
        "3:30 PM - Workshop: Building High-Performance Teams",
        "5:00 PM - Closing Remarks & Certificates"
      ],
      applicationType: "leadership"
    },
    "2": {
      title: "Cohort 1 Training",
      date: "June 2025",
      time: "Online - Flexible Schedule",
      venue: "Virtual Platform",
      address: "Online via Zoom & Learning Management System",
      type: "Online Event",
      capacity: "100 participants",
      description: "Our flagship tech training program starts with comprehensive courses in modern technologies.",
      fullDescription: "The Tech Academy Cohort 1 Training is an intensive 16-week program designed to transform beginners into job-ready tech professionals. Our comprehensive curriculum covers multiple tech tracks with hands-on projects and mentorship.",
      agenda: [
        "Week 1-2: Foundation & Computer Literacy",
        "Week 3-6: Core Technical Skills",
        "Week 7-10: Specialized Track Training",
        "Week 11-14: Project Development",
        "Week 15-16: Portfolio Building & Job Preparation"
      ],
      applicationType: "tech"
    },
    "3": {
      title: "Tech Fest 2025",
      date: "August 2025",
      time: "10:00 AM - 6:00 PM",
      venue: "Venue to be announced",
      address: "TBA",
      type: "Physical Event",
      capacity: "500 participants",
      description: "A celebration of technology and innovation featuring demos, competitions, and networking.",
      fullDescription: "Tech Fest 2025 is our annual celebration of technology, innovation, and the achievements of our tech community. The event features startup demos, coding competitions, tech exhibitions, and networking sessions with industry leaders.",
      agenda: [
        "10:00 AM - Registration & Exhibition Setup",
        "11:00 AM - Opening Ceremony",
        "12:00 PM - Startup Demo Presentations",
        "2:00 PM - Coding Competition",
        "4:00 PM - Tech Innovation Showcase",
        "5:00 PM - Awards Ceremony",
        "6:00 PM - Networking Reception"
      ],
      applicationType: "tech"
    }
  };

  const event = events[id as keyof typeof events];

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link to="/events" className="text-purple-600 hover:text-purple-700">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              {event.type}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{event.title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">{event.description}</p>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                <p className="text-gray-600 leading-relaxed">{event.fullDescription}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Agenda</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    {event.agenda.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Clock className="w-5 h-5 text-purple-600 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-purple-600 mt-1 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">{event.date}</div>
                      <div className="text-sm text-gray-600">{event.time}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-purple-600 mt-1 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">{event.venue}</div>
                      <div className="text-sm text-gray-600">{event.address}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-purple-600 mt-1 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Capacity</div>
                      <div className="text-sm text-gray-600">{event.capacity}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  <Link to={event.applicationType === 'leadership' ? '/apply/leadership' : '/apply/tech'}>
                    Apply Now
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/events">
                    Back to Events
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StayConnected />
      <Footer />
    </div>
  );
};

export default EventDetail;
