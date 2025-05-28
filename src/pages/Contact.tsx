
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { submitContactForm } from "../services/firestore";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Footer from '@/components/Footer';
import StayConnected from '@/components/StayConnected';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Contact Form submitted:', formData);
      await submitContactForm(formData);

      alert('Thank you for your message! We will get back to you soon.');
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      console.log('Contact form submitted successfully');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error submitting contact form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 animate-fade-in">Contact Us</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto animate-fade-in">
            Get in touch with us to learn more about our programs and how we can help you achieve your goals
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Form - Show first on mobile */}
            <div className="order-1 lg:order-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 animate-fade-in">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 animate-scale-in">
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <Label htmlFor="name" className="text-sm sm:text-base">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <Label htmlFor="email" className="text-sm sm:text-base">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <Label htmlFor="subject" className="text-sm sm:text-base">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    required
                    className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <Label htmlFor="message" className="text-sm sm:text-base">Message *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                    className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 transform"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information - Show second on mobile */}
            <div className="order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 animate-fade-in">Get in Touch</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start transform transition-all duration-300 hover:translate-x-2 hover:bg-purple-50 p-3 rounded-lg">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mt-1 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Our Location</h3>
                    <p className="text-gray-600 text-sm sm:text-base">3 Uche Ekwunife Crescent<br />Kwata Awka, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-start transform transition-all duration-300 hover:translate-x-2 hover:bg-purple-50 p-3 rounded-lg">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mt-1 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Phone</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      <a 
                        href="tel:+2349060121720" 
                        className="hover:text-purple-600 transition-colors duration-300"
                      >
                        09060121720
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start transform transition-all duration-300 hover:translate-x-2 hover:bg-purple-50 p-3 rounded-lg">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mt-1 mr-3 sm:mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h3>
                    <p className="text-gray-600 text-sm sm:text-base break-all">
                      <a 
                        href="mailto:futureafrica.leadtech@gmail.com" 
                        className="hover:text-purple-600 transition-colors duration-300"
                      >
                        futureafrica.leadtech@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Map with actual coordinates for Awka */}
              <div className="mt-6 sm:mt-8">
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Find Us</h3>
                <div className="bg-gray-100 rounded-lg overflow-hidden h-48 sm:h-56 md:h-64 transform transition-all duration-300 hover:scale-[1.02]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.3274!2d7.0733!3d6.2103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104387e67c6fb6c5%3A0xfbf1a1d1d8fbe8c7!2sAwka%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="FALATA Location - Awka, Nigeria"
                  ></iframe>
                </div>
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

export default Contact;
