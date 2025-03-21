export type Flight = {
  flightId: string,
  departureIataCode: string,
  departureCountry: string,
  departureCity: string,
  departureAirport: string,
  departureDate: string,
  departureTime: string,
  arrivalIataCode: string,
  arrivalCountry: string,
  arrivalCity: string,
  arrivalAirport: string,
  arrivalDate: string,
  arrivalTime: string,
  duration: string,
  startingPrice: number,
}

export type FlightResponse = {
  flights: Flight[],
  currentPageNr: number,
  pageSize: number,
  totalElements: number,
  totalPages: number
}