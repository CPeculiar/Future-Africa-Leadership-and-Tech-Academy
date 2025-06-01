import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import StayConnected from '@/components/StayConnected';

const PaymentSuccess = () => {
  const location = useLocation();
  const { transactionId, amount, name, transactionDetails } = location.state || {};

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle case where transactionId might be undefined
  const displayTransactionId = transactionId || (transactionDetails?.reference) || 'N/A';

  const formatAmount = (amt: number | undefined | null): string => {
    if (!amt) return 'N/A';
     return `NGN ${amt.toLocaleString()}`;
  };

   // Function to generate and download PDF receipt
 const downloadReceipt = async () => {
    try {
      // Dynamically import jsPDF
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      // Colors - properly typed as tuples for TypeScript
      const primaryColor: [number, number, number] = [147, 51, 234]; // Purple
      const secondaryColor: [number, number, number] = [99, 102, 241]; // Indigo
      const textColor: [number, number, number] = [31, 41, 55]; // Gray-800
      const lightGray: [number, number, number] = [156, 163, 175]; // Gray-400

      // Page dimensions
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;

      // Add FALATA logo
      try {
        // Create a promise to load the logo image
        const loadImage = (src: string): Promise<string> => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';  // Handle CORS if needed
            img.onload = () => {
              // Convert image to canvas to get base64
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
              }
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
              const dataURL = canvas.toDataURL('image/jpeg', 0.8);
              resolve(dataURL);
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = src;
          });
        };

        // Try to load the logo
        const logoDataUrl: string = await loadImage('/src/assets/images/FALATA.jpg');
        doc.addImage(logoDataUrl, 'JPEG', margin, 20, 30, 30);
      } catch (error) {
        console.log('Logo loading failed, using placeholder:', error);
        // Fallback - draw a styled circle with text
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.circle(margin + 15, 35, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('FALATA', margin + 15, 38, { align: 'center' });
      }

      // Header
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('FALATA Tech Academy', margin + 40, 30);

      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text('Payment Receipt', margin + 40, 40);

      // Horizontal line
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.5);
      doc.line(margin, 55, pageWidth - margin, 55);

      // Receipt content
      let yPosition = 75;

      // Transaction details box
      doc.setFillColor(248, 250, 252); // Light gray background
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 80, 'F');
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setLineWidth(0.2);
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 80, 'S');

      // Transaction details
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Transaction Details', margin + 10, yPosition + 5);

      yPosition += 15;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');

      const details = [
        ['Student Name:', name || 'Student'],
        ['Transaction ID:', displayTransactionId],
        ['Amount Paid:', formatAmount(amount)],
        ['Payment Status:', 'Confirmed'],
        ['Date:', new Date().toLocaleDateString()],
        ['Time:', new Date().toLocaleTimeString()]
      ];

      details.forEach(([label, value]) => {
        doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.text(label, margin + 10, yPosition);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFont('helvetica', 'bold');
        
        // Handle long transaction IDs
        if (label === 'Transaction ID:' && value.length > 25) {
          const wrappedText = doc.splitTextToSize(value, 80);
          doc.text(wrappedText, margin + 70, yPosition);
          yPosition += (wrappedText.length - 1) * 5;
        } else {
          doc.text(value, margin + 70, yPosition);
        }
        
        doc.setFont('helvetica', 'normal');
        yPosition += 8;
      });

      yPosition += 15;

      // Course details box
      doc.setFillColor(239, 246, 255); // Light blue background
      doc.rect(margin, yPosition, pageWidth - 2 * margin, 40, 'F');
      doc.setDrawColor(59, 130, 246);
      doc.rect(margin, yPosition, pageWidth - 2 * margin, 40, 'S');

      yPosition += 15;
      doc.setTextColor(59, 130, 246);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Course Information', margin + 10, yPosition);

      yPosition += 10;
      const courseDetails = [
        ['Course:', 'FALATA - Tech Academy Program'],
        ['Start Date:', 'June 2025'],
        ['Payment Method:', 'Online Payment']
      ];

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      courseDetails.forEach(([label, value]) => {
        doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.text(label, margin + 10, yPosition);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(value, margin + 60, yPosition);
        yPosition += 6;
      });

      yPosition += 20;

      // Thank you message
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(margin, yPosition, pageWidth - 2 * margin, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Thank you for your payment!', pageWidth / 2, yPosition + 15, { align: 'center' });

      yPosition += 40;

      // Contact information
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Contact Information', margin, yPosition);

      yPosition += 10;
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      const contactInfo = [
        'Email: futureafrica.leadtech@gmail.com',
        'Phone: 09060121720',
        'Website: https://www.futureafricaleadandtech.org/'
      ];

      contactInfo.forEach(info => {
        doc.text(info, margin, yPosition);
        yPosition += 6;
      });

      // Footer
      yPosition = doc.internal.pageSize.height - 30;
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setLineWidth(0.2);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);

      yPosition += 10;
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.setFontSize(8);
      doc.text('This is a computer-generated receipt and does not require a signature.', pageWidth / 2, yPosition, { align: 'center' });
      doc.text(`Generated on ${new Date().toLocaleString()}`, pageWidth / 2, yPosition + 8, { align: 'center' });

      // Save the PDF
      doc.save(`FALATA_Receipt_${displayTransactionId}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to text file if PDF generation fails
      const receiptContent = `
FALATA Tech Academy
Payment Receipt

=============================================

Student Name: ${name || 'Student'}
Transaction ID: ${displayTransactionId}
Amount Paid: ${formatAmount(amount)}
Payment Status: Confirmed
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

=============================================

Payment Details:
- Course: FALATA - Tech Academy Program
- Start Date: June 2025
- Payment Method: Online Payment

Thank you for your payment!

Contact Information:
Email: futureafrica.leadtech@gmail.com
Phone: 09060121720

Visit us at: https://www.futureafricaleadandtech.org/
      `;

      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `FALATA_Receipt_${displayTransactionId}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

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
            Congratulations {name ? name : 'Student'}! Your payment has been processed successfully. 
            Welcome to FALATA Tech Academy!
          </p>

          {/* Payment Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-purple-600 text-xs break-all">{displayTransactionId}</span>
              </div>
              {amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold">{formatAmount(amount)}</span>
                </div>
              )}
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
                <p>You'll receive a confirmation email with your enrollment details from us soon.</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                <p>Our team will contact you with onboarding instructions before the program starts.</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                <p>Program starts in June 2025. Mark your calendar!</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8"> */}
          <div className="flex justify-center mb-8">
            <Button onClick={downloadReceipt} 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            {/* <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              <Mail className="w-4 h-4 mr-2" />
              Email Receipt
            </Button> */}
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