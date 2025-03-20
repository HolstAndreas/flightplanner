import { Flight } from "../types"

const FlightElement = ({flight, onClick}: {flight: Flight; onClick: () => void }) => {
  return (
    <div 
      className="flex w-full border-b cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={onClick}
    >
      {/* Departure date */}
      <div className="flex flex-col items-center justify-center w-fit p-4 text-xl bg-gray-100">
        {flight.departureDate}
      </div>
      {/* Departure */}
      <div className="flex flex-1 pl-4 justify-between items-center">
        <div className="flex flex-col pr-2 items-start">
          <div><span className="font-semibold text-lg">{flight.departureCity}</span>, {flight.departureCountry}</div>
          <div className="text-sm text-gray-600">{flight.departureAirport} ({flight.departureIataCode})</div>
        </div>
        <div className="flex items-center px-4 h-full text-2xl bg-gray-100">
          {flight.departureTime}
        </div>
      </div>
      {/* Duration */}
      <div className="flex items-center bg-gray-100">
        <div className="w-fit min-w-[80px] text-center border-b-2 border-gray-500">
          {flight.duration}
        </div>
      </div>
      {/* Arrival */}
      <div className="flex flex-1 pr-4 justify-between items-center">
        <div className="flex flex-col items-center justify-center px-4 h-full text-2xl bg-gray-100">
          <div>{flight.arrivalTime}</div>
          {flight.arrivalDate !== flight.departureDate && (
            <div className="text-xs">(+1)</div>
          )}
        </div>
        <div className="flex flex-col flex-1 pr-2 pl-4 items-start">
        <div><span className="font-semibold text-lg">{flight.arrivalCity}</span>, {flight.arrivalCountry}</div>
        <div className="text-sm text-gray-600">{flight.arrivalAirport} ({flight.arrivalIataCode})</div>
        </div>
      </div>
      {/* Price */}
      <div className="flex flex-col justify-center px-2 items-center bg-amber-100">
        <div className="text-xs opacity-70">starting from</div>
        <div className="flex text-xl font-bold justify-center">{flight.startingPrice}€</div>
      </div>
    </div>
  )
}

export default FlightElement