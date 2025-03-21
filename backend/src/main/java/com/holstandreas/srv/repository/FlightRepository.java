package com.holstandreas.srv.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.holstandreas.srv.model.Flight;

public interface FlightRepository extends JpaRepository<Flight, Long> {

  Page<Flight> findAll(Pageable pageable);

  @Query("""
      SELECT DISTINCT f FROM Flight f
      JOIN f.departureAirport dep
      JOIN f.arrivalAirport arr
      WHERE (:departureAirport is NULL OR dep.iataCode = :departureAirport)
      AND (:departureCountry IS NULL OR dep.country = :departureCountry)
      AND (:departureCity IS NULL OR dep.city = :departureCity)
      AND (:arrivalAirport IS NULL OR arr.iataCode = :arrivalAirport)
      AND (:arrivalCountry IS NULL OR arr.country = :arrivalCountry)
      AND (:arrivalCity IS NULL OR arr.city = :arrivalCity)
      AND (:startingDate IS NULL OR f.departureTime >= :startingDate)
      AND (:endingDate IS NULL OR f.departureTime <= :endingDate)
      AND (:maxDuration IS NULL OR f.duration <= :duration)
      AND (:maxPrice IS NULL OR f.startingPrice <= :maxPrice)
      """)
  Page<Flight> findWithFilters(
      @Param("departureAirport") String departureAirport,
      @Param("departureCountry") String departureCountry,
      @Param("departureCity") String departureCity,
      @Param("arrivalAirport") String arrivalAirport,
      @Param("arrivalCountry") String arrivalCountry,
      @Param("arrivalCity") String arrivalCity,
      @Param("startingDate") LocalDateTime startingDate,
      @Param("endingDate") LocalDateTime endingDate,
      @Param("maxDuration") Double maxDuration,
      @Param("maxPrice") Integer maxPrice,
      Pageable pageable);
}
