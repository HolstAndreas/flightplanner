package com.holstandreas.srv.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Table(name = "flights")
public class Flight {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  private String depAirport;

  @NotNull
  private LocalDate depDate;

  @NotNull
  private LocalTime depTime;

  @NotNull
  private String arrAirport;

  @NotNull
  private LocalDate arrDate;

  @NotNull
  private LocalTime arrTime;

  @NotNull
  private Integer duration;

  @NotNull
  private String aircraft;

  @NotNull
  private Double price;

}
