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
import com.holstandreas.srv.service.FlightService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FlightController {

  private final FlightService flightService;

  @GetMapping("/flights")
  public ResponseEntity<List<FlightDTO>> getFlights(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    Pageable pageRequest = PageRequest.of(page, size);
    List<FlightDTO> response = flightService.getFlights(pageRequest);

    return ResponseEntity.ok(response);
  }

}
