package com.holstandreas.srv.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.holstandreas.srv.dto.AirportDTO;
import com.holstandreas.srv.dto.AirportResponseDTO;
import com.holstandreas.srv.model.Airport;
import com.holstandreas.srv.repository.AirportRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AirportService {

  private final AirportRepository airportRepository;

  public AirportResponseDTO getAirports() {

    List<Airport> airports = airportRepository.findAllByOrderByAirportAsc();

    return transformAirportList(airports);
  }

  private AirportResponseDTO transformAirportList(List<Airport> airports) {
    Set<String> countrySet = new HashSet<>();
    Set<String> citySet = new HashSet<>();
    List<AirportDTO> airportList = new ArrayList<>();

    for (Airport airport : airports) {
      countrySet.add(airport.getCountry());
      citySet.add(airport.getCity());

      airportList.add(new AirportDTO(airport.getAirport(), airport.getIataCode()));
    }

    List<String> countryList = new ArrayList<>(countrySet);
    List<String> cityList = new ArrayList<>(citySet);
    Collections.sort(countryList);
    Collections.sort(cityList);

    return new AirportResponseDTO(countryList, cityList, airportList);
  }
}
