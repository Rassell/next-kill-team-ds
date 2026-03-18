import { useEffect, useState } from 'react';

import { calculateDataslateStats, calculateTimeRemaining, type TimeRemaining } from '../utils/calculations';
import type { Dataslate, DataslateStats } from '../types/Dataslate';

interface CountdownProps {
  dataslates: Dataslate[];
}

export default function Countdown({ dataslates }: CountdownProps) {
  const [stats, setStats] = useState<DataslateStats | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    const calculatedStats = calculateDataslateStats(dataslates);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats(calculatedStats);
  }, [dataslates]);

  useEffect(() => {
    if (!stats) return;

    const updateCountdown = () => {
      const remaining = calculateTimeRemaining(stats.predictedNextDate);
      setTimeRemaining(remaining);
    };

    // Update immediately
    updateCountdown();

    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [stats]);

  if (!stats || !timeRemaining) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-killteam-steel text-xl">Loading data...</div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-8">
      {/* Countdown Display */}
      <div className="gradient-blood rounded-lg shadow-2xl p-8 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <CountdownUnit value={timeRemaining.days} label="Days" />
          <CountdownUnit value={timeRemaining.hours} label="Hours" />
          <CountdownUnit value={timeRemaining.minutes} label="Minutes" />
          <CountdownUnit value={timeRemaining.seconds} label="Seconds" />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-killteam-dark rounded-lg border border-killteam-steel/30 p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-killteam-steel/20 pb-3">
          <span className="text-killteam-steel">Predicted Date:</span>
          <span className="text-killteam-gold font-semibold">
            {formatDate(stats.predictedNextDate)}
          </span>
        </div>
        
        <div className="flex justify-between items-center border-b border-killteam-steel/20 pb-3">
          <span className="text-killteam-steel">Average Days Between Releases:</span>
          <span className="text-gray-100 font-semibold">
            {Math.round(stats.averageDaysBetweenPosts)} days
          </span>
        </div>
        
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row">
          <span className="text-killteam-steel">Last Dataslate:</span>
          <a
            href={stats.lastPost.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-killteam-red hover:text-killteam-gold transition-colors font-semibold"
          >
            {stats.lastPost.title} →
          </a>
        </div>
      </div>
    </div>
  );
}

interface CountdownUnitProps {
  value: number;
  label: string;
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  return (
    <div className="text-center">
      <div className="bg-black/40 rounded-lg p-4 mb-2">
        <div className="text-4xl md:text-5xl font-bold text-white tabular-nums">
          {value.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="text-sm md:text-base text-gray-200 font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
