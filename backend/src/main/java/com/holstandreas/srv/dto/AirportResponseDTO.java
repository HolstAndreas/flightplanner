package com.holstandreas.srv.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AirportResponseDTO {
  private List<String> countries;
  private List<String> cities;
  private List<AirportDTO> airports;
}
