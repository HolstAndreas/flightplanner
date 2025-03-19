package com.holstandreas.srv.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Airport {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  private String iataCode;

  @NotNull
  private String airport;

  @NotNull
  private String city;

  @NotNull
  private String country;

  @NotNull
  private Double longitude;

  @NotNull
  private Double latitude;

  @NotNull
  private Integer timezone;

  @OneToMany(mappedBy = "departureAirport")
  private List<Flight> departureFlights;

  @OneToMany(mappedBy = "arrivalAirport")
  private List<Flight> arrivalFlights;
}
