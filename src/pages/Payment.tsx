
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount: number;
  currency: string;
  payment_description: string;
}

const Payment = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get payment data from sessionStorage
    const storedData = sessionStorage.getItem('paymentData');
    if (storedData) {
      setPaymentData(JSON.parse(storedData));
    } else {
      // If no payment data, redirect back
      navigate('/apply/tech');
    }
  }, [navigate]);

  const handlePayment = () => {
    if (!paymentData) return;

    setIsLoading(true);

    // Flutterwave configuration
    const flutterwaveConfig = {
      public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X", // Replace with your actual public key
      tx_ref: `falata_tech_${Date.now()}`,
      amount: paymentData.amount,
      currency: paymentData.currency,
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: paymentData.customer_email,
        phone_number: paymentData.customer_phone,
        name: paymentData.customer_name,
      },
      customizations: {
        title: "FALATA Tech Academy",
        description: paymentData.payment_description,
        logo: "/src/assets/images/FALATA.jpg",
      },
      callback: function (data: any) {
        console.log('Payment successful:', data);
        // Verify payment on your server
        verifyPayment(data.transaction_id);
      },
      onclose: function () {
        console.log('Payment cancelled');
        setIsLoading(false);
      },
    };

    // Initialize Flutterwave payment
    // @ts-ignore
    window.FlutterwaveCheckout(flutterwaveConfig);
  };

  const verifyPayment = async (transactionId: string) => {
    try {
      // Here you would verify the payment with your backend
      // For now, we'll simulate a successful verification
      console.log('Verifying payment:', transactionId);
      
      // Clear payment data
      sessionStorage.removeItem('paymentData');
      
      // Redirect to success page
      navigate('/payment-success', { 
        state: { 
          transactionId, 
          amount: paymentData?.amount,
          name: paymentData?.customer_name 
        } 
      });
    } catch (error) {
      console.error('Payment verification failed:', error);
      alert('Payment verification failed. Please contact support.');
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-16">
      {/* Flutterwave Script */}
      <script src="https://checkout.flutterwave.com/v3.js"></script>
      
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
            src="/src/assets/images/FALATA.jpg" 
            alt="FALATA Logo" 
            className="w-16 h-16 mx-auto mb-4 rounded-lg"
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

          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 sm:py-4 rounded-lg text-base sm:text-lg"
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
          </Button>
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
