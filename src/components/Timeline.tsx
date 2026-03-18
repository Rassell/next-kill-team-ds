import type { Dataslate } from '../types/Dataslate';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  dataslates: Dataslate[];
}

export default function Timeline({ dataslates }: TimelineProps) {
  // Sort by date, most recent first
  const sortedDataslates = [...dataslates].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-killteam-gold mb-4">
          Release History
        </h2>
        <p className="text-killteam-steel text-lg">
          Track all previous Kill Team Dataslate releases
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-linear-to-b from-killteam-red via-killteam-steel to-killteam-red opacity-30"></div>

        {/* Timeline Items */}
        <div className="relative">
          {sortedDataslates.map((dataslate, index) => (
            <TimelineItem
              key={`${dataslate.publishedDate}-${index}`}
              dataslate={dataslate}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
