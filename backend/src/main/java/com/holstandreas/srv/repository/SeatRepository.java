package com.holstandreas.srv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.holstandreas.srv.model.Seat;
import com.holstandreas.srv.model.enums.AircraftSize;

public interface SeatRepository extends JpaRepository<Seat, Long> {

  List<Seat> findByAircraftSize(AircraftSize aircraftSize);
}
