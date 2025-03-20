package com.holstandreas.srv.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.holstandreas.srv.dto.FlightDTO;
import com.holstandreas.srv.model.Airport;
import com.holstandreas.srv.model.Flight;
import com.holstandreas.srv.repository.FlightRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FlightService {

  private final FlightRepository flightRepository;

  public List<FlightDTO> getFlights() {

    List<Flight> allFlights = flightRepository.findAll();

    return transformList(allFlights);
  }

  private List<FlightDTO> transformList(List<Flight> allFlights) {
    List<FlightDTO> flights = new ArrayList<>();

    for (Flight flight : allFlights) {
      FlightDTO newFlight = new FlightDTO();

      newFlight.setFlightId(flight.getId());
      newFlight.setStartingPrice(flight.getStartingPrice());

      Airport departureAirport = flight.getDepartureAirport();
      newFlight.setDepartureIataCode(departureAirport.getIataCode());
      newFlight.setDepartureCountry(departureAirport.getCountry());
      newFlight.setDepartureCity(departureAirport.getCity());
      newFlight.setDepartureAirport(departureAirport.getAirport());

      Airport arrivalAirport = flight.getArrivalAirport();
      newFlight.setArrivalIataCode(arrivalAirport.getIataCode());
      newFlight.setArrivalCountry(arrivalAirport.getCountry());
      newFlight.setArrivalCity(arrivalAirport.getCity());
      newFlight.setArrivalAirport(arrivalAirport.getAirport());

      newFlight.setDepartureDate(getDate(flight.getDepartureTime()));
      newFlight.setDepartureTime(getTime(flight.getDepartureTime()));

      newFlight.setArrivalDate(getDate(flight.getArrivalTime()));
      newFlight.setArrivalTime(getTime(flight.getArrivalTime()));

      newFlight.setDuration(durationToString(flight.getDuration()));

      flights.add(newFlight);
    }

    return flights;
  }

  private String getDate(LocalDateTime time) {
    String day = time.getDayOfMonth() + "";
    String month = time.getMonthValue() + "";

    return (day.length() == 1 ? "0" + day : day) + "." + (month.length() == 1 ? "0" + month : month) + "."
        + time.getYear();
  }

  private String getTime(LocalDateTime time) {
    String hour = time.getHour() + "";
    String minute = time.getMinute() + "";

    return (hour.length() == 1 ? "0" + hour : hour) + ":" + (minute.length() == 1 ? "0" + minute : minute);
  }

  private String durationToString(Double duration) {
    return (int) Math.floor(duration) + "h" + ((int) (duration - Math.floor(duration)) * 60) + "min";
  }
}
