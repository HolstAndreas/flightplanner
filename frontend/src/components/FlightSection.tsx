import { useEffect, useState } from "react"
import FlightElement from "./FlightElement"
import { fetchFlights } from "../service/flight-service";
import { Flight } from "../types";
import SortingElement from "./ui/SortingElement";

const FlightSection = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState('date_asc')

  useEffect(() => {
    const loadFlights = async () => {    
      try {
        const allFlights = await fetchFlights();
        setFlights(allFlights);
      } catch (error) {
        console.error('Failed to fetch flights: ', error);
      }
    };

    loadFlights();
    setIsLoading(false);
  }, []);

  const handleFlightSelection = async (flightId: string) => {
    try {
      // add real fetch here later
      console.log("Flight has been selected " + flightId)
    } catch (error) {
      console.error("Failure...")
    }
  };

  const handleSortChange = (sortBy: string) => {
    console.log("Sort changed to: " + sortBy);
    setCurrentSort(sortBy);
  }

  return (
    <div>
      <SortingElement 
        onSortChange={handleSortChange}
        currentSort={currentSort}
      />
      <div className="bg-white">
        {flights.map((flight: Flight) => (

          <FlightElement 
            key={flight.flightId}
            flight={flight}
            onClick={() => handleFlightSelection(flight.flightId)}
          />
        ))};
      </div>
    </div>
  )
}

export default FlightSection