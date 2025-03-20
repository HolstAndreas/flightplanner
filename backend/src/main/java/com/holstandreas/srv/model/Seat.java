package com.holstandreas.srv.model;

import com.holstandreas.srv.model.enums.AircraftSize;
import com.holstandreas.srv.model.enums.TravelClass;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "seats")
public class Seat {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated
  private AircraftSize aircraftSize;

  private Integer seatRow;

  private String seatColumn;

  @Enumerated
  private TravelClass travelClass;

  private boolean hasWindow;

  private boolean hasLegspace;

  private boolean hasExit;
}
