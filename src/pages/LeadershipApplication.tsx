
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { submitFormApplication } from "../services/firestore";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle } from 'lucide-react';

const LeadershipApplication = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    nationality: '',
    church: '',
    zone: '',
    department: '',
    office: '',
    occupation: '',
    organization: '',
    educationLevel: '',
    institution: '',
    leadershipExperience: '',
    expectations: '',
    hearAbout: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  // Church list with only names
  const churchList = [
    "TLBC Awka", "TLBC Ekwulobia", "TLBC Ihiala",
    "TLBC Nnewi", "TLBC Onitsha", "TLBC Mbaukwu",
    "TLBCM Agulu", "TLBCM COOU Igbariam", "TLBCM COOU Uli",
    "TLBCM FUTO", "TLBCM IMSU", "TLBCM Mgbakwu",
    "TLBCM NAU", "TLBCM Nekede", "TLBCM Oko",
    "TLBCM Okofia", "TLBCM UNILAG", "TLTN Agulu",
    "TLTN Awka", "Others"
  ];

  // Zones list with only names
  const zoneList = [
    "Awka zone",
    "Ekwulobia zone", 
    "Nnewi zone",
    "Owerri zone",
    "Onitsha zone",
    "Others"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Leadership application submitted:', formData);
      await submitFormApplication(formData);
      setShowSuccessModal(true);
      
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        nationality: '',
        church: '',
        zone: '',
        department: '',
        office: '',
        occupation: '',
        organization: '',
        educationLevel: '',
        institution: '',
        leadershipExperience: '',
        expectations: '',
        hearAbout: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Leadership Academy Application</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Join our June 2025 cohort and develop your leadership potential
          </p>
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
                  <Label htmlFor="firstName">First Name <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                  <Label htmlFor="gender">Gender <span className='text-red-600 font-bold'>*</span></Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
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
                
                  <div>
                  <Label htmlFor="educationLevel">Highest Education Level <span className='text-red-600 font-bold'>*</span></Label>
                  <Select value={formData.educationLevel} onValueChange={(value) => handleInputChange('educationLevel', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="secondary">Secondary School</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="undergraduate">Undegraduate</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="institution">Institution attended <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Church Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Church Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="church">Church <span className='text-red-600 font-bold'>*</span></Label>
                  <Select value={formData.church} onValueChange={(value) => handleInputChange('church', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Church" />
                    </SelectTrigger>
                    <SelectContent>
                      {churchList.map((church) => (
                        <SelectItem key={church} value={church}>
                          {church}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="zone">Zone <span className='text-red-600 font-bold'>*</span></Label>
                  <Select value={formData.zone} onValueChange={(value) => handleInputChange('zone', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {zoneList.map((zone) => (
                        <SelectItem key={zone} value={zone}>
                          {zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <Label htmlFor="department">Church Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="office">Current Office(s)</Label>
                  <Input
                    id="office"
                    value={formData.office}
                    onChange={(e) => handleInputChange('office', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="occupation">Current Occupation <span className='text-red-600 font-bold'>*</span></Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="organization">Organization/Company</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Leadership Experience */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Leadership & Expectations</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="leadershipExperience">Previous Leadership Experience</Label>
                  <Textarea
                    id="leadershipExperience"
                    placeholder="Describe your leadership roles and experiences"
                    value={formData.leadershipExperience}
                    onChange={(e) => handleInputChange('leadershipExperience', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="expectations">What are your expectations from this program? <span className='text-red-600 font-bold'>*</span></Label>
                  <Textarea
                    id="expectations"
                    value={formData.expectations}
                    onChange={(e) => handleInputChange('expectations', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="hearAbout">How did you hear about this program? <span className='text-red-600 font-bold'>*</span></Label>
                  <Select value={formData.hearAbout} onValueChange={(value) => handleInputChange('hearAbout', value)} required>
                    <SelectTrigger>
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

            {/* Submit Button */}
            <div className="text-center">
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  );
};

const SuccessModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 mb-6">
          <CheckCircle className="w-8 h-8 text-purple-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Application Submitted Successfully!
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for applying to our Leadership Academy. We have received your application and will review it shortly. You will receive a confirmation email with next steps. Blessings!
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

export default LeadershipApplication;
