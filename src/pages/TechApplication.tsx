import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { submitTechApplication } from "../services/firestore";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../services/firebaseConfig";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const TechApplication = () => {
  const [formData, setFormData] = useState({
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
    programmingExperience: '',
    techInterests: '',
    motivationLetter: '',
    projectExperience: '',
    careerGoals: '',
    availableTime: '',
    computerAccess: '',
    internetConnection: '',
    emergencyContact: '',
    paymentOption: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     setFormErrors({});
    setIsSubmitting(true);
    
    try {
      console.log('Tech application submitting:', formData);
      const applicationId = await submitTechApplication(formData);
      setShowSuccessModal(true);
      // alert('Application submitted successfully!');
      setFormData({
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
        programmingExperience: '',
        techInterests: '',
        motivationLetter: '',
        projectExperience: '',
        careerGoals: '',
        availableTime: '',
        computerAccess: '',
        internetConnection: '',
        emergencyContact: '',
        paymentOption: ''
        });
    } catch (error) {
      console.error('Error submitting application:', error);
      setFormErrors({ form: `Registration failed: ${error.message}` });
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Tech Academy Application</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Join our June 2025 cohort and start your tech career journey
          </p>
          <div className="mt-8 bg-orange-500 text-white px-6 py-4 rounded-lg inline-block">
            <p className="text-lg font-bold">Training Fee: ₦10,000</p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
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
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
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
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
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
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <Label htmlFor="currentAddress">Current Address <span className='text-red-600 font-bold'>*</span></Label>
                <Textarea
                  id="currentAddress"
                  value={formData.currentAddress}
                  onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Educational Background */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Educational Background</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="educationLevel">Current Education Level <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('educationLevel', value)}>
                    <SelectTrigger>
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
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="institution">Institution <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Technical Background */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Background</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="programmingExperience">Programming Experience Level <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('programmingExperience', value)}>
                    <SelectTrigger>
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
                  <Textarea
                    id="techInterests"
                    placeholder="e.g., Web Development, Mobile Apps, Data Science, AI/ML, etc."
                    value={formData.techInterests}
                    onChange={(e) => handleInputChange('techInterests', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectExperience">Previous Projects (if any)</Label>
                  <Textarea
                    id="projectExperience"
                    placeholder="Describe any tech projects you've worked on"
                    value={formData.projectExperience}
                    onChange={(e) => handleInputChange('projectExperience', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Motivation & Goals */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Motivation & Goals</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="motivationLetter">Why do you want to join our Tech Academy? <span className='text-red-600 font-bold'>*</span></Label>
                  <Textarea
                    id="motivationLetter"
                    value={formData.motivationLetter}
                    onChange={(e) => handleInputChange('motivationLetter', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="careerGoals">What are your tech career goals? <span className='text-red-600 font-bold'>*</span></Label>
                  <Textarea
                    id="careerGoals"
                    value={formData.careerGoals}
                    onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="availableTime">How many hours per week can you dedicate to learning? <span className='text-red-600 font-bold'>*</span></Label>
                  <Select onValueChange={(value) => handleInputChange('availableTime', value)}>
                    <SelectTrigger>
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
              </div>
            </div>

            {/* Technical Requirements */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Requirements</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="computerAccess">Do you have access to a computer? <span className='text-red-600 font-bold'>*</span></Label>
                  <RadioGroup onValueChange={(value) => handleInputChange('computerAccess', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('internetConnection', value)}>
                    <SelectTrigger>
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

            {/* Emergency Contact */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contact</h3>
              
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact (Name, Relationship, Phone) *</Label>
                <Textarea
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Payment Option */}
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Option</h3>
              
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-800 mb-2">Training Fee: ₦10,000</p>
                <p className="text-gray-600 mb-4">Choose your preferred payment option:</p>
              </div>
              
              <RadioGroup onValueChange={(value) => handleInputChange('paymentOption', value)}>
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
                className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </section>

       {showSuccessModal && (
          <SuccessModal onClose={() => {
          setShowSuccessModal(false);
           }} />
        )}

    </div>
  );
};

  // SuccessModal Component (same as before)
  const SuccessModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-green-500 p-4">
      <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Form Successfully Submitted</h2>
        <p>We will contact you shortly via email. Thank you!</p>
        <button 
          onClick={onClose} 
          className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );

export default TechApplication;
