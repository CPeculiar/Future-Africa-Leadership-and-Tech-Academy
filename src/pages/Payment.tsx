
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, CreditCard } from 'lucide-react';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState({
    name: '',
    email: '',
    currency: 'NGN',
    amount: 10000,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const currency = searchParams.get('currency');
    const amount = searchParams.get('amount');

    if (name && email && amount) {
      setPaymentData({
        name: decodeURIComponent(name),
        email: decodeURIComponent(email),
        currency: currency ? decodeURIComponent(currency) : 'NGN',
        amount: parseInt(amount, 10),
      });
    }
  }, [searchParams]);

  const loadFlutterwave = async () => {
    return new Promise<void>((resolve, reject) => {
      if (window.FlutterwaveCheckout) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Flutterwave"));
      
      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await loadFlutterwave();

      if (!window.FlutterwaveCheckout) {
        throw new Error("Flutterwave failed to initialize");
      }

      const config = {
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-SANDBOXDEMOKEY-X',
        tx_ref: `TX-${Date.now()}`,
        name: paymentData.name,
        amount: Number(paymentData.amount),
        currency: paymentData.currency,
        payment_options: "card, mobilemoney, ussd",
        customer: {
          name: paymentData.name,
          email: paymentData.email,
        },
        customizations: {
          title: "Tech Academy Training",
          description: "Secure your spot in our upcoming cohort",
          logo: "",
        },
        callback: function (response: any) {
          if (response.status === "successful") {
            alert("Payment successful! You'll receive a confirmation email shortly.");
            navigate('/');
            setPaymentData({
              name: "",
              email: "",
              currency: "NGN",
              amount: 10000,
            });          
          } else {
            setError("Payment was not successful. Please try again.");
          }
        },
        onclose: function() {
          setIsLoading(false);
        },
      };

      window.FlutterwaveCheckout(config);
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : "An error occurred while processing your payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!paymentData.email || !paymentData.amount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <XCircle className="w-6 h-6 text-red-600" />
              <CardTitle className="text-red-600">Invalid Payment Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              The payment information provided is incomplete or invalid. Please try again from the registration page.
            </p>
            <Button 
              className="w-full mt-4" 
              onClick={() => navigate('/apply/tech')}
            >
              Return to Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            <CardTitle>Complete Your Payment</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Name:</span>
                <span className="font-medium">{paymentData.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-medium">{paymentData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Program:</span>
                <span className="font-medium">Tech Academy Training</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-bold text-lg">₦{paymentData.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Button 
              onClick={makePayment}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {isLoading ? 'Processing...' : `Pay ₦${paymentData.amount.toLocaleString()}`}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/apply/tech')}
              className="w-full"
            >
              Back to Application
            </Button>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Secure payment powered by Flutterwave</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Extend the Window interface to include FlutterwaveCheckout
declare global {
  interface Window {
    FlutterwaveCheckout: (config: any) => void;
  }
}

export default Payment;
