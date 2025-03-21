package com.holstandreas.srv.controller;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.holstandreas.srv.dto.FlightDTO;
import com.holstandreas.srv.dto.FlightFilterDTO;
import com.holstandreas.srv.service.FlightService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FlightController {

  private final FlightService flightService;

  @GetMapping("/flights")
  public ResponseEntity<List<FlightDTO>> getFlights(
      @RequestParam(required = false, defaultValue = "0") Integer page,
      @RequestParam(required = false, defaultValue = "10") Integer size,
      @RequestParam(required = false, defaultValue = "date_asc") String sort,
      @RequestParam(required = false) String departureAirport,
      @RequestParam(required = false) String departureCountry,
      @RequestParam(required = false) String departureCity,
      @RequestParam(required = false) String arrivalAirport,
      @RequestParam(required = false) String arrivalCountry,
      @RequestParam(required = false) String arrivalCity,
      @RequestParam(required = false) String startingDate,
      @RequestParam(required = false) String endingDate,
      @RequestParam(required = false) String duration,
      @RequestParam(required = false) Integer maxPrice) {

    Pageable pageRequest = PageRequest.of(page, size);
    FlightFilterDTO filters = new FlightFilterDTO(departureAirport, departureCountry, departureCity, arrivalAirport,
        arrivalCountry, arrivalCity, startingDate, endingDate, duration, maxPrice);
    List<FlightDTO> response = flightService.getFlights(pageRequest, sort, filters);

    return ResponseEntity.ok(response);
  }

}
