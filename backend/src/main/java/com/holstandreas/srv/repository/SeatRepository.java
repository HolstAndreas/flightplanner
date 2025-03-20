package com.holstandreas.srv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.holstandreas.srv.model.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long> {
}
