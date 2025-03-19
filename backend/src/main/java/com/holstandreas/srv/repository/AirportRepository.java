package com.holstandreas.srv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.holstandreas.srv.model.Airport;

public interface AirportRepository extends JpaRepository<Airport, Long> {

}
