import { Flight } from "../types"

const FlightElement = ({flight, onClick}: {flight: Flight; onClick: () => void }) => {
  return (
    <div 
      className="flex w-full h-12 border-b cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-full w-fit p-4 text-xl bg-gray-100">
        {flight.departureDate}
      </div>
      {/* Departure */}
      <div className="flex flex-1 pl-4 justify-between items-center">
        <div className="flex pr-2 items-center">
          {flight.departureAirport}
        </div>
        <div className="flex items-center px-4 h-full text-2xl bg-gray-100">
          {flight.departureTime}
        </div>
      </div>
      {/* Duration */}
      <div className="bg-gray-100 h-full">
        <div className="w-fit px-4 border-b-2 border-gray-500">
          {flight.duration}
        </div>
      </div>
      {/* Arrival */}
      <div className="flex flex-1 pr-4 justify-between items-center">
        <div className="flex items-center px-4 h-full text-2xl bg-gray-100">
          <div>{flight.arrivalTime}</div>
          {/* <div>{flight.arrivalDate}</div> */}
        </div>
        <div className="flex flex-1 pr-2 pl-4 items-center">
          {flight.arrivalAirport}
        </div>
      </div>
      {/* Price */}
      <div className="justify-end px-2 items-center h-full bg-amber-100">
        <div className="text-xs pt-1 opacity-70">starting from</div>
        <div className="flex text-xl font-bold justify-center">{flight.startingPrice}€</div>
      </div>
    </div>
  )
}

export default FlightElement