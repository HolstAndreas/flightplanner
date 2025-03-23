import { SeatRecommendationParameters } from "../types";
import FlightsFilter from "./FlightsFilter";

interface FilteringSectionProps {
  children?: React.ReactNode;
  onFiltersChange: (filters: Record<string, any>) => void;
  seatPreferences: SeatRecommendationParameters;
  onRecommendationsChange: (seatPreferences: SeatRecommendationParameters) => void;
}

export default function FilteringSection({ children, onFiltersChange, onRecommendationsChange, seatPreferences }: FilteringSectionProps) {
  return (
    <div className="w-full border-r border-amber-200 p-4 md:block">
      <FlightsFilter 
        onFiltersChange={onFiltersChange}
        seatPreferences={seatPreferences}
        onRecommendationsChange={onRecommendationsChange}
      />
      {children}
    </div>
  )
}