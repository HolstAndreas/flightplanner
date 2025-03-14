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

  const handleFlightSelection = async (flightId: string) => {
    try {
      // add real fetch here later
      console.log("Flight has been selected " + flightId)
    } catch (error) {
      console.error("Failure...")
    }
  };

  // const flights: Flight[] = [
  //   {
  //     flightId: "EE120",
  //     departureAirport: "Tallinn, Estonia (TLL)",
  //     departureDate: "20.03.2025",
  //     departureTime: "10:00",
  //     arrivalAirport: "Riga, Latvia (RGX)",
  //     arrivalDate: "20.03.2025",
  //     arrivalTime: "12:00",
  //     duration: "2h35min",
  //     startingPrice: 10,
  //   }
  // ]

  return (
    <div className="bg-white">
      {flights.map((flight: Flight) => (

        <FlightElement 
          key={flight.flightId}
          flight={flight}
          onClick={() => handleFlightSelection(flight.flightId)}
        />
      ))};
    </div>
  )
}

export default FlightSection