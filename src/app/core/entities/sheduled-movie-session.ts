import { Movie } from "./movie.entity";
import { Restrictions, Session } from "./session.entity";

export interface ScheduledMovieSession {
    scheduledFilm: ScheduledMovie;
    session: Session;
    restrictions: Restrictions;
    hasChildTickets: boolean;
}

export interface ScheduledMovie {
  id: string;
  scheduledFilmId: string;
  cinemaId: string;
  title: string;
  ageRating: string;
  openingDate: string;
  duration: string;
  HOFilmCode: string;
  film: Movie;
}
