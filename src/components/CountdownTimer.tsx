
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-06-10T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 sm:py-6 px-4 sm:px-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-center mb-3 sm:mb-4">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse" />
        <h3 className="text-sm sm:text-lg font-bold text-center">
          Admission for June 2025 Cohort is closing soon!
        </h3>
      </div>
      
      <div className="flex justify-center items-center space-x-3 sm:space-x-6">
        <div className="text-center bg-white/10 rounded-xl px-2 sm:px-4 py-2 sm:py-3 backdrop-blur-sm transform transition-all duration-300 hover:scale-110">
          <div className="text-lg sm:text-2xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
          <div className="text-xs uppercase tracking-wide opacity-90">Days</div>
        </div>
        <div className="text-center bg-white/10 rounded-xl px-2 sm:px-4 py-2 sm:py-3 backdrop-blur-sm transform transition-all duration-300 hover:scale-110">
          <div className="text-lg sm:text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className="text-xs uppercase tracking-wide opacity-90">Hrs</div>
        </div>
        <div className="text-center bg-white/10 rounded-xl px-2 sm:px-4 py-2 sm:py-3 backdrop-blur-sm transform transition-all duration-300 hover:scale-110">
          <div className="text-lg sm:text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-xs uppercase tracking-wide opacity-90">Mins</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
