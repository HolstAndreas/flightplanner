package com.holstandreas.srv.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FlightFilterDTO {
  private String departureAirport;
  private String departureCountry;
  private String departureCity;
  private String arrivalAirport;
  private String arrivalCountry;
  private String arrivalCity;
  private String startingDate;
  private String endingDate;
  private String duration;
  private Integer maxPrice;
}
