import { CinemaLocation } from "../models";
import { generateSeatMap } from "../utils/seat-generator.utils";

export const MOCK_LOCATIONS: CinemaLocation[] = [
  {
    id: 1,
    name: 'Kino Zvijezda Mostar',
    address: 'Fejićeva 15, 88000 Mostar',
    halls: [
      {
        id: 1,
        name: 'Hall 1',
        seatMap: generateSeatMap(5, 8), // 5 rows, 8 columns
        seatCapacity: 40,
        projections: [],
      },
      {
        id: 2,
        name: 'Hall 2',
        seatMap: generateSeatMap(7, 10),
        seatCapacity: 70, // 7 rows, 10 columns
        projections: [],
      },
    ],
  },
];
