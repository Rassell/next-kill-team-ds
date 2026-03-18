import type { Dataslate } from '../types/Dataslate';

interface TimelineItemProps {
  dataslate: Dataslate;
  index: number;
}

export default function TimelineItem({ dataslate, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`flex items-center mb-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Content Card */}
      <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
        <div className="bg-killteam-dark border border-killteam-steel/30 rounded-lg p-4 hover:border-killteam-red transition-colors duration-300 shadow-lg hover:shadow-killteam-red/20">
          <div className="text-killteam-gold text-sm font-semibold mb-2">
            {formatDate(dataslate.publishedDate)}
          </div>
          <h3 className="text-gray-100 font-bold text-lg mb-2">
            {dataslate.title}
          </h3>
          <a
            href={dataslate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-killteam-red hover:text-killteam-gold transition-colors text-sm font-medium"
          >
            View Dataslate →
          </a>
        </div>
      </div>

      {/* Center Dot */}
      <div className="w-2/12 flex justify-center">
        <div className="relative">
          <div className="w-4 h-4 bg-killteam-red rounded-full border-4 border-killteam-darker shadow-lg shadow-killteam-red/50"></div>
        </div>
      </div>

      {/* Empty space on other side */}
      <div className="w-5/12"></div>
    </div>
  );
}
