export interface Seat {
  // id: number;
  row: number;
  column: number;
  status: 'available' | 'reserved' | 'selected';
  // isAvailable: boolean;
  // isSelected: boolean;
  // price: number;
  // projectionId: number;
  // cinemaHallId: number;
  // filmId: number;
}
