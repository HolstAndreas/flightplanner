package com.holstandreas.srv.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.holstandreas.srv.model.Airport;
import com.holstandreas.srv.model.Flight;
import com.holstandreas.srv.model.Seat;
import com.holstandreas.srv.model.enums.AircraftSize;
import com.holstandreas.srv.model.enums.TravelClass;
import com.holstandreas.srv.repository.AirportRepository;
import com.holstandreas.srv.repository.FlightRepository;
import com.holstandreas.srv.repository.SeatRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

  private static final int PLANNED_DAYS = 200;
  private static final int EARTH_RADIUS_KM = 6371;
  private static final int AVG_FLIGHT_SPEED = 800;
  private static final int DATABASE_SIZE = 100;

  private final AirportRepository airportRepository;
  private final FlightRepository flightRepository;
  private final SeatRepository seatRepository;

  @Bean
  CommandLineRunner initDatabase() {
    return args -> {

      if (flightRepository.count() == 0) {
        generateFlights();
      }

      if (seatRepository.count() == 0) {
        generateSeats();
      }
    };
  }

  private void generateFlights() {

    List<Airport> airports = airportRepository.findAll();

    Random random = new Random();

    for (int i = 0; i <= DATABASE_SIZE; i++) {
      Flight newFlight = new Flight();

      Airport departureAirport = airports.get(random.nextInt(airports.size()));
      Airport arrivalAirport = airports.get(random.nextInt(airports.size()));

      while (departureAirport == arrivalAirport) {
        arrivalAirport = airports.get(random.nextInt(airports.size()));
      }

      newFlight.setDepartureAirport(departureAirport);
      newFlight.setArrivalAirport(arrivalAirport);

      LocalDate start = LocalDate.now().plusDays(1 + random.nextInt(PLANNED_DAYS));
      LocalDateTime departureTime = start.atTime(random.nextInt(24), random.nextInt(12) * 5);

      newFlight.setDepartureTime(departureTime);

      double distance = calculateDistance(departureAirport, arrivalAirport);
      double duration = (Math.round((distance / AVG_FLIGHT_SPEED) * 10.0) / 10.0) + 1;

      newFlight.setDuration(duration);

      LocalDateTime arrivalTime = departureTime.plusHours((long) Math.floor(duration))
          .plusMinutes((long) ((duration - Math.floor(duration)) * 60));

      newFlight.setArrivalTime(arrivalTime);

      // fuel cost, price per liter, passangers, consider it 30% of the travel cost
      Integer size = random.nextInt(10);
      if (size < 4) {
        newFlight.setAircraftSize(AircraftSize.M);
        newFlight.setStartingPrice((int) Math.ceil(((distance * 8 * 0.7) / 100 / 0.3)));
      } else if (size < 8) {
        newFlight.setAircraftSize(AircraftSize.L);
        newFlight.setStartingPrice((int) Math.ceil((distance * 12 * 0.7) / 150 / 0.3));
      } else {
        newFlight.setAircraftSize(AircraftSize.XL);
        newFlight.setStartingPrice((int) Math.ceil((distance * 15 * 0.7) / 200 / 0.3));
      }

      flightRepository.save(newFlight);
    }
  }

  private void generateSeats() {

    // Generate seats for M plane
    for (int i = 1; i <= 30; i++) {
      for (int j = 65; j <= 70; j++) {
        Seat newSeat = new Seat();
        newSeat.setSeatRow(i);
        newSeat.setSeatColumn(String.valueOf((char) j));
        newSeat.setAircraftSize(AircraftSize.M);

        if (i < 8) {
          newSeat.setTravelClass(TravelClass.BUSINESS);
        } else {
          newSeat.setTravelClass(TravelClass.TOURIST);
        }

        if (j == 65 || j == 70) {
          newSeat.setHasWindow(true);
        } else {
          newSeat.setHasWindow(false);
        }

        if (i == 11 || i == 12) {
          newSeat.setHasLegspace(true);
        } else {
          newSeat.setHasLegspace(false);
        }

        if (i < 4 || i > 30 - 3) {
          newSeat.setHasExit(true);
        } else {
          newSeat.setHasExit(false);
        }

        seatRepository.save(newSeat);
      }
    }

    // Generate seats for L aircraft size
    for (int i = 1; i <= 42; i++) {
      for (int j = 65; j <= 73; j++) {
        Seat newSeat = new Seat();
        newSeat.setSeatRow(i);
        newSeat.setSeatColumn(String.valueOf((char) j));
        newSeat.setAircraftSize(AircraftSize.L);

        if (i < 9) {
          newSeat.setTravelClass(TravelClass.FIRST);
        } else if (i < 16) {
          newSeat.setTravelClass(TravelClass.BUSINESS);
        } else {
          newSeat.setTravelClass(TravelClass.TOURIST);
        }

        if (j == 65 || j == 73) {
          newSeat.setHasWindow(true);
        } else {
          newSeat.setHasWindow(false);
        }

        if (i == 16 || i == 27) {
          newSeat.setHasLegspace(true);
        } else {
          newSeat.setHasLegspace(false);
        }

        if (i < 4 || i > 42 - 3 || (i > 8 - 3 && i < 14) || (i > 26 - 3 && i < 30)) {
          newSeat.setHasExit(true);
        } else {
          newSeat.setHasExit(false);
        }

        seatRepository.save(newSeat);
      }
    }

    // Generate seats for XL flight
    for (int i = 1; i <= 60; i++) {
      for (int j = 65; j <= 73; j++) {
        Seat newSeat = new Seat();
        newSeat.setSeatRow(i);
        newSeat.setSeatColumn(String.valueOf((char) j));
        newSeat.setAircraftSize(AircraftSize.XL);

        if (i < 9) {
          newSeat.setTravelClass(TravelClass.FIRST);
        } else if (i < 20) {
          newSeat.setTravelClass(TravelClass.BUSINESS);
        } else {
          newSeat.setTravelClass(TravelClass.TOURIST);
        }

        if (j == 65 || j == 73) {
          newSeat.setHasWindow(true);
        } else {
          newSeat.setHasWindow(false);
        }

        if (i == 20 || i == 50) {
          newSeat.setHasLegspace(true);
        } else {
          newSeat.setHasLegspace(false);
        }

        if (i < 4 || i > 60 - 3 || (i > 8 - 3 && i < 14) || (i > 26 - 3 && i < 30) || (i > 43 - 3 && i < 46)) {
          newSeat.setHasExit(true);
        } else {
          newSeat.setHasExit(false);
        }

        seatRepository.save(newSeat);
      }
    }
  }

  // Distance between airports with Haversine formula
  private double calculateDistance(Airport departure, Airport arrival) {
    double lat1Rad = Math.toRadians(departure.getLatitude());
    double lon1Rad = Math.toRadians(departure.getLongitude());
    double lat2Rad = Math.toRadians(arrival.getLatitude());
    double lon2Rad = Math.toRadians(arrival.getLongitude());

    double dLat = lat2Rad - lat1Rad;
    double dLon = lon2Rad - lon1Rad;

    double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c;
  }
}
