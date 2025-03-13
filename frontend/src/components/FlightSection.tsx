import { useEffect, useState } from "react"
import FlightElement from "./FlightElement"
import { fetchAllFlights } from "../service/flight-service";
import { Flight } from "../types";

const FlightSection = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFlights = async () => {    
      try {
        const data = await fetchAllFlights();
        setFlights(data);
      } catch (error) {
        console.error('Failed to fetch flights: ', error);
      }
    };

    loadFlights();
    setIsLoading(false);
  }, []);

  return (
    <div>
      {flights.map((flight: Flight) => (

        <FlightElement flight={flight}/>
      ))};
    </div>
  )
}

export default FlightSection