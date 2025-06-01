import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { PaystackButton } from 'react-paystack';
import { Button } from '@/components/ui/button';
import IMG from '/FALATABG.png'

interface PaymentData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount: number;
  currency: string;
  payment_description: string;
}
interface PaystackResponse {
  message: string;
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
}

const Payment = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  useEffect(() => {
    // Get payment data from sessionStorage
    const storedData = sessionStorage.getItem('paymentData');
    if (storedData) {
      setPaymentData(JSON.parse(storedData));
    } else {
      // If no payment data, redirect back
      navigate('/apply/tech');
    }

  if (!publicKey) {
      console.error('Paystack public key not found. Please add VITE_PAYSTACK_PUBLIC_KEY to your .env file');
    }
  }, [navigate, publicKey]);

  const handlePaystackSuccessAction = async (reference: PaystackResponse) => {
    console.log('Payment successful:', reference);
    setIsLoading(true);

    try {
      // await verifyPayment(reference.reference);
      alert('Payment verified successfully!');
      navigate('/payment-success', { 
          state: { 
            transactionId: reference.reference,
            transactionDetails: reference,
            amount: paymentData?.amount,
            name: paymentData?.customer_name,
            paymentData: paymentData
          } 
        });
    } catch (error) {
      console.error('Payment verification failed:', error);
      alert('Payment verification failed. Please try again later.');
      // Navigate to payment failure page or show error
      navigate('/payment-failed', { 
        state: {  
          reference: reference.reference,
          transactionDetails: reference,
          amount: paymentData?.amount,
          name: paymentData?.customer_name,
          error: 'Payment verification failed'
        } 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClose = (error: any) => {
  console.error('Payment error:', error);
  
const interruptedTransactionDetails = {
    reference: `interrupted_${Date.now()}`,
    status: 'cancelled',
    message: 'Payment process was interrupted',
    trans: '',
    trxref: `interrupted_${Date.now()}`,
    transaction: `interrupted_${Date.now()}`
  };
  
 navigate('/payment-failed', { 
    state: { 
      reference: `interrupted_${Date.now()}`,
      transactionDetails: interruptedTransactionDetails,
      amount: paymentData?.amount,
      name: paymentData?.customer_name,
      error: 'Payment process was interrupted or cancelled',
      isUserCancellation: true // Flag to customize the failed page message
    } 
  });
};

  const handlePaystackCloseAction = () => {
    console.log('Payment cancelled or failed');
    
    const tryAgain = window.confirm(
    'Payment was not completed. Would you like to try again? Click "Cancel" to return to the application form.'
  );

   if (tryAgain) {
    navigate('/apply/tech')
  } else {
    handleOnClose({ 
      message: 'Payment was not completed. This could be due to cancellation or payment failure.' 
    });
  }

    setIsLoading(false);
  };

  const verifyPayment = async (reference: string) => {
    try {
      // TODO: Replace with your actual backend endpoint
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`, // This should be on your backend
        },
        body: JSON.stringify({ reference }),
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      const verificationResult = await response.json();
      
      if (verificationResult.data.status === 'success') {
        // Clear payment data
        sessionStorage.removeItem('paymentData');
        
        // Navigate to success page
        navigate('/payment-success', { 
          state: { 
            transactionId: reference,
            amount: paymentData?.amount,
            name: paymentData?.customer_name,
            paymentData: verificationResult.data
          } 
        });
      } else {
        throw new Error('Payment was not successful');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
       // FIXED: Create a proper transaction object for failed payments
    const failedTransactionDetails = {
      reference: reference,
      status: 'failed',
      message: 'Payment verification failed',
      trans: '',
      trxref: reference,
      transaction: reference
    };
    
    // Navigate to payment failure page with proper data structure
    navigate('/payment-failed', { 
      state: { 
        reference: reference,                    // Direct reference
        transactionDetails: failedTransactionDetails, // Structured transaction details
        amount: paymentData?.amount,
        name: paymentData?.customer_name,
        error: error.message || 'Payment verification failed'
      } 
    });
      throw error;
    }
  };

const paystackConfig = {
    reference: `falata_tech_${Date.now()}`,
    email: paymentData?.customer_email || '',
    amount: (paymentData?.amount || 0) * 100, // Paystack expects amount in kobo (multiply by 100)
    publicKey: publicKey || '',
    text: 'Pay Now',
    onSuccess: (reference: PaystackResponse) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
    onError: (error: any) => handlePaystackError(error),
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: paymentData?.customer_name || ''
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number", 
          value: paymentData?.customer_phone || ''
        },
        {
          display_name: "Course",
          variable_name: "course",
          value: "FALATA Tech Academy"
        }
      ]
    },
    currency: 'NGN', // Nigerian Naira
    channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
  };

  const handlePaystackError = (error: any) => {
  console.error('Payment error:', error);
  
  const failedTransactionDetails = {
    reference: `failed_${Date.now()}`,
    status: 'failed',
    message: 'Payment failed',
    trans: '',
    trxref: `failed_${Date.now()}`,
    transaction: `failed_${Date.now()}`
  };
  
  navigate('/payment-failed', { 
    state: { 
      reference: `failed_${Date.now()}`,
      transactionDetails: failedTransactionDetails,
      amount: paymentData?.amount,
      name: paymentData?.customer_name,
      error: error.message || 'Payment processing failed'
    } 
  });
};


  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading payment information...</p>
        </div>
      </div>
    );
  }

  if (!publicKey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Payment configuration error. Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Application
          </Button>
          
          <img 
            src={IMG}
            alt="FALATA Logo" 
            className="w-32 h-32 mx-auto mb-4 rounded-lg"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Secure your spot in FALATA Tech Academy</p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Payment Summary</h2>
            <div className="flex items-center text-green-600">
              <Shield className="w-5 h-5 mr-1" />
              <span className="text-sm">Secure</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Student Name:</span>
              <span className="font-medium">{paymentData.customer_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-sm sm:text-base break-all">{paymentData.customer_email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{paymentData.customer_phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Course:</span>
              <span className="font-medium">Tech Academy</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-purple-600">₦{paymentData.amount.toLocaleString()}</span>
            </div>
          </div>

           <PaystackButton
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 sm:py-4 rounded-lg text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            {...paystackConfig}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pay ₦{paymentData.amount.toLocaleString()}
              </>
            )}
          </PaystackButton>
        </div>

        {/* Security Features */}
        <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Your payment is secure</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>256-bit SSL encryption</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>PCI DSS compliant</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Fraud protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
