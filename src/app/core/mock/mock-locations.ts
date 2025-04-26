import { Location } from "../models";
import { generateInitialSeatMap } from "../utils/seat-generator.utils";

export const MOCK_LOCATIONS: Location[] = [
  {
    id: 1,
    name: 'Kino Zvijezda Mostar',
    address: 'Fejićeva 15, 88000 Mostar',
    halls: [
      {
        id: 1,
        name: 'Hall 1',
        seatMap: generateInitialSeatMap(5, 8),
        seatCapacity: 40,
      },
      {
        id: 2,
        name: 'Hall 2',
        seatMap: generateInitialSeatMap(7, 10),
        seatCapacity: 70,
      },
    ],
  },
  {
    id: 2,
    name: 'Kino Palas Mostar',
    address: 'Trg kralja Tomislava 1, 88000 Mostar',
    halls: [
      {
        id: 3,
        name: 'Hall 3',
        seatMap: generateInitialSeatMap(6, 9),
        seatCapacity: 54,

      },
      {
        id: 4,
        name: 'Hall 4',
        seatMap: generateInitialSeatMap(8, 12),
        seatCapacity: 96,

      },
    ]
  },
];


// export const MOCK_LOCATIONS_2: Location[] = [
//   {
//     id: 2,
//     name: 'Kino Palas Mostar',
//     address: 'Trg kralja Tomislava 1, 88000 Mostar',
//     halls: [
//       {
//         id: 3,
//         name: 'Hall 3',
//         seatMap: generateSeatMap(6, 9),
//         seatCapacity: 54,
//         projections: [
//           {
//             id: 13,
//             filmId: 5, // Kralj nad kraljevima
//             hallId: 3,
//             locationId: 2,
//             dateTime: '2025-04-21T19:00:00',
//             availableSeats: 54,
//             price: 7.5,
//           },
//           {
//             id: 14,
//             filmId: 6, // Kraljevi ljeta
//             hallId: 3,
//             locationId: 2,
//             dateTime: '2025-04-21T21:30:00',
//             availableSeats: 54,
//             price: 7.5,
//           },
//           {
//             id: 15,
//             filmId: 8, // Šaban Bajramović
//             hallId: 3,
//             locationId: 2,
//             dateTime: '2025-04-22T19:00:00',
//             availableSeats: 54,
//             price: 7.5,
//           },
//           {
//             id: 16,
//             filmId: 4, // Igra straha
//             hallId: 3,
//             locationId: 2,
//             dateTime: '2025-04-22T21:30:00',
//             availableSeats: 54,
//             price: 7.5,
//           },
//           {
//             id: 17,
//             filmId: 6, // Kraljevi ljeta
//             hallId: 3,
//             locationId: 2,
//             dateTime: '2025-04-23T19:00:00',
//             availableSeats: 54,
//             price: 7.5,
//           },
//           {
//             id: 18,
//             filmId: 7, // Minecraft
//             hallId: 3,
//             locationId: 2,
//             dateTime: '2025-04-23T21:30:00',
//             availableSeats: 54,
//             price: 7.5,
//           },
//         ],
//       },
//       {
//         id: 4,
//         name: 'Hall 4',
//         seatMap: generateSeatMap(8, 12),
//         seatCapacity: 96,
//         projections: [
//           {
//             id: 19,
//             filmId: 1, // Amater
//             hallId: 4,
//             locationId: 2,
//             dateTime: '2025-04-21T18:30:00',
//             availableSeats: 96,
//             price: 7.5,
//           },
//           {
//             id: 20,
//             filmId: 2, // Balkanika
//             hallId: 4,
//             locationId: 2,
//             dateTime: '2025-04-21T21:00:00',
//             availableSeats: 96,
//             price: 7.5,
//           },
//           {
//             id: 21,
//             filmId: 3, // Grešnici
//             hallId: 4,
//             locationId: 2,
//             dateTime: '2025-04-22T18:30:00',
//             availableSeats: 96,
//             price: 7.5,
//           },
//           {
//             id: 22,
//             filmId: 5, // Kralj nad kraljevima
//             hallId: 4,
//             locationId: 2,
//             dateTime: '2025-04-22T21:00:00',
//             availableSeats: 96,
//             price: 7.5,
//           },
//           {
//             id: 23,
//             filmId: 4, // Igra straha
//             hallId: 4,
//             locationId: 2,
//             dateTime: '2025-04-23T18:30:00',
//             availableSeats: 96,
//             price: 7.5,
//           },
//           {
//             id: 24,
//             filmId: 8, // Šaban Bajramović
//             hallId: 4,
//             locationId: 2,
//             dateTime: '2025-04-23T21:00:00',
//             availableSeats: 96,
//             price: 7.5,
//           },
//         ],
//       },
//     ]
//   },
// ]
