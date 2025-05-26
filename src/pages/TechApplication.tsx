
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { submitTechApplication } from "../services/firestore";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle } from 'lucide-react';

const TechApplication = () => {
  const initialFormData = {
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    currentAddress: '',
    educationLevel: '',
    fieldOfStudy: '',
    institution: '',
    computerLiteracy: '',
    techInterests: '',
    motivationLetter: '',
    careerGoals: '',
    availableTime: '',
    computerAccess: '',
    internetConnection: '',
    hearAbout: '',
    paymentOption: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData(initialFormData);
    // Force clear all form elements
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
    // Clear select elements
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      select.value = '';
    });
    // Clear radio groups
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      (radio as HTMLInputElement).checked = false;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Always submit to Firebase first
      console.log('Tech application submitting:', formData);
      await submitTechApplication(formData);
      
      if (formData.paymentOption === 'pay-now') {
        // For pay now, redirect to payment without showing success modal
        const paymentData = {
          customer_name: formData.fullName,
          customer_email: formData.email,
          customer_phone: formData.phone,
          amount: 10000,
          currency: 'NGN',
          payment_description: 'FALATA Tech Academy Registration Fee'
        };
        
        // Store in sessionStorage for payment page
        sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
        navigate('/payment');
      } else {
        // For pay later, show success modal and clear form
        setShowSuccessModal(true);
        clearForm();
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Tech Academy Application</h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-6 sm:mb-8">
            Join our June 2025 cohort and start your tech career journey
          </p>
          <div className="bg-orange-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg inline-block">
            <p className="text-base sm:text-lg font-bold">Training Fee: ₦10,000</p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Personal Information */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('gender', value)} value={formData.gender}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="nationality">Nationality <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6">
                <Label htmlFor="currentAddress">Current Address <span className='text-red-600 font-bold'>*</span></Label>
                <Textarea
                  id="currentAddress"
                  value={formData.currentAddress}
                  onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            {/* Educational Background */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Educational Background</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="educationLevel">Current Education Level <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('educationLevel', value)} value={formData.educationLevel}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="secondary">Secondary School</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="fieldOfStudy">Field of Study <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="institution">Institution <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Technical Background */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Technical Background</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="computerLiteracy">Computer Literacy Level <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('computerLiteracy', value)} value={formData.computerLiteracy}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (No prior experience)</SelectItem>
                      <SelectItem value="basic">Basic (Some exposure)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (Can write simple programs)</SelectItem>
                      <SelectItem value="advanced">Advanced (Experienced programmer)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="techInterests">Areas of Tech Interest <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('techInterests', value)} value={formData.techInterests}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select Learning Track" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic computer course">Basic computer course</SelectItem>
                      <SelectItem value="Graphics Designing">Graphics Designing</SelectItem>
                      <SelectItem value="Microsoft Office Applications">Microsoft Office Applications</SelectItem>
                      <SelectItem value="Virtual Assistant">Virtual Assistant</SelectItem>
                      <SelectItem value="Customer Support">Customer Support</SelectItem>
                      <SelectItem value="Video Editing">Mobile Video Editing</SelectItem>
                      <SelectItem value="Social media management">Social media management</SelectItem>
                      <SelectItem value="Printing and Branding">Printing and Branding</SelectItem>
                      <SelectItem value="Frontend Web Development">Frontend Web Development</SelectItem>
                      <SelectItem value="Cyber security">Cyber security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Motivation & Goals */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Motivation & Goals</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="motivationLetter">Why do you want to join our Tech Academy? <span className='text-red-600 font-bold'>*</span></Label>
                  <Textarea
                    id="motivationLetter"
                    value={formData.motivationLetter}
                    onChange={(e) => handleInputChange('motivationLetter', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="careerGoals">What are your tech career goals? <span className='text-red-600 font-bold'>*</span></Label>
                  <Textarea
                    id="careerGoals"
                    value={formData.careerGoals}
                    onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="availableTime">How many hours per week can you dedicate to learning? <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('availableTime', value)} value={formData.availableTime}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select time commitment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-10">5-10 hours</SelectItem>
                      <SelectItem value="10-15">10-15 hours</SelectItem>
                      <SelectItem value="15-20">15-20 hours</SelectItem>
                      <SelectItem value="20+">20+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="hearAbout">How did you hear about this program? <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('hearAbout', value)} value={formData.hearAbout}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="friend-family">Friend/Family</SelectItem>
                      <SelectItem value="church">Church</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="flyer">Flyer/Poster</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Technical Requirements */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Technical Requirements</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="computerAccess">Do you have access to a computer? <span className='text-red-600 font-bold'>*</span></Label>
                  <RadioGroup 
                    onValueChange={(value) => handleInputChange('computerAccess', value)} 
                    value={formData.computerAccess}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes-own" id="yes-own" />
                      <Label htmlFor="yes-own">Yes, I own a computer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes-shared" id="yes-shared" />
                      <Label htmlFor="yes-shared">Yes, shared access</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">No, but can arrange access</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="internetConnection">Internet Connection Quality <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('internetConnection', value)} value={formData.internetConnection}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select connection quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (Fast and reliable)</SelectItem>
                      <SelectItem value="good">Good (Usually stable)</SelectItem>
                      <SelectItem value="fair">Fair (Sometimes unstable)</SelectItem>
                      <SelectItem value="poor">Poor (Limited access)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Payment Option */}
            <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg border border-yellow-200">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Payment Option</h3>
              
              <div className="mb-4">
                <p className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Training Fee: ₦10,000</p>
                <p className="text-gray-600 mb-4">Choose your preferred payment option:</p>
              </div>
              
              <RadioGroup 
                onValueChange={(value) => handleInputChange('paymentOption', value)} 
                value={formData.paymentOption}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pay-now" id="pay-now" />
                  <Label htmlFor="pay-now" className="font-medium">Pay Now (Secure your spot immediately)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pay-later" id="pay-later" />
                  <Label htmlFor="pay-later" className="font-medium">Pay Later (Payment required before program starts)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {showSuccessModal && (
        <SuccessModal onClose={handleSuccessModalClose} />
      )}
    </div>
  );
};

const SuccessModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 mb-6">
          <CheckCircle className="w-8 h-8 text-purple-600" />
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Application Submitted Successfully!
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
          Thank you for applying to our Tech Academy. We have received your application and will review it shortly. You will receive a confirmation email with next steps.
        </p>
        
        <Button 
          onClick={onClose} 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Close
        </Button>
      </div>
    </div>
  </div>
);

export default TechApplication;
