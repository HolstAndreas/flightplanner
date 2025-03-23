package com.holstandreas.srv.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SeatResponseDTO {
  private Long seatId;
  private Integer seatRow;
  private String seatColumn;
  private String travelClass;
  private boolean hasWindow;
  private boolean hasLegSpace;
  private boolean hasExit;
  private boolean isTaken;
  private Integer price;
}
