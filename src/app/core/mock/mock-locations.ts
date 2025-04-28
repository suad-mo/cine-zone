import { Location } from "../models";
import { generateInitialSeatMap } from "../utils/seat-generator.utils";

export const MOCK_LOCATIONS: Location[] = [
  {
    id: 1,
    name: 'Kino Zvijezda Mostar',
    address: 'Fejićeva 15, 88000 Mostar',
    city: 'Mostar',
    postalCode: '88000',
    idsHalls: [1, 2],
  },
  {
    id: 2,
    name: 'Kino Palas Mostar',
    address: 'Trg kralja Tomislava 1, 88000 Mostar',
    city: 'Mostar',
    postalCode: '88000',
    idsHalls: [3, 4],
  },

];
