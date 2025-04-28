import { Projection } from "../models";
import { generateSeatMap } from "../utils/seat-generator.utils";

export const MOCK_PROJECTIONS: Projection[] = [
  {
    id: 1,
    filmId: 1, // Amater
    hallId: 1,
    locationId: 1,
    dateTime: '2025-04-21T18:00:00',
    availableSeats: 40,
    price: 7.5,
    seatMap: generateSeatMap(5, 8), // Assuming hallId 1 has 5 rows and 8 columns
  },
  {
    id: 2,
    filmId: 3, // Grešnici
    hallId: 1,
    locationId: 1,
    dateTime: '2025-04-21T20:30:00',
    availableSeats: 40,
    price: 7.5,
    seatMap: generateSeatMap(5, 8), // Assuming hallId 1 has 5 rows and 8 columns
  },
  {
    id: 3,
    filmId: 5, // Kralj nad kraljevima
    hallId: 1,
    locationId: 1,
    dateTime: '2025-04-22T18:00:00',
    availableSeats: 40,
    price: 7.5,
    seatMap: generateSeatMap(5, 8), // Assuming hallId 1 has 5 rows and 8 columns
  },
  {
    id: 4,
    filmId: 2, // Balkanika
    hallId: 1,
    locationId: 1,
    dateTime: '2025-04-22T20:30:00',
    availableSeats: 40,
    price: 7.5,
    seatMap: generateSeatMap(5, 8), // Assuming hallId 1 has 5 rows and 8 columns
  },
  {
    id: 5,
    filmId: 3, // Grešnici
    hallId: 1,
    locationId: 1,
    dateTime: '2025-04-23T18:00:00',
    availableSeats: 40,
    price: 7.5,
    seatMap: generateSeatMap(5, 8), // Assuming hallId 1 has 5 rows and 8 columns
  },
  {
    id: 6,
    filmId: 1, // Amater
    hallId: 1,
    locationId: 1,
    dateTime: '2025-04-23T20:30:00',
    availableSeats: 40,
    price: 7.5,
    seatMap: generateSeatMap(5, 8), // Assuming hallId 1 has 5 rows and 8 columns
  },
  {
    id: 7,
    filmId: 7, // Minecraft
    hallId: 2,
    locationId: 1,
    dateTime: '2025-04-21T17:30:00',
    availableSeats: 70,
    price: 7.5,
    seatMap: generateSeatMap(7, 10), // Assuming hallId 2 has 7 rows and 10 columns
  },
  {
    id: 8,
    filmId: 4, // Igra straha
    hallId: 2,
    locationId: 1,
    dateTime: '2025-04-21T20:00:00',
    availableSeats: 70,
    price: 7.5,
    seatMap: generateSeatMap(7, 10), // Assuming hallId 2 has 7 rows and 10 columns
  },
  {
    id: 9,
    filmId: 6, // Kraljevi ljeta
    hallId: 2,
    locationId: 1,
    dateTime: '2025-04-22T17:30:00',
    availableSeats: 70,
    price: 7.5,
    seatMap: generateSeatMap(7, 10), // Assuming hallId 2 has 7 rows and 10 columns
  },
  {
    id: 10,
    filmId: 8, // Šaban Bajramović
    hallId: 2,
    locationId: 1,
    dateTime: '2025-04-22T20:00:00',
    availableSeats: 70,
    price: 7.5,
    seatMap: generateSeatMap(7, 10), // Assuming hallId 2 has 7 rows and 10 columns
  },
  {
    id: 11,
    filmId: 7, // Minecraft
    hallId: 2,
    locationId: 1,
    dateTime: '2025-04-23T17:30:00',
    availableSeats: 70,
    price: 7.5,
    seatMap: generateSeatMap(7, 10), // Assuming hallId 2 has 7 rows and 10 columns
  },
  {
    id: 12,
    filmId: 2, // Balkanika
    hallId: 2,
    locationId: 1,
    dateTime: '2025-04-23T20:00:00',
    availableSeats: 70,
    price: 7.5,
    seatMap: generateSeatMap(7, 10), // Assuming hallId 2 has 7 rows and 10 columns
  },
  {
    id: 13,
    filmId: 5, // Kralj nad kraljevima
    hallId: 3,
    locationId: 2,
    dateTime: '2025-04-21T19:00:00',
    availableSeats: 54,
    price: 7.5,
    seatMap: generateSeatMap(6, 9), // Assuming hallId 3 has 6 rows and 9 columns
  },
  {
    id: 14,
    filmId: 6, // Kraljevi ljeta
    hallId: 3,
    locationId: 2,
    dateTime: '2025-04-21T21:30:00',
    availableSeats: 54,
    price: 7.5,
    seatMap: generateSeatMap(6, 9), // Assuming hallId 3 has 6 rows and 9 columns
  },
  {
    id: 15,
    filmId: 8, // Šaban Bajramović
    hallId: 3,
    locationId: 2,
    dateTime: '2025-04-22T19:00:00',
    availableSeats: 54,
    price: 7.5,
    seatMap: generateSeatMap(6, 9), // Assuming hallId 3 has 6 rows and 9 columns
  },
  {
    id: 16,
    filmId: 4, // Igra straha
    hallId: 3,
    locationId: 2,
    dateTime: '2025-04-22T21:30:00',
    availableSeats: 54,
    price: 7.5,
    seatMap: generateSeatMap(6, 9), // Assuming hallId 3 has 6 rows and 9 columns
  },
  {
    id: 17,
    filmId: 6, // Kraljevi ljeta
    hallId: 3,
    locationId: 2,
    dateTime: '2025-04-23T19:00:00',
    availableSeats: 54,
    price: 7.5,
    seatMap: generateSeatMap(6, 9), // Assuming hallId 3 has 6 rows and 9 columns
  },
  {
    id: 18,
    filmId: 7, // Minecraft
    hallId: 3,
    locationId: 2,
    dateTime: '2025-04-23T21:30:00',
    availableSeats: 54,
    price: 7.5,
    seatMap: generateSeatMap(6, 9), // Assuming hallId 3 has 6 rows and 9 columns
  },
  {
    id: 19,
    filmId: 1, // Amater
    hallId: 4,
    locationId: 2,
    dateTime: '2025-04-21T18:30:00',
    availableSeats: 96,
    price: 7.5,
    seatMap: generateSeatMap(8, 12), // Assuming hallId 4 has 8 rows and 12 columns
  },
  {
    id: 20,
    filmId: 2, // Balkanika
    hallId: 4,
    locationId: 2,
    dateTime: '2025-04-21T21:00:00',
    availableSeats: 96,
    price: 7.5,
    seatMap: generateSeatMap(8, 12), // Assuming hallId 4 has 8 rows and 12 columns
  },
  {
    id: 21,
    filmId: 3, // Grešnici
    hallId: 4,
    locationId: 2,
    dateTime: '2025-04-22T18:30:00',
    availableSeats: 96,
    price: 7.5,
    seatMap: generateSeatMap(8, 12), // Assuming hallId 4 has 8 rows and 12 columns
  },
  {
    id: 22,
    filmId: 5, // Kralj nad kraljevima
    hallId: 4,
    locationId: 2,
    dateTime: '2025-04-22T21:00:00',
    availableSeats: 96,
    price: 7.5,
    seatMap: generateSeatMap(8, 12), // Assuming hallId 4 has 8 rows and 12 columns
  },
  {
    id: 23,
    filmId: 4, // Igra straha
    hallId: 4,
    locationId: 2,
    dateTime: '2025-04-23T18:30:00',
    availableSeats: 96,
    price: 7.5,
    seatMap: generateSeatMap(8, 12), // Assuming hallId 4 has 8 rows and 12 columns
  },
  {
    id: 24,
    filmId: 8, // Šaban Bajramović
    hallId: 4,
    locationId: 2,
    dateTime: '2025-04-23T21:00:00',
    availableSeats: 96,
    price: 7.5,
    seatMap: generateSeatMap(8, 12), // Assuming hallId 4 has 8 rows and 12 columns
  },
];
