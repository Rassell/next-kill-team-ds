import { useEffect, useState } from 'react';
import Countdown from './components/Countdown';
import Timeline from './components/Timeline';
import type { Dataslate } from './types/Dataslate';

function App() {
  const [dataslates, setDataslates] = useState<Dataslate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/next-kill-team-ds/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load dataslate data');
        }
        return response.json();
      })
      .then((data: Dataslate[]) => {
        setDataslates(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-killteam-gold text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-killteam-red text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-killteam-darker">
      {/* Header */}
      <header className="border-b border-killteam-steel/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-killteam-gold">
              Kill Team Dataslate Tracker
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Countdown Section */}
        <section className="py-12">
          <Countdown dataslates={dataslates} />
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-px bg-linear-to-r from-transparent via-killteam-steel/30 to-transparent"></div>
        </div>

        {/* Timeline Section */}
        <section className="py-12">
          <Timeline dataslates={dataslates} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-killteam-steel/20 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-killteam-steel text-sm">
            Unofficial fan-made tool. Not affiliated with Games Workshop.
          </p>
          <p className="text-killteam-steel text-xs mt-2">
            Data is manually updated. Predictions are estimates based on historical patterns.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
