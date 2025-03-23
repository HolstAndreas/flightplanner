package com.holstandreas.srv.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.holstandreas.srv.dto.SeatResponseDTO;
import com.holstandreas.srv.model.Flight;
import com.holstandreas.srv.model.Seat;
import com.holstandreas.srv.model.enums.TravelClass;
import com.holstandreas.srv.repository.SeatRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SeatService {

  private final SeatRepository seatRepository;
  private final FlightService flightService;

  public List<SeatResponseDTO> getSeats(Long flightId) {

    Flight flight = flightService.getFlightById(flightId);
    List<Seat> seats = new ArrayList<>();

    if (flight != null) {
      seats = seatRepository.findByAircraftSize(flight.getAircraftSize());
    }

    return transformToSeatDTO(seats, flight.getStartingPrice());
  }

  private List<SeatResponseDTO> transformToSeatDTO(List<Seat> seats, Integer startingPrice) {

    List<SeatResponseDTO> seatResponse = new ArrayList<>();
    Random random = new Random();

    for (Seat seat : seats) {
      double coef = 1.0;
      if (seat.isHasLegspace()) {
        coef += 0.1;
      }
      if (seat.isHasWindow()) {
        coef += 0.1;
      }
      if (seat.getTravelClass() == TravelClass.BUSINESS) {
        coef = coef * 1.5;
      } else if (seat.getTravelClass() == TravelClass.FIRST) {
        coef = coef * 2.5;
      }

      boolean isTaken = random.nextBoolean();

      seatResponse.add(
          new SeatResponseDTO(seat.getId(), seat.getSeatRow(), seat.getSeatColumn(), seat.getTravelClass().toString(),
              seat.isHasWindow(), seat.isHasLegspace(), seat.isHasExit(), isTaken,
              (int) Math.ceil(startingPrice * coef)));
    }

    return seatResponse;
  }
}
