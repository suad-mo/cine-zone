// FILM:
// Response at https://app.cineplexx.ba/api/v2/movies/coming-soon?location=all
// Response at https://app.cineplexx.ba/api/v2/movies?date=2025-05-16&location=all
// Parametri date i location su obavezni
// date - datum u formatu YYYY-MM-DD
// location - lokacija u formatu "all" ili "cinemaId"
// Vraća vrijednost niza filmova koji su u ponudi

export interface Tehnologies {
  tehnologies: string[][];
}

export interface MovieOld {
  id: string;
  posterImage: string;
  title: string;
  titleCalculated: string;
  titleOriginalCalculated: string;
  descriptionCalculated: string;
  descriptionShortCalculated: string;
  trailers: Trailer[];
  directors: any[];
  startDate: string;
  openingDate: string;
  genres: string[];
  genreId: string;
  comingSoon: boolean;
  isScheduledAtCinema: boolean;
  rating: string;
  runTime: number;
  gallery: string[];
  cinemaIds: string[];
  technologies: string[][];
}

export interface Trailer {
  trailerKey: string;
  keyframeUrl: string;
  videoUrl: string;
  iosUrl: string;
  androidUrl: string;
  universalPlayerUrl: string;
}

export interface FilmBase {
  id: string;
  // id: string;
  posterImage: string;
  // posterImage: string
  title: string;
  // title: string
  titleCalculated: string;
  // titleCalculated: string
  titleOriginalCalculated: string;
  // titleOriginalCalculated: string
  descriptionCalculated: string;
  // descriptionCalculated: string
  descriptionShortCalculated: string;
  // descriptionShortCalculated: string
  trailers: Trailer[];
  // trailers: Trailer[]
  directors: any[];
  // directors: any[]
  startDate: string;
  // startDate: string
  openingDate: string;
  // openingDate: string
  genres: string[];
  // genres: string[]
  genreId: string;
  // genreId: string
  comingSoon: boolean;
  // comingSoon: boolean
  isScheduledAtCinema: boolean;
  // isScheduledAtCinema: boolean
  rating: string;
  // rating: string;
  runTime: number;
  // runTime: number
  gallery: string[];
  // gallery: string[]
  cinemaIds: string[];
  // cinemaIds: string[]
}

export interface Movie {
  id: string;
  posterImage: string;
  title: string;
  titleCalculated: string;
  titleOriginalCalculated: string;
  descriptionCalculated: string;
  descriptionShortCalculated: string;
  trailers: Trailer[];
  directors: any[];
  startDate: string;
  openingDate: string;
  genres: string[];
  genreId: string;
  comingSoon: boolean;
  isScheduledAtCinema: boolean;
  rating: string;
  runTime: number;
  gallery: string[];
  cinemaIds: string[];

  //********************* */
  technologies?: string[][];

  //***************** */
  startTime?: string;
  titleTranslationsIndexed?: TranslationsIndexed;
  synopsisTranslationsIndexed?: TranslationsIndexed;
  shortSynopsisTranslationsIndexed?: TranslationsIndexed;
  synopsis?: string;
  HOFilmCode?: string;
  isComingSoon?: boolean;
  genreId2?: string;
  genreId3?: string;
  twitterTag?: string;
  titleTranslations?: Translation[];
  synopsisTranslations?: Translation[];
  shortSynopsisTranslations?: Translation[];
  openingMonth?: string;
  trueMaster?: boolean;
  top?: boolean;
  trailerKey?: string;
  display?: string;
  unixTimeFormat?: string;
}
// KINA:
// https://app.cineplexx.ba/api/v1/cinemas
// Vraća vrijednost niza kina

export interface Cinema {
  id: string;
  name: string;
  image: string;
  address1: string;
  address2: string;
  parkingInfo: string;
  arrivalInfo: string;
  loyaltyCode: string;
  publicTransport: string;
  workingHours: string;
  geo: Geo;
  hint: string;
  favorite: boolean;
  gallery: string[];
  social: Social[];
  isDriveInCinema: boolean;
}

export interface Geo {
  latitude: number;
  longitude: number;
}

export interface Social {
  url: string;
  title: string;
}

export interface CinemaBase {
  id: string;
  name: string;
  image: string;
  address1: string;
  address2: string;
  loyaltyCode: string;
  geo: Geo;
  favorite: boolean;
  gallery: string[];
  social: Social[];
  isDriveInCinema: boolean;
}

export interface CinemaInfo extends CinemaBase {
  parkingInfo: string;
  arrivalInfo: string;
  publicTransport: string;
  workingHours: string;
  hint: string;
}

export interface Translation {
  languageTag: string;
  text: string;
}

export interface TranslationsIndexed {
  'bs-Latn-BA': string;
}

export interface CinemaInfoTranslation extends CinemaBase {
  parkingInfo: {
    translations: Translation[];
  };
  arrivalInfo: {
    translations: Translation[];
  };
  publicTransport: {
    translations: Translation[];
  };
  workingHours: {
    translations: Translation[];
  };
  hint: {
    translations: Translation[];
  };
  info: {
    translations: Translation[];
  };
  yellowSeatsAvailablePercent: number;
}

export interface DateSession {
  date: string;
  sessions: Session[];
}

export interface Version {
  id: string;
  sorting: number;
  label: string;
}

export interface Session1 {
  id: string;
  cinemaId: string;
  movieId: string;
  sessionId: string;
  cinemaName: string;
  screenName: string;
  screenNumber: number;
  technologies: string[][];
  showtime: string;
  isAllocatedSeating: boolean;
  status: string;
  restrictions: Restrictions;
  cinemaIsFavorite: boolean;
}

export interface Session {
  id: string;
  cinemaId: string;
  movieId: string;
  sessionId: string;
  cinemaName: string;
  screenName: string;
  screenNumber: number;
  technologies: string[][];
  showtime: string;
  isAllocatedSeating: boolean;
  status: string;
  restrictions: Restrictions;
  cinemaIsFavorite: boolean;
  //***************** */
  allowChildAdmits?: boolean;
  seatsAvailable?: number;
  seatsTotal?: number;
  allowComplimentaryTickets?: boolean;
  priceGroupCode?: string;
  cinemaOperatorCode?: string;
  formatCode?: string;
  formatHOPK?: string;
  salesChannels?: string;
  sessionAttributesNames?: string[];
  conceptAttributesNames?: string[];
  allowTicketSales?: boolean;
  sessionBusinessDate?: string;
  sessionDisplayPriority?: number;
  soldoutStatus?: number;
  typeCode?: string;
  showtimeDate?: string;
  cinema?: Cinema;
  scheduledFilm?: ScheduledFilm;
  events?: any[];
  versions?: Version[];
}

export interface Restrictions {
  maxBonusCardTickets: number;
  maxTickets: number;
  maxReservedTickets: number;
  maxReservedBonusTickets: number;
  orderTTL: number;
  orderPaymentTTL: number;
  yellowSessionTTL: number;
  yellowSeatsAvailablePercent: number;
  redSessionTTL: number;
  greySessionTTL: number;
  boughtTicketTTL: number;
  pickupTimeLimit: number;
  pickupTimeLimitVip: number;
}

export interface ScheduledFilm {
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



export interface UserBalance {
  cardType: string
  cardBalance: number
  bonusCardExpiryDate: string
}

export interface ResponseWizard {
  scheduledFilm: ScheduledFilm
  session: Session
  restrictions: Restrictions
  userBalance: UserBalance
  hasChildTickets: boolean
}

/// Area i SeatPlan
export interface Area {
  areaCategoryCode: string
  displayName: string
  areaCategoryId: number
  areaCategories: AreaCategory[]
}

export interface AreaCategory {
  unique_id: string
  id: number
  displayName: string
  categoryColor: string
  picture: Picture
  title: string
  description: string
  image: string
}

export interface Picture {
  left?: string
  right?: string
  center?: string
}



