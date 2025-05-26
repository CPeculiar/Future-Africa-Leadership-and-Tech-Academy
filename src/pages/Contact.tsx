
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [volunteerForm, setVolunteerForm] = useState({
    positionType: '',
    skillsets: [],
    mode: '',
    experience: '',
    availability: '',
    duration: '',
    education: '',
    reason: '',
    fullName: '',
    email: '',
    phone: '',
    contactMethod: '',
    howHeard: '',
    availableForInterview: ''
  });

  const skillsetOptions = [
    'Program Management',
    'E-Learning Platforms',
    'Content Creation',
    'Digital Marketing',
    'Social Media Management',
    'Graphics Designing',
    'Video Editing',
    'Photography',
    'Vlog & Blogging',
    'Spoken Words Artist',
    'Event Planning',
    'Community Management',
    'Research and Analysis',
    'Multiple Languages'
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Handle contact form submission
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Volunteer form submitted:', volunteerForm);
    // Handle volunteer form submission
  };

  const handleSkillsetChange = (skillset: string, checked: boolean) => {
    setVolunteerForm(prev => ({
      ...prev,
      skillsets: checked 
        ? [...prev.skillsets, skillset]
        : prev.skillsets.filter(s => s !== skillset)
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Get in touch with us for more information about our programs
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">TLBC Auditorium<br />3 Uche Ekwunife Crescent, Kwata Awka</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">09060121720</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">futureafrica.leadtech@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Google Map Integration</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer/Intern Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Volunteer/Intern with Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our team and contribute to shaping the future of Africa's youth through leadership and technology education
            </p>
          </div>

          <form onSubmit={handleVolunteerSubmit} className="max-w-3xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="positionType">Type of Position *</Label>
                <Select onValueChange={(value) => setVolunteerForm(prev => ({ ...prev, positionType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mode">Mode of Availability *</Label>
                <Select onValueChange={(value) => setVolunteerForm(prev => ({ ...prev, mode: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="virtually">Virtually</SelectItem>
                    <SelectItem value="physically">Physically</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Which of these skillset(s) describes you? *</Label>
              <div className="grid md:grid-cols-2 gap-2 mt-2">
                {skillsetOptions.map((skillset) => (
                  <div key={skillset} className="flex items-center space-x-2">
                    <Checkbox
                      id={skillset}
                      onCheckedChange={(checked) => handleSkillsetChange(skillset, checked as boolean)}
                    />
                    <Label htmlFor={skillset} className="text-sm">{skillset}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Previous Experience *</Label>
              <Textarea
                id="experience"
                placeholder="Briefly describe any relevant volunteering or internship experience"
                value={volunteerForm.experience}
                onChange={(e) => setVolunteerForm(prev => ({ ...prev, experience: e.target.value }))}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="availability">Level of Availability *</Label>
                <Select onValueChange={(value) => setVolunteerForm(prev => ({ ...prev, availability: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once-week">Once a Week</SelectItem>
                    <SelectItem value="weekday">Any Week day</SelectItem>
                    <SelectItem value="weekends">Weekends (Saturdays Only)</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Duration of Availability *</Label>
                <Input
                  id="duration"
                  placeholder="Start Date - End Date"
                  value={volunteerForm.duration}
                  onChange={(e) => setVolunteerForm(prev => ({ ...prev, duration: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="education">Educational Background *</Label>
              <Input
                id="education"
                placeholder="Name of University/Institution, Field of Study and Current Year of Study"
                value={volunteerForm.education}
                onChange={(e) => setVolunteerForm(prev => ({ ...prev, education: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="reason">Why do you want to volunteer/intern with FALATA? *</Label>
              <Textarea
                id="reason"
                value={volunteerForm.reason}
                onChange={(e) => setVolunteerForm(prev => ({ ...prev, reason: e.target.value }))}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Your Full Name *</Label>
                <Input
                  id="fullName"
                  value={volunteerForm.fullName}
                  onChange={(e) => setVolunteerForm(prev => ({ ...prev, fullName: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="volunteerEmail">Email Address *</Label>
                <Input
                  id="volunteerEmail"
                  type="email"
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">WhatsApp/Telegram No *</Label>
                <Input
                  id="phone"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contactMethod">How best can we reach you? *</Label>
                <Select onValueChange={(value) => setVolunteerForm(prev => ({ ...prev, contactMethod: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="telegram">Telegram</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="howHeard">How did you hear about this? *</Label>
                <Input
                  id="howHeard"
                  value={volunteerForm.howHeard}
                  onChange={(e) => setVolunteerForm(prev => ({ ...prev, howHeard: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="interview">Available for interview if required? *</Label>
                <Select onValueChange={(value) => setVolunteerForm(prev => ({ ...prev, availableForInterview: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Submit Application
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
