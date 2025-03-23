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
  seatId: number,
  seatRow: number,
  seatColumn: string,
  travelClass: string,
  hasWindow: boolean,
  hasLegSpace: boolean,
  hasExit: boolean,
  taken: boolean,
  price: number,
}

export type SeatRecommendationParameters = {
  seatsAmount: number,
  hasWindow: boolean,
  hasLegspace: boolean,
  hasExit: boolean,
  travelClass?: string
}