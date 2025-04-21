import { Projection } from "../models";
import { MOCK_FILMS } from "./mock-films";
import { MOCK_LOCATIONS } from "./mock-locations";

function getPrice(genre: string, hallId: number): number {
  const priceMap: Record<number, Record<string, number>> = {
    1: {
      Drama: 6.5,
      Komedija: 6.0,
      Dokumentarni: 5.0,
    },
    2: {
      Akcija: 8.0,
      Horor: 7.5,
      Biografski: 6.5,
      Porodični: 6.0,
    },
  };
  return priceMap[hallId]?.[genre] || 7.5; // Default price if genre not found
}

// Ekstrahovanje svih projekcija iz MOCK_LOCATIONS
const allProjections: Projection[] = [];

MOCK_LOCATIONS.forEach((location) => {
  location.halls.forEach((hall) => {
    hall.projections.forEach((proj) => {
      const film = MOCK_FILMS.find((f) => f.id === proj.filmId);
      const genre = film?.genre[0] ?? "Drama";
      allProjections.push({
        ...proj,
        price: getPrice(genre, hall.id),
      });
    });
  });
});

// Grupisanje po danu (YYYY-MM-DD)
export const MOCK_PROJECTIONS_BY_DAY: Record<string, Projection[]> = {};

allProjections.forEach((proj) => {
  const day = proj.dateTime.split("T")[0];
  if (!MOCK_PROJECTIONS_BY_DAY[day]) {
    MOCK_PROJECTIONS_BY_DAY[day] = [];
  }
  MOCK_PROJECTIONS_BY_DAY[day].push(proj);
});
