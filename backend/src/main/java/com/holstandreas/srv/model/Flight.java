package com.holstandreas.srv.model;

import java.time.LocalDateTime;

import com.holstandreas.srv.model.enums.AircraftSize;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "flights")
public class Flight {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  private String departureAirport;

  @NotNull
  private LocalDateTime departureTime;

  @NotNull
  private String arrivalAirport;

  @NotNull
  private LocalDateTime arrivalTime;

  @NotNull
  private Integer duration;

  @NotNull
  @Enumerated(EnumType.STRING)
  private AircraftSize aircraftSize;

  @NotNull
  @Min(0)
  private Double startingPrice;

}
