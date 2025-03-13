package com.holstandreas.srv.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.holstandreas.srv.model.Flight;
import com.holstandreas.srv.repository.FlightRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FlightService {

  private final FlightRepository flightRepository;

  public List<Flight> getFlights() {

    List<Flight> allflights = flightRepository.findAll();

    return allflights;
  }
}
