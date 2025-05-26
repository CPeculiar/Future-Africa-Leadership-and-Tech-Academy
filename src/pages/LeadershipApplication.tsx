
import { useState } from 'react';
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
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    stateOfOrigin: '',
    currentAddress: '',
    occupation: '',
    organization: '',
    educationLevel: '',
    fieldOfStudy: '',
    institution: '',
    graduationYear: '',
    leadershipExperience: '',
    expectations: '',
    church: '',
    zone: '',
    department: '',
    office: '',
    hearAbout: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // Church list with only names
  const churchList = [
    "TLBC Awka", "TLBC Ekwulobia", "TLBC Ihiala",
    "TLBC Nnewi", "TLBC Onitsha", "TLBC Mbaukwu",
    "TLBCM Agulu", "TLBCM COOU Igbariam", "TLBCM COOU Uli",
    "TLBCM FUTO", "TLBCM IMSU", "TLBCM Mgbakwu",
    "TLBCM NAU", "TLBCM Nekede", "TLBCM Oko",
    "TLBCM Okofia", "TLBCM UNILAG", "TLTN Agulu",
    "TLTN Awka"
  ];

  // Zones list with only names
  const zoneList = [
    "Awka zone",
    "Ekwulobia zone", 
    "Nnewi zone",
    "Owerri zone",
    "Onitsha zone"
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
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        stateOfOrigin: '',
        currentAddress: '',
        occupation: '',
        organization: '',
        educationLevel: '',
        fieldOfStudy: '',
        institution: '',
        graduationYear: '',
        leadershipExperience: '',
        expectations: '',
        church: '',
        zone: '',
        department: '',
        office: '',
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
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender *</Label>
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
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <Label htmlFor="currentAddress">Current Address *</Label>
                <Textarea
                  id="currentAddress"
                  value={formData.currentAddress}
                  onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Church Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Church Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="church">Church *</Label>
                  <Select onValueChange={(value) => handleInputChange('church', value)}>
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
                  <Label htmlFor="zone">Zone *</Label>
                  <Select onValueChange={(value) => handleInputChange('zone', value)}>
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
                  <Label htmlFor="occupation">Current Occupation *</Label>
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

            {/* Educational Background */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Educational Background</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="educationLevel">Highest Education Level *</Label>
                  <Select onValueChange={(value) => handleInputChange('educationLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="secondary">Secondary School</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="fieldOfStudy">Field of Study *</Label>
                  <Input
                    id="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="institution">Institution *</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="graduationYear">Graduation Year *</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Leadership Experience */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Leadership & Expectations</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="leadershipExperience">Previous Leadership Experience *</Label>
                  <Textarea
                    id="leadershipExperience"
                    placeholder="Describe your leadership roles and experiences"
                    value={formData.leadershipExperience}
                    onChange={(e) => handleInputChange('leadershipExperience', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="expectations">What are your expectations from this program? *</Label>
                  <Textarea
                    id="expectations"
                    value={formData.expectations}
                    onChange={(e) => handleInputChange('expectations', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="hearAbout">How did you hear about this program? *</Label>
                  <Select onValueChange={(value) => handleInputChange('hearAbout', value)}>
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
          Thank you for applying to our Leadership Academy. We have received your application and will review it shortly. You will receive a confirmation email with next steps.
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
