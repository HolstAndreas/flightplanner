import { useState } from 'react';
import FilteringSection from './components/FilteringSection'
import FlightSection from './components/FlightSection'

const App = () => {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFiltersChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  }

  return (
    <div className="flex flex-col w-full">
      <div>
        <FilteringSection onFiltersChange={handleFiltersChange}>
        </FilteringSection>
      </div>
      <div className="mb-8 mx-8 flex-1 bg-green-100 p-4 shadow-md">
        <FlightSection filters={filters}/>
      </div>
    </div>
  );
}

export default App;