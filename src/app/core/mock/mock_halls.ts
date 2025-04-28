import { Hall } from '../models';
import { generateInitialSeatMap } from '../utils/seat-generator.utils';

export const MOCK_HALLS: Hall[] = [
  {
    id: 1,
    idLocation: 1,
    name: 'Hall 1',
    type: '2D',
    description: 'A cozy hall with 40 seats, perfect for enjoying movies.',
    rows: 5,
    columns: 8,
    seatMap: generateInitialSeatMap(5, 8),
    seatCapacity: 40,
  },
  {
    id: 2,
    idLocation: 1,
    name: 'Hall 2',
    type: '3D',
    description: 'A spacious hall with modern technology.',
    rows: 7,
    columns: 10,
    seatMap: generateInitialSeatMap(7, 10),
    seatCapacity: 70,
  },
  {
    id: 3,
    idLocation: 2,
    name: 'Hall 3',
    type: '4K',
    description: 'An advanced hall with 54 seats for a premium experience.',
    rows: 6,
    columns: 9,
    seatMap: generateInitialSeatMap(6, 9),
    seatCapacity: 54,
  },
  {
    id: 4,
    idLocation: 2,
    name: 'Hall 4',
    type: 'IMAX',
    description: 'An IMAX hall with 96 seats for an immersive experience.',
    rows: 8,
    columns: 12,
    seatMap: generateInitialSeatMap(8, 12),
    seatCapacity: 96,
  },
];

// {
//   id: 1,
//   name: 'Sala 1',
//   locationId: 1,
//   seats: 40,
//   type: '2D',
//   description: 'Sala sa 40 mesta, savršena za uživanje u filmovima.',
//   price: 7.5,
// },
// {
//   id: 2,
//   name: 'Sala 2',
//   locationId: 1,
//   seats: 50,
//   type: '3D',
//   description: 'Prostrana sala sa savremenom tehnologijom.',
//   price: 8.0,
// }
