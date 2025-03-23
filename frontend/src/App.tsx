import { useState } from 'react';
import FilteringSection from './components/FilteringSection'
import FlightSection from './components/FlightSection'
import { SeatRecommendationParameters } from './types';

const App = () => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [seatPreferences, setSeatPreferences] = useState<SeatRecommendationParameters>({
    hasWindow: false,
    hasLegspace: false,
    hasExit: false,
    seatsAmount: 1,
    travelClass: "TOURIST"
  });

  const handleFiltersChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  }

  const handleRecommendationChange = (newSeatPreferences: SeatRecommendationParameters) => {
    setSeatPreferences(newSeatPreferences);
  }

  return (
    <div className="flex flex-col w-full">
      <div>
        <FilteringSection 
          onFiltersChange={handleFiltersChange}
          onRecommendationsChange={handleRecommendationChange}
          seatPreferences={seatPreferences}
        >
        </FilteringSection>
      </div>
      <div className="mb-8 mx-4 flex-1 bg-green-100 p-4 shadow-md">
        <FlightSection 
          filters={filters}
          seatParameters={seatPreferences}
        />
      </div>
    </div>
  );
}

export default App;