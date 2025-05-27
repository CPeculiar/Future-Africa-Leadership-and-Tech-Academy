
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import StayConnected from '@/components/StayConnected';

const PaymentSuccess = () => {
  const location = useLocation();
  const { transactionId, amount, name } = location.state || {};

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-12 text-center">
          <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful! 🎉
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Congratulations {name}! Your payment has been processed successfully. 
            Welcome to FALATA Tech Academy!
          </p>

          {/* Payment Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-purple-600 text-xs">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold">₦{amount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold">Confirmed</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
            <div className="text-left space-y-3 text-sm sm:text-base">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                <p>You'll receive a confirmation email within 24 hours with your enrollment details.</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                <p>Our team will contact you before the program starts with joining instructions.</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                <p>Program starts in June 2025. Mark your calendar!</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              <Mail className="w-4 h-4 mr-2" />
              Email Receipt
            </Button>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:futureafrica.leadtech@gmail.com" className="hover:text-purple-600">
                  futureafrica.leadtech@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+2349060121720" className="hover:text-purple-600">
                  09060121720
                </a>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8">
            <Button asChild variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
              <Link to="/">
                ← Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <StayConnected />
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
