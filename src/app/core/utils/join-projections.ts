import { Film, Hall, Location, Projection } from "../models";

export function generateProjectionViewModels(
  films: Film[],
  locations: Location[]
): ProjectionViewModel[] {
  const viewModels: ProjectionViewModel[] = [];
  for (const location of locations) {
    for (const hall of location.halls) {
      for (const projection of hall.projections) {
        const film = films.find((f) => f.id === projection.filmId);
        if (film) {
          viewModels.push({
            projection,
            hall,
            location,
            film,
          });
        }
      }
    }
  }
  return viewModels;
}

export interface ProjectionViewModel {
  projection: Projection;
  hall: Hall;
  location: Location;
  film: Film;
}
