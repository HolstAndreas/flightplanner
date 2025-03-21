package com.holstandreas.srv.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AirportDTO {
  private String name;
  private String iataCode;
}
