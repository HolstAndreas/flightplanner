package com.holstandreas.srv.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.holstandreas.srv.model.Flight;
import com.holstandreas.srv.service.FlightService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FlightController {

  private final FlightService flightService;

  @GetMapping("/flights")
  public ResponseEntity<List<Flight>> getFlights() {

    List<Flight> response = flightService.getFlights();

    return ResponseEntity.ok(response);
  }

}
