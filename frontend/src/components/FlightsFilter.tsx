import React, { FormEvent, useEffect, useState } from 'react'
import { Airport } from '../types';
import { fetchLocations } from '../service/flight-service';
import SelectElement from './ui/SelectElement';

interface FlightsFilterProps {
  children?: React.ReactNode;
  onFiltersChange: (filters: Record<string, any>) => void;
}

const FlightsFilter = ({ children, onFiltersChange }: FlightsFilterProps) => {
  const [cities, setCities] = useState<string[]>();
  const [countries, setCountries] = useState<string[]>();
  const [airports, setAirports] = useState<Airport[]>();
  const [filters, setFilters] = useState({
    departureAirport: '',
    departureCity: '',
    departureCountry: '',
    arrivalAirport: '',
    arrivalCountry: '',
    arrivalCity: '',
    startingDate: '',
    endingdate: '',
    duration: '',
    maxPrice: ''
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // remove empty filters
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
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
      endingdate: '',
      duration: '',
      maxPrice: ''
    });
    onFiltersChange({});
  };

  return (
    <div>
      <h2 className="pl-1 mb-1 text-xl border-b">FILTER FLIGHTS</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div>
            <h3 className="font-medium-mb-2 border-b pb-1">Departure</h3>
            {/* Airport / City / Country */}
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

          <div>
            <h3 className="font-medium mb-2 border-b pb-1">Arrival</h3>
              {/* Airport / City / Country */}
          </div>

          <div>
            <h3 className="font-medium mb-2 border-b pb-1">Date Range</h3>
              {/* StartingDate / EndingDate */}
          </div>

          <div>
            <h3 className="font-medium mb-2 border-b pb-1">Additional Filters</h3>
          </div>

          <div className="flex mt-4 gap-2">
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
        </div>
      </form>
    </div>
  )
}

export default FlightsFilter