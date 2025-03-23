import { useEffect, useState } from "react"
import FlightElement from "./FlightElement"
import { fetchFlights, fetchSeats } from "../service/flight-service";
import { Flight, SeatRecommendationParameters, SeatsResponse } from "../types";
import SeatOverlay from "./SeatOverlay";

interface FlightSectionProps {
  filters: Record<string, any>;
  seatParameters: SeatRecommendationParameters;
}

const FlightSection = ({ filters, seatParameters }: FlightSectionProps) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [currentPage, setCurrentPage] = useState<number>();
  const [pageSize, setPageSize] = useState<number>();
  const [totalElements, setTotalElements] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<SeatsResponse[]>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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
      const allSeats = await fetchSeats(flightId);
      setSelectedSeats(allSeats);
      setIsOverlayOpen(true);
      console.log("Flight has been selected " + flightId)
    } catch (error) {
      console.error("Failure...")
    }
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage < 0 || (totalPages !== undefined && newPage >= totalPages)) {
      return;
    }

    setIsLoading(true);
    try {
      const paginatedFilters = {
        ...filters,
        page: newPage
      };

      const allFlights = await fetchFlights(paginatedFilters);
      setFlights(allFlights.flightList);
      setCurrentPage(allFlights.currentPageNr);
      setPageSize(allFlights.pageSize);
      setTotalElements(allFlights.totalElements);
      setTotalPages(allFlights.totalPages);
    } catch (error) {
      console.error('Failed to fetch flights for page: ', error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex justify-between px-2 py-1 items-center bg-gray-100 rounded-t border-b">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Size:</span> {pageSize} per page
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <button 
            onClick={() => handlePageChange((currentPage || 0) - 1)}
            disabled={currentPage === 0 || isLoading}
            className={`px-2 py-1 rounded ${currentPage === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
          >
            ← Prev
          </button>
          <span className="font-medium">Page:</span> {currentPage !== undefined ? currentPage + 1 : '-'} of {totalPages}
          <button 
            onClick={() => handlePageChange((currentPage || 0) + 1)}
            disabled={(currentPage !== undefined && totalPages !== undefined) ? currentPage >= totalPages - 1 : true}
            className={`px-2 py-1 rounded ${(currentPage !== undefined && totalPages !== undefined) && currentPage < totalPages - 1 ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-400 cursor-not-allowed'}`}
          >
            Next →
          </button>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Total:</span> {totalElements} flights
        </div>
      </div>
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

      <SeatOverlay
        seats={selectedSeats}
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        parameters={seatParameters}
      />
    </>
  );
};

export default FlightSection