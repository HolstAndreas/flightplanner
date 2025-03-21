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
      WHERE (cast(:departureAirport as string) is NULL OR dep.iataCode = :departureAirport)
      AND (cast(:departureCountry as string) IS NULL OR dep.country = :departureCountry)
      AND (cast(:departureCity as string) IS NULL OR dep.city = :departureCity)
      AND (cast(:arrivalAirport as string) IS NULL OR arr.iataCode = :arrivalAirport)
      AND (cast(:arrivalCountry as string) IS NULL OR arr.country = :arrivalCountry)
      AND (cast(:arrivalCity as string) IS NULL OR arr.city = :arrivalCity)
      AND (cast(:startingDate as timestamp) IS NULL OR f.departureTime >= :startingDate)
      AND (cast(:endingDate as timestamp) IS NULL OR f.departureTime <= :endingDate)
      AND (cast(:duration as double) IS NULL OR f.duration <= :duration)
      AND (cast(:maxPrice as integer) IS NULL OR f.startingPrice <= :maxPrice)
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
      @Param("duration") Double duration,
      @Param("maxPrice") Integer maxPrice,
      Pageable pageable);
}
