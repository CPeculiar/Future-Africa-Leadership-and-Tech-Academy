
import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-06-01T00:00:00').getTime();

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
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8 px-6 rounded-lg text-center">
      <h3 className="text-2xl font-bold mb-2">
        Admission for the June 2025 Cohort is closing soon. Apply Now!
      </h3>
      
      <div className="flex justify-center items-center space-x-8 mt-6">
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
          <div className="text-sm uppercase tracking-wide">Days</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className="text-sm uppercase tracking-wide">Hrs</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-sm uppercase tracking-wide">Mins</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
