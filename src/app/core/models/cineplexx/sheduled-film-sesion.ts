export interface ScheduledFilmSesion {
  scheduledFilm: ScheduledFilm;
  session: Session;
  restrictions: Restrictions;
  hasChildTickets: boolean;
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
  film: Film;
}

export interface Film {
  id: string;
  posterImage: string;
  title: string;
  titleCalculated: string;
  titleOriginalCalculated: string;
  descriptionCalculated: string;
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

export interface Translation {
  languageTag: string;
  text: string;
}

export interface TranslationsIndexed {
  'bs-Latn-BA': string;
}

export interface Trailer {
  trailerKey: string;
  keyframeUrl: string;
  videoUrl: string;
  iosUrl: string;
  androidUrl: string;
  universalPlayerUrl: string;
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
  //************** */
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

  applyCoronaDistance?: boolean;
  allowBookingSplitting?: boolean;
  blackStatusCount?: number;
  numberOfRetries?: number;
  retryTimeout?: number;
  throttling?: number;
  timeout?: number;
  originalRestrictions?: OriginalRestrictions;
  movieImportBackDays?: number;
}

export interface OriginalRestrictions {
  maxBonusCardTickets: number;
  applyCoronaDistance: boolean;
  allowBookingSplitting: boolean;
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
  blackStatusCount: number;
  numberOfRetries: number;
  retryTimeout: number;
  throttling: number;
  timeout: number;
  movieImportBackDays: number;
}

export interface Cinema {
  id: string;
  name: string;
  image: string;
  gallery: string[];
  address1: string;
  address2: string;
  parkingInfo: ParkingInfo;
  arrivalInfo: ArrivalInfo;
  loyaltyCode: string;
  publicTransport: PublicTransport;
  workingHours: WorkingHours;
  favorite: boolean;
  geo: Geo;
  hint: Hint;
  yellowSeatsAvailablePercent: number;
  info: Info;
  social: Social[];
}

export interface ParkingInfo {
  translations: any[];
}

export interface ArrivalInfo {
  translations: any[];
}

export interface PublicTransport {
  translations: any[];
}

export interface WorkingHours {
  translations: Translation[];
}

export interface Translation {
  languageTag: string;
  text: string;
}

export interface Geo {
  latitude: number;
  longitude: number;
}

export interface Hint {
  translations: any[];
}

export interface Info {
  translations: Translation2[];
}

export interface Translation2 {
  languageTag: string;
  text: string;
}

export interface Social {
  url: string;
  title: string;
}

export interface Version {
  id: string;
  sorting: number;
  label: string;
}
