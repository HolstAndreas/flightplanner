import { useEffect, useState } from "react"
import FlightElement from "./FlightElement"
import { fetchFlights } from "../service/flight-service";
import { Flight } from "../types";

interface FlightSectionProps {
  filters: Record<string, any>
}

const FlightSection = ({ filters }: FlightSectionProps) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [currentPage, setCurrentPage] = useState<number>();
  const [pageSize, setPageSize] = useState<number>();
  const [totalElements, setTotalElements] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFlights = async () => {    
      try {
        const allFlights = await fetchFlights(filters);
        setFlights(allFlights.flightList);
        setCurrentPage(allFlights.currentPageNr);
        setPageSize(allFlights.pageSize);
        setTotalElements(allFlights.totalElements);
        setTotalPages(allFlights.totalPages);
      } catch (error) {
        console.error('Failed to fetch flights: ', error);
      }
    };

    loadFlights();
    setIsLoading(false);
  }, [filters]);

  const handleFlightSelection = async (flightId: string) => {
    try {
      // add real fetch here later
      console.log("Flight has been selected " + flightId)
    } catch (error) {
      console.error("Failure...")
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading flights...</p>
        </div>
      ) : flights.length > 0 ? (
        <div className="bg-white rounded shadow">
          {flights.map((flight: Flight) => (
            <FlightElement 
              key={flight.flightId}
              flight={flight}
              onClick={() => handleFlightSelection(flight.flightId)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No flights found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default FlightSection