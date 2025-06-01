
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { submitTechApplication } from "../services/firestore";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, CreditCard, Phone, Mail } from 'lucide-react';

const TechApplication = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    nationality: '',
    educationLevel: '',
    institution: '',
    computerLiteracy: '',
    techInterests: '',
    motivationLetter: '',
    careerGoals: '',
    computerAccess: '',
    hearAbout: '',
    paymentOption: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
   const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check for Nigerian phone number patterns
    // Nigerian numbers: 11 digits starting with 0, or 10 digits without leading 0
    // International: 13-14 digits starting with 234
    if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) {
      return true; // Nigerian format: 08012345678
    }
    if (cleanPhone.length === 10 && !cleanPhone.startsWith('0')) {
      return true; // Nigerian format without leading 0: 8012345678
    }
    if (cleanPhone.length >= 13 && cleanPhone.length <= 14 && cleanPhone.startsWith('234')) {
      return true; // International format: 2348012345678
    }
    
    // General international format (10-15 digits)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  };

  const validateName = (name: string): boolean => {
    // Only letters, spaces, hyphens, and apostrophes allowed
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    return nameRegex.test(name) && name.trim().length >= 2;
  };

  const validateTextArea = (text: string, minLength: number = 10): boolean => {
    return text.trim().length >= minLength;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = 'Please enter a valid first name (letters only, minimum 2 characters)';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Please enter a valid last name (letters only, minimum 2 characters)';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., example@domain.com)';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (e.g., 08012345678 or +2348012345678)';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    // Nationality validation
    if (!formData.nationality.trim()) {
      newErrors.nationality = 'Nationality is required';
    } else if (!validateName(formData.nationality)) {
      newErrors.nationality = 'Please enter a valid nationality (letters only)';
    }

    // Education Level validation
    if (!formData.educationLevel) {
      newErrors.educationLevel = 'Please select your education level';
    }

    // Institution validation
    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution name is required';
    } else if (formData.institution.trim().length < 2) {
      newErrors.institution = 'Please enter a valid institution name (minimum 2 characters)';
    }

    // Computer Literacy validation
    if (!formData.computerLiteracy) {
      newErrors.computerLiteracy = 'Please select your computer literacy level';
    }

    // Tech Interests validation
    if (!formData.techInterests) {
      newErrors.techInterests = 'Please select your course of choice';
    }

    // Motivation Letter validation
    if (!formData.motivationLetter.trim()) {
      newErrors.motivationLetter = 'This field is required';
    } else if (!validateTextArea(formData.motivationLetter, 20)) {
      newErrors.motivationLetter = 'Please provide a more detailed response (minimum 20 characters)';
    }

    // Career Goals validation
    if (!formData.careerGoals.trim()) {
      newErrors.careerGoals = 'This field is required';
    } else if (!validateTextArea(formData.careerGoals, 20)) {
      newErrors.careerGoals = 'Please provide a more detailed response (minimum 20 characters)';
    }

    // Computer Access validation
    if (!formData.computerAccess) {
      newErrors.computerAccess = 'Please select your computer access status';
    }

    // Hear About validation
    if (!formData.hearAbout) {
      newErrors.hearAbout = 'Please select how you heard about this program';
    }

    // Payment Option validation
    if (!formData.paymentOption) {
      newErrors.paymentOption = 'Please select a payment option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
     if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      
       const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.getElementById(firstError);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }
    setIsSubmitting(true);
    
    try {
      // Always submit to Firebase first
      console.log('Tech application submitting:', formData);
      await submitTechApplication(formData);
      
      if (formData.paymentOption === 'pay-now') {
        // For pay now, redirect to payment page without showing success modal
        const paymentData = {
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          customer_phone: formData.phone,
          amount: 100,
          currency: 'NGN',
          payment_description: 'FALATA Tech Academy June 2025 Cohort 1 Registration Fee'
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

   const getFieldError = (field: string) => {
    return errors[field];
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
                  <Label htmlFor="firstName">First Name <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className={`mt-1 ${getFieldError('firstName') ? 'border-red-500' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {getFieldError('firstName') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('firstName')}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className={`mt-1 ${getFieldError('lastName') ? 'border-red-500' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {getFieldError('lastName') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('lastName')}</p>
                  )}
                </div>
                
                <div>
                   <Label htmlFor="email">Email Address <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                     className={`mt-1 ${getFieldError('email') ? 'border-red-500' : ''}`}
                    placeholder="example@domain.com"
                  />
                  {getFieldError('email') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('email')}</p>
                  )}
                </div>
                
                 <div className="relative">
                   <Label htmlFor="phone">Phone Number <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className={`mt-1 ${getFieldError('phone') ? 'border-red-500' : ''}`}
                    placeholder="Enter your phone number"
                  />
                  {getFieldError('phone') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('phone')}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('gender', value)} value={formData.gender} required>
                    <SelectTrigger className={`mt-1 ${getFieldError('gender') ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                {getFieldError('gender') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('gender')}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="nationality">Nationality <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    required
                    className={`mt-1 ${getFieldError('nationality') ? 'border-red-500' : ''}`}
                    placeholder="e.g., Nigerian"
                  />
                  {getFieldError('nationality') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('nationality')}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Educational Background */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Educational Background</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="educationLevel">Current Education Level <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('educationLevel', value)} value={formData.educationLevel} required>
                    <SelectTrigger className={`mt-1 ${getFieldError('educationLevel') ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="secondary">Secondary School</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                   {getFieldError('educationLevel') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('educationLevel')}</p>
                  )}
                </div>
                
                <div >
                  <Label htmlFor="institution">Institution attended <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    required
                     className={`mt-1 ${getFieldError('institution') ? 'border-red-500' : ''}`}
                    placeholder="Name of institution"
                  />
                  {getFieldError('institution') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('institution')}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Technical Background */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Technical Background</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="computerLiteracy">Computer Literacy Level <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('computerLiteracy', value)} value={formData.computerLiteracy} required>
                     <SelectTrigger className={`mt-1 ${getFieldError('computerLiteracy') ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (No prior experience)</SelectItem>
                      <SelectItem value="basic">Basic (Some basic exposure)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (Can handle computer operations)</SelectItem>
                      <SelectItem value="advanced">Advanced (Advanced experience in the use of computers)</SelectItem>
                    </SelectContent>
                  </Select>
                  {getFieldError('computerLiteracy') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('computerLiteracy')}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="techInterests">Your Course of choice <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('techInterests', value)} value={formData.techInterests} required>
                     <SelectTrigger className={`mt-1 ${getFieldError('techInterests') ? 'border-red-500' : ''}`}>
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
                   {getFieldError('techInterests') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('techInterests')}</p>
                  )}
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
                   className={`mt-1 ${getFieldError('motivationLetter') ? 'border-red-500' : ''}`}
                    placeholder="Please provide a detailed explanation of your motivation..."
                    rows={3}
                  />
                  {getFieldError('motivationLetter') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('motivationLetter')}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="careerGoals">What are your tech career goals? <span className='text-red-600 font-bold'>*</span></Label>
                  <Textarea
                    id="careerGoals"
                    value={formData.careerGoals}
                    onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                    required
                   className={`mt-1 ${getFieldError('careerGoals') ? 'border-red-500' : ''}`}
                    placeholder="Describe your career aspirations and goals..."
                    rows={3}
                  />
                  {getFieldError('careerGoals') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('careerGoals')}</p>
                  )}
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
                    required
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
                   {getFieldError('computerAccess') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('computerAccess')}</p>
                  )}
                </div>
                
              <div>
                  <Label htmlFor="hearAbout">How did you hear about this program? <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('hearAbout', value)} value={formData.hearAbout} required>
                    <SelectTrigger className={`mt-1 ${getFieldError('hearAbout') ? 'border-red-500' : ''}`}>
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
                   {getFieldError('hearAbout') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('hearAbout')}</p>
                  )}
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
              {getFieldError('paymentOption') && (
                <p className="text-red-500 text-sm mt-1">{getFieldError('paymentOption')}</p>
              )}
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
        <PayLaterSuccessModal onClose={handleSuccessModalClose} />
      )}
    </div>
  );
};


const PayLaterSuccessModal = ({ onClose }: { onClose: () => void }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 mb-6">
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h2>
          
          <div className="text-left mb-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-amber-800 mb-2">⚠️ Important Payment Notice</h3>
              <p className="text-amber-700 text-sm">
                Your application has been received, but <strong>payment validates your application</strong>. 
                Please complete payment to secure your spot in the June 2025 cohort.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-800">Account Number:</p>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-lg">0109461972</span>
                    <button 
                      onClick={() => copyToClipboard('0109461972')}
                      className="text-blue-600 hover:text-blue-800 text-xs underline"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-800">Account Name:</p>
                  <div className="flex justify-between items-center">
                    <span>TLBC Partnership</span>
                    <button 
                      onClick={() => copyToClipboard('TLBC Partnership')}
                      className="text-blue-600 hover:text-blue-800 text-xs underline"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-800">Bank:</p>
                  <span>ACCESS Bank</span>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-800">Amount:</p>
                  <span className="font-semibold text-green-600">₦10,000</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-bold text-green-800 mb-3">📧 Send Payment Proof</h3>
              <p className="text-green-700 text-sm mb-3">
                After making payment, send your receipt/proof of payment to:
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-green-600" />
                    <span>WhatsApp: 09060121720</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard('09060121720')}
                    className="text-blue-600 hover:text-blue-800 text-xs underline"
                  >
                    Copy
                  </button>
                </div>
                
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-green-600" />
                    <span>Email: futureafrica.leadtech@gmail.com</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard('futureafrica.leadtech@gmail.com')}
                    className="text-blue-600 hover:text-blue-800 text-xs underline"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-600 text-sm">
              We'll confirm your payment and send you further details about the program. Thank you
            </p>
            
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
               Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};




// const SuccessModal = ({ onClose }: { onClose: () => void }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in">
//       <div className="text-center">
//         <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 mb-6">
//           <CheckCircle className="w-8 h-8 text-purple-600" />
//         </div>
        
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
//           Application Submitted Successfully!
//         </h2>
        
//         <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
//           Thank you for applying to our Tech Academy. We have received your application and will review it shortly. You will receive a confirmation email with next steps.
//         </p>
        
//         <Button 
//           onClick={onClose} 
//           className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
//         >
//           Close
//         </Button>
//       </div>
//     </div>
//   </div>
// );

export default TechApplication;
