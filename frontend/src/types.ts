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
  flightList: Flight[],
  currentPageNr: number,
  pageSize: number,
  totalElements: number,
  totalPages: number
}

export type Airport = {
  name: string,
  iataCode: string,
}

export type LocationResponse = {
  cities: string[],
  countries: string[],
  airports: Airport[],
}

export type SeatsResponse = {
  seatRow: number,
  seatColumn: string,
  travelClass: string,
  hasWindow: boolean,
  hasLegspace: boolean,
  hasExit: boolean,
  isTaken: boolean,
  price: number,
}