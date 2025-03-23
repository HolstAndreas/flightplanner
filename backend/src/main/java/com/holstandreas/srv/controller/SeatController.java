package com.holstandreas.srv.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.holstandreas.srv.dto.SeatResponseDTO;
import com.holstandreas.srv.service.SeatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SeatController {

  private final SeatService seatService;

  @GetMapping("/seats")
  public ResponseEntity<List<SeatResponseDTO>> getSeats(@RequestParam Long flightId) {

    List<SeatResponseDTO> response = seatService.getSeats(flightId);

    return ResponseEntity.ok(response);
  }
}
