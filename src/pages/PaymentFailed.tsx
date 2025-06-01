import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { XCircle, RefreshCw, Mail, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import StayConnected from '@/components/StayConnected';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const PaymentFailed = () => {
  const location = useLocation();
  const { reference, error, amount, name, transactionDetails } = location.state || {};

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Save failed payment data to Firebase - call immediately when component mounts
     if ((transactionDetails && transactionDetails.reference) || reference) {
    saveFailedPaymentToFirebase();
  } else {
    console.log('No transaction data to save - payment may have been cancelled before processing');
  }
}, [transactionDetails, reference, error]);

  // Function to save failed payment data to Firebase
  const saveFailedPaymentToFirebase = async () => {
    try {
      // Get payment data from sessionStorage
      const storedPaymentData = sessionStorage.getItem('paymentData');
      const paymentData = storedPaymentData ? JSON.parse(storedPaymentData) : null;

      // Prepare the failed payment data to save - exclude redirecturl as requested
      const failedPaymentRecord = {
        // Transaction response data (excluding redirecturl)
        transactionId: reference || transactionDetails?.reference || `falata_tech_failed_${Date.now()}`,
        trans: transactionDetails?.trans || '',
        trxref: transactionDetails?.trxref || '',
        reference: transactionDetails?.reference || reference || '',
        status: 'failed',
        message: transactionDetails?.message || error || 'Payment Failed',
        response: transactionDetails?.response || 'Declined',
        
        // Payment data from sessionStorage
        customerName: paymentData?.customer_name || name || 'Student',
        customerEmail: paymentData?.customer_email || '',
        customerPhone: paymentData?.customer_phone || '',
        amount: paymentData?.amount || amount || 100, // Default to 100 if not found
        currency: paymentData?.currency || 'NGN',
        paymentDescription: paymentData?.payment_description || 'FALATA Tech Academy June 2025 Cohort 1 Registration Fee',
        
        // Metadata
        createdAt: serverTimestamp(),
        savedAt: new Date().toISOString(),
        source: 'web_application',
        failureReason: error || transactionDetails?.message || 'Unknown payment failure',
        
        // Additional tracking
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      };

      console.log('Saving failed payment record:', failedPaymentRecord);

      // Save to Firebase
      const docRef = await addDoc(collection(db, 'payments'), failedPaymentRecord);
      console.log('Failed payment successfully saved to Firebase with ID: ', docRef.id);

      // Clear sessionStorage after successful save to prevent duplicate entries
      sessionStorage.removeItem('paymentData');

      // Optional: Show success notification
      console.log('Failed payment data saved successfully');

    } catch (error) {
      console.error('Error saving failed payment to Firebase:', error);
      
      // Enhanced fallback: Save to localStorage if Firebase fails
      try {
        const storedPaymentData = sessionStorage.getItem('paymentData');
        const paymentData = storedPaymentData ? JSON.parse(storedPaymentData) : null;
        
        const existingPayments = JSON.parse(localStorage.getItem('falata_payments') || '[]');
        const failedPaymentRecord = {
          id: Date.now().toString(),
          transactionId: reference || transactionDetails?.reference || `falata_tech_failed_${Date.now()}`,
          trans: transactionDetails?.trans || '',
          trxref: transactionDetails?.trxref || '',
          reference: transactionDetails?.reference || reference || '',
          status: 'failed',
          message: transactionDetails?.message || error || 'Payment Failed',
          response: transactionDetails?.response || 'Declined',
          customerName: paymentData?.customer_name || name || 'Student',
          customerEmail: paymentData?.customer_email || '',
          customerPhone: paymentData?.customer_phone || '',
          amount: paymentData?.amount || amount || 100,
          currency: paymentData?.currency || 'NGN',
          paymentDescription: paymentData?.payment_description || 'FALATA Tech Academy June 2025 Cohort 1 Registration Fee',
          createdAt: new Date().toISOString(),
          source: 'fallback_storage',
          error: 'Firebase_save_failed',
          failureReason: error || transactionDetails?.message || 'Unknown payment failure'
        };
        
        existingPayments.push(failedPaymentRecord);
        localStorage.setItem('falata_payments', JSON.stringify(existingPayments));
        console.log('Failed payment saved to localStorage as fallback');
      } catch (fallbackError) {
        console.error('Fallback storage also failed:', fallbackError);
      }
    }
  };

  // Also save when component unmounts (user leaves page)
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Try one more time to save if not already saved
      const storedPaymentData = sessionStorage.getItem('paymentData');
      if (storedPaymentData && (transactionDetails || reference || error)) {
        // Use localStorage as backup for page unload saves
        const paymentData = JSON.parse(storedPaymentData);
        const quickSaveData = {
          transactionId: reference || transactionDetails?.reference || `falata_tech_failed_${Date.now()}`,
          customerName: paymentData?.customer_name || name,
          amount: paymentData?.amount || amount,
          status: 'failed',
          failureReason: error || transactionDetails?.message || 'Payment failed - page unload',
          savedAt: new Date().toISOString(),
          source: 'page_unload_save'
        };
        
        // Save to localStorage as backup
        const existingPayments = JSON.parse(localStorage.getItem('falata_payments_backup') || '[]');
        existingPayments.push(quickSaveData);
        localStorage.setItem('falata_payments_backup', JSON.stringify(existingPayments));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [transactionDetails, reference, error, name, amount]);

  // Handle case where reference might be undefined
  const displayReference = reference || (transactionDetails?.reference) || 'N/A';

  const openWhatsAppChat = () => {
    const phoneNumber = '2349060121720'; // WhatsApp format (country code + number without +)
    const message = encodeURIComponent(`Hello! I'm having issues with my payment for FALATA Tech Academy. My reference number is: ${displayReference}. Can you help me?`);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Failed Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-12 text-center">
          <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-400 to-rose-500 mb-6">
            <XCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Payment Failed 😞
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {name ? `Sorry ${name}, ` : 'Sorry, '}your payment could not be processed at this time. 
            Don't worry, you can try again!
          </p>

          {/* Payment Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Reference:</span>
                <span className="font-mono text-red-600 text-xs break-all">{displayReference}</span>
              </div>
              {amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">₦{amount?.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-red-600 font-semibold">Failed</span>
              </div>
              {error && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Reason:</span>
                  <span className="text-red-600 text-xs break-all">{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Common Reasons */}
          <div className="bg-orange-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Common Reasons for Payment Failure</h3>
            <div className="text-left space-y-3 text-sm sm:text-base">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                <p>Insufficient funds in your account</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                <p>Card expired or blocked by your bank</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                <p>Network connectivity issues during payment</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</div>
                <p>Incorrect card details entered</p>
              </div>
            </div>
          </div>

          {/* What to Do Next */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">What Should You Do?</h3>
            <div className="text-left space-y-3 text-sm sm:text-base">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                <p>Check your account balance and card details</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                <p>Contact your bank if you suspect the card is blocked</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                <p>Try a different payment method or card</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</div>
                <p>Retry the payment process</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              asChild 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              <Link to="/apply/tech">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
              onClick={() => window.location.href = 'mailto:futureafrica.leadtech@gmail.com?subject=Payment Issue - Need Help'}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button 
              variant="outline" 
              className="border-green-200 text-green-700 hover:bg-green-50"
              onClick={openWhatsAppChat}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>

          {/* Alternative Payment Methods */}
          <div className="bg-green-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Alternative Payment Options</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>If you continue to experience issues, you can also pay via:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border">Bank Transfer</span>
                <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border">USSD</span>
                <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border">Mobile Money</span>
                <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border">QR Code</span>
              </div>
            </div>
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
               <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                <button 
                  onClick={openWhatsAppChat}
                  className="hover:text-green-600 text-green-700"
                >
                  WhatsApp Support
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 max-w-md mx-auto">
              Our support team is available to help you complete your enrollment. 
              Don't hesitate to reach out!
            </p>
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

export default PaymentFailed;