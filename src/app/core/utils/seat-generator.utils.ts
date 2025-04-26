import { Seat } from "../models";

/// Funkcija za generisanje mape sjedala
/// @param rows Broj redova sjedala
/// @param columns Broj kolona sjedala
/// @returns Mapa sjedala kao dvodimenzionalni niz objekata sjedala
/// gdje je 10% sjedala rezervisano, a 90% dostupno
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
/// Funkcija za generisanje inicijalne mape sjedala
/// @param rows Broj redova sjedala
/// @param columns Broj kolona sjedala
/// gdje su sva mjesta dostupna
export function generateInitialSeatMap(rows: number, columns: number): Seat[][] {
  const seatMap: Seat[][] = [];

  for (let row = 0; row < rows; row++) {
    const seatRow: Seat[] = [];
    for (let col = 0; col < columns; col++) {
      seatRow.push({
        row,
        column: col,
        status: 'available', // Sva mjesta su dostupna
      });
    }
    seatMap.push(seatRow);
  }

  return seatMap;
}

