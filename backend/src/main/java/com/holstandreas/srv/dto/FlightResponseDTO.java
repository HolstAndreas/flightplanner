package com.holstandreas.srv.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FlightResponseDTO {
  private List<FlightDTO> flightList;
  private int currentPageNr;
  private int pageSize;
  private long totalElements;
  private int totalPages;

}
