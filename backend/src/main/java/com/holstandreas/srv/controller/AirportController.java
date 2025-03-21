package com.holstandreas.srv.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.holstandreas.srv.dto.AirportResponseDTO;
import com.holstandreas.srv.service.AirportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AirportController {

  private final AirportService airportService;

  @GetMapping("/airports")
  public ResponseEntity<AirportResponseDTO> getAirports() {

    AirportResponseDTO response = airportService.getAirports();

    return ResponseEntity.ok(response);
  }
}
