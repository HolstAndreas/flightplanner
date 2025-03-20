package com.holstandreas.srv.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FlightDTO {

  private Long flightId;
  private String departureIataCode;
  private String departureCountry;
  private String departureCity;
  private String departureAirport;
  private String departureDate;
  private String departureTime;
  private String arrivalIataCode;
  private String arrivalCountry;
  private String arrivalCity;
  private String arrivalAirport;
  private String arrivalDate;
  private String arrivalTime;
  private String duration;
  private Integer startingPrice;

}
