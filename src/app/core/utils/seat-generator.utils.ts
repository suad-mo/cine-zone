import { Seat } from "../models";

export function generateSeatMap(rows: number, columns: number): Seat[][] {
  const seatMap: Seat[][] = [];

  for (let row = 0; row < rows; row++) {
    const seatRow: Seat[] = [];
    for (let col = 0; col < columns; col++) {
      seatRow.push({
        row,
        column: col,
        status: Math.random() < 0.1 ? 'reserved' : 'available',//10% zauzetih mjesta
      });
    }
    seatMap.push(seatRow);
  }

  return seatMap;
}
