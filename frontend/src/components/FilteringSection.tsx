import FlightsFilter from "./FlightsFilter";

interface FilteringSectionProps {
  children?: React.ReactNode;
  onFiltersChange: (filters: Record<string, any>) => void;
}

export default function FilteringSection({ children, onFiltersChange }: FilteringSectionProps) {
  return (
    <div className="w-full border-r border-amber-200 p-4 md:block">
      <FlightsFilter onFiltersChange={onFiltersChange} />
      {children}
    </div>
  )
}