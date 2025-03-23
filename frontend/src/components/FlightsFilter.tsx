import React, { FormEvent, useEffect, useState } from 'react'
import { Airport, SeatRecommendationParameters } from '../types';
import { fetchLocations } from '../service/flight-service';
import SelectElement from './ui/SelectElement';
import { DateRange, DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";
import SliderElement from './ui/SliderElement';
import SortingElement from './ui/SortingElement';
import CheckboxElement from './ui/CheckboxElement';

interface FlightsFilterProps {
  children?: React.ReactNode;
  onFiltersChange: (filters: Record<string, any>) => void;
  seatPreferences: SeatRecommendationParameters;
  onRecommendationsChange: (seatPreferences: SeatRecommendationParameters) => void;
}

const FlightsFilter = ({ onFiltersChange, onRecommendationsChange, seatPreferences }: FlightsFilterProps) => {
  const [cities, setCities] = useState<string[]>();
  const [countries, setCountries] = useState<string[]>();
  const [airports, setAirports] = useState<Airport[]>();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>();
  const [currentSort, setCurrentSort] = useState('departureTime_ASC');
  const [filters, setFilters] = useState({
    departureAirport: '',
    departureCity: '',
    departureCountry: '',
    arrivalAirport: '',
    arrivalCountry: '',
    arrivalCity: '',
    startingDate: '',
    endingDate: '',
    duration: '',
    maxPrice: '',
    sortColumn: '',
    sortDirection: ''
  });

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const allLocations = await fetchLocations();
        setCities(allLocations.cities);
        setCountries(allLocations.countries);
        setAirports(allLocations.airports);
      } catch (error) {
        console.error('Failed to fetch location filters: ', error)
      }
    };
    loadLocations();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSliderChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSortChange = (sortBy: string) => {
    setCurrentSort(sortBy);
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    const updatedPreferences = { ...seatPreferences };

    switch (name) {
      case 'hasWindow':
        updatedPreferences.hasWindow = checked;
        break;
      case 'hasLegspace':
        updatedPreferences.hasLegspace = checked;
        break;
      case 'hasExit':
        updatedPreferences.hasExit = checked;
        break;
    }
    onRecommendationsChange(updatedPreferences);
  }

  const handlePassangerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);

    const updatedPreferences = { 
      ...seatPreferences,
      seatsAmount: value
    };
    onRecommendationsChange(updatedPreferences);
  }

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    const updatedPreferences = {
      ...seatPreferences,
      travelClass: value
    };
    onRecommendationsChange(updatedPreferences);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    //populate starting/ending date
    const updatedFilters = { ...filters };
    if (selectedDateRange?.from) {
      updatedFilters.startingDate = selectedDateRange.from.toISOString().split('T')[0];
    }
    if (selectedDateRange?.to) {
      updatedFilters.endingDate = selectedDateRange.to.toISOString().split('T')[0];
    }
    if (currentSort) {
      const [sortColumn, sortDirection] = currentSort.split('_');
      updatedFilters.sortColumn = sortColumn;
      updatedFilters.sortDirection = sortDirection;
    }

    // remove empty filters
    const activeFilters = Object.entries(updatedFilters).reduce((acc, [key, value]) => {
      if (value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    onFiltersChange(activeFilters);
  };

  const clearFilters = () => {
    setFilters({
      departureAirport: '',
      departureCity: '',
      departureCountry: '',
      arrivalAirport: '',
      arrivalCountry: '',
      arrivalCity: '',
      startingDate: '',
      endingDate: '',
      duration: '',
      maxPrice: '',
      sortColumn: '',
      sortDirection: ''
    });
    onFiltersChange({});
  };

  return (
    <div className="bg-amber-50 p-4 rounded-lg">
      <h2 className="text-xl font-semibold border-b pb-2 mb-4">FILTER FLIGHTS</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="flex flex-row gap-8">
            <div className="flex-grow">

              <div className="mb-2">
                <h3 className="font-semibold text-lg pb-1">Departure</h3>
                <div className="grid grid-cols-3 gap-2">
                  <SelectElement
                    label="Country"
                    name="departureCountry"
                    value={filters.departureCountry}
                    options={countries || []}
                    placeholder="Select country..."
                    onChange={handleSelectChange}
                  />
                  <SelectElement
                    label="City"
                    name="departureCity"
                    value={filters.departureCity}
                    options={cities || []}
                    placeholder="Select city..."
                    onChange={handleSelectChange}
                  />
                  <SelectElement
                    label="Airport"
                    name="departureAirport"
                    value={filters.departureAirport}
                    options={airports || []}
                    placeholder="Select airport..."
                    onChange={handleSelectChange}
                  />
                </div>
              </div>

              <div className="mb-2">
                <h3 className="font-semibold text-lg pb-1">Arrival</h3>
                <div className="grid grid-cols-3 gap-2">
                  <SelectElement
                    label="Country"
                    name="arrivalCountry"
                    value={filters.arrivalCountry}
                    options={countries || []}
                    placeholder="Select country..."
                    onChange={handleSelectChange}
                  />
                  <SelectElement
                    label="City"
                    name="arrivalCity"
                    value={filters.arrivalCity}
                    options={cities || []}
                    placeholder="Select city..."
                    onChange={handleSelectChange}
                  />
                  <SelectElement
                    label="Airport"
                    name="arrivalAirport"
                    value={filters.arrivalAirport}
                    options={airports || []}
                    placeholder="Select airport..."
                    onChange={handleSelectChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center">
                <SliderElement
                  id="duration"
                  name="duration"
                  min="2"
                  max="20"
                  value={filters.duration || "20"}
                  step="1"
                  label={`Maximum duration: ${filters.duration || 5} hours`}
                  onChange={handleSliderChange}
                />
                <SliderElement
                  id="maxPrice"
                  name="maxPrice"
                  min="100"
                  max="2000"
                  value={filters.maxPrice || "2000"}
                  step="100"
                  label={`Maximum Price: €${filters.maxPrice || 2000}`}
                  onChange={handleSliderChange}
                />
                <SortingElement 
                  onSortChange={handleSortChange}
                  currentSort={currentSort}
                />
              </div>

            </div>
          
            <div className="flex-1">
              <div className="transform scale-75 origin-top-right">
              {/* <h3 className="font-medium mb-2 border-b pb-1">Date Range</h3> */}
                <DayPicker 
                  ISOWeek
                  captionLayout="dropdown"
                  hideWeekdays={true}
                  mode="range"
                  selected={selectedDateRange}
                  onSelect={setSelectedDateRange}
                  startMonth={new Date()}
                  endMonth={new Date(2026, 12)}
                />
              </div>
              
            </div>
          </div>

          <div className="flex flex-wrap">
          <div className="flex mt-4 gap-2 mr-50">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-sm"
            >
              Apply
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-700"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>

          <div className="flex flex-row gap-10 items-center">
            <h3 className="font-semibold text-lg pb-1">Seat recommendations</h3>
          <div>
            <CheckboxElement
              label="Window Seat"
              name="hasWindow"
              checked={seatPreferences.hasWindow}
              onChange={(name, checked) => handleCheckboxChange(name, checked)}
            />
            <CheckboxElement
              label="More legroom"
              name="hasLegspace"
              checked={seatPreferences.hasLegspace}
              onChange={(name, checked) => handleCheckboxChange(name, checked)}
            />
            <CheckboxElement
              label="Close to exit"
              name="hasExit"
              checked={seatPreferences.hasExit}
              onChange={(name, checked) => handleCheckboxChange(name, checked)}
            />
            </div>
            <div>
              <SelectElement
                label="Passengers"
                name="seatsAmount"
                value={seatPreferences.seatsAmount.toString() || "1"}
                options={["1", "2", "3"]}
                onChange={handlePassangerChange}
              />
            </div>
            <div>
              <SelectElement
                label="Travel Class"
                name="travelClass"
                value={seatPreferences.travelClass || "TOURIST"}
                options={["TOURIST", "BUSINESS", "FIRST"]}
                onChange={handleClassChange}
              />
            </div>
          </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FlightsFilter