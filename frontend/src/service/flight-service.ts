import axios from "axios";
import { FlightResponse, LocationResponse, SeatsResponse } from "../types";

const API_URL = '/api';

interface FlightFilters {
  departureAirport?: string,
  departureCountry?: string,
  departureCity?: string,
  arrivalAirport?: string,
  arrivalCountry?: string,
  arrivalCity?: string,
  startingDate?: string,
  endingDate?: string,
  duration?: string;
  maxPrice?: string;
  sortColumn?: string;
  sortDirection?: string;
}

export const fetchFlights = async (filters?: FlightFilters): Promise<FlightResponse> => {
  try {
    const response = await axios.get(`${API_URL}/flights`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: filters
    });

    return response.data;

  } catch (error) {
    console.error('Failed to fetch flights: ', error);
    throw error;
  }
}

export const fetchLocations = async (): Promise<LocationResponse> => {
  try {
    const response = await axios.get(`${API_URL}/airports`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch location filters: ', error);
    throw error;
  }
}

export const fetchSeats = async (flightId: string): Promise<SeatsResponse[]> => {
  try {
    const response = await axios.get(`${API_URL}/seats`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: { flightId }
    });

    return response.data
  } catch (error) {
    console.error('Failed to fetch seats: ', error);
    throw error;
  }
}