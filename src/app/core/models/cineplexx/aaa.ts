export interface Root {
  scheduledFilm: ScheduledFilm
  session: Session
  restrictions: Restrictions2
  hasChildTickets: boolean
}

export interface ScheduledFilm {
  id: string
  scheduledFilmId: string
  cinemaId: string
  title: string
  ageRating: string
  openingDate: string
  duration: string
  HOFilmCode: string
  film: Film
}

export interface Film {
  startDate: string
  startTime: string
  titleTranslationsIndexed: TitleTranslationsIndexed
  synopsisTranslationsIndexed: SynopsisTranslationsIndexed
  shortSynopsisTranslationsIndexed: ShortSynopsisTranslationsIndexed
  id: string
  title: string
  rating: string
  synopsis: string
  HOFilmCode: string
  runTime: number
  openingDate: string
  isComingSoon: boolean
  isScheduledAtCinema: boolean
  genreId: string
  genreId2: string
  genreId3: string
  twitterTag: string
  titleTranslations: TitleTranslation[]
  synopsisTranslations: SynopsisTranslation[]
  shortSynopsisTranslations: ShortSynopsisTranslation[]
  openingMonth: string
  directors: any[]
  trueMaster: boolean
  top: boolean
  cinemaIds: string[]
  trailerKey: string
  trailers: Trailer[]
  gallery: string[]
  titleCalculated: string
  titleOriginalCalculated: string
  descriptionCalculated: string
  descriptionShortCalculated: string
  comingSoon: boolean
  posterImage: string
  display: string
  genres: string[]
  unixTimeFormat: string
}

export interface TitleTranslationsIndexed {
  "bs-Latn-BA": string
}

export interface SynopsisTranslationsIndexed {
  "bs-Latn-BA": string
}

export interface ShortSynopsisTranslationsIndexed {
  "bs-Latn-BA": string
}

export interface TitleTranslation {
  languageTag: string
  text: string
}

export interface SynopsisTranslation {
  languageTag: string
  text: string
}

export interface ShortSynopsisTranslation {
  languageTag: string
  text: string
}

export interface Trailer {
  trailerKey: string
  keyframeUrl: string
  videoUrl: string
  iosUrl: string
  androidUrl: string
  universalPlayerUrl: string
}

export interface Session {
  cinemaName: string
  cinemaIsFavorite: boolean
  id: string
  sessionId: string
  cinemaId: string
  movieId: string
  showtime: string
  status: string
  isAllocatedSeating: boolean
  allowChildAdmits: boolean
  seatsAvailable: number
  seatsTotal: number
  allowComplimentaryTickets: boolean
  priceGroupCode: string
  screenName: string
  screenNumber: number
  cinemaOperatorCode: string
  formatCode: string
  formatHOPK: string
  salesChannels: string
  sessionAttributesNames: string[]
  conceptAttributesNames: string[]
  allowTicketSales: boolean
  sessionBusinessDate: string
  sessionDisplayPriority: number
  soldoutStatus: number
  typeCode: string
  showtimeDate: string
  restrictions: Restrictions
  cinema: Cinema
  scheduledFilm: ScheduledFilm2
  events: any[]
  technologies: string[][]
  versions: Version[]
}

export interface Restrictions {
  maxBonusCardTickets: number
  applyCoronaDistance: boolean
  allowBookingSplitting: boolean
  maxTickets: number
  maxReservedTickets: number
  maxReservedBonusTickets: number
  orderTTL: number
  orderPaymentTTL: number
  yellowSessionTTL: number
  yellowSeatsAvailablePercent: number
  redSessionTTL: number
  greySessionTTL: number
  boughtTicketTTL: number
  pickupTimeLimit: number
  pickupTimeLimitVip: number
  blackStatusCount: number
  numberOfRetries: number
  retryTimeout: number
  throttling: number
  timeout: number
  originalRestrictions: OriginalRestrictions
  movieImportBackDays: number
}

export interface OriginalRestrictions {
  maxBonusCardTickets: number
  applyCoronaDistance: boolean
  allowBookingSplitting: boolean
  maxTickets: number
  maxReservedTickets: number
  maxReservedBonusTickets: number
  orderTTL: number
  orderPaymentTTL: number
  yellowSessionTTL: number
  yellowSeatsAvailablePercent: number
  redSessionTTL: number
  greySessionTTL: number
  boughtTicketTTL: number
  pickupTimeLimit: number
  pickupTimeLimitVip: number
  blackStatusCount: number
  numberOfRetries: number
  retryTimeout: number
  throttling: number
  timeout: number
  movieImportBackDays: number
}

export interface Cinema {
  id: string
  name: string
  image: string
  gallery: string[]
  address1: string
  address2: string
  parkingInfo: ParkingInfo
  arrivalInfo: ArrivalInfo
  loyaltyCode: string
  publicTransport: PublicTransport
  workingHours: WorkingHours
  favorite: boolean
  geo: Geo
  hint: Hint
  yellowSeatsAvailablePercent: number
  info: Info
  social: Social[]
}

export interface ParkingInfo {
  translations: any[]
}

export interface ArrivalInfo {
  translations: any[]
}

export interface PublicTransport {
  translations: any[]
}

export interface WorkingHours {
  translations: Translation[]
}

export interface Translation {
  languageTag: string
  text: string
}

export interface Geo {
  latitude: number
  longitude: number
}

export interface Hint {
  translations: any[]
}

export interface Info {
  translations: Translation2[]
}

export interface Translation2 {
  languageTag: string
  text: string
}

export interface Social {
  url: string
  title: string
}

export interface ScheduledFilm2 {
  id: string
  scheduledFilmId: string
  cinemaId: string
  title: string
  ageRating: string
  openingDate: string
  duration: string
  HOFilmCode: string
  film: Film2
}

export interface Film2 {
  startDate: string
  startTime: string
  titleTranslationsIndexed: TitleTranslationsIndexed2
  synopsisTranslationsIndexed: SynopsisTranslationsIndexed2
  shortSynopsisTranslationsIndexed: ShortSynopsisTranslationsIndexed2
  id: string
  title: string
  rating: string
  synopsis: string
  HOFilmCode: string
  runTime: number
  openingDate: string
  isComingSoon: boolean
  isScheduledAtCinema: boolean
  genreId: string
  genreId2: string
  genreId3: string
  twitterTag: string
  titleTranslations: TitleTranslation2[]
  synopsisTranslations: SynopsisTranslation2[]
  shortSynopsisTranslations: ShortSynopsisTranslation2[]
  openingMonth: string
  directors: any[]
  trueMaster: boolean
  top: boolean
  cinemaIds: string[]
  trailerKey: string
  trailers: Trailer2[]
  gallery: string[]
  titleCalculated: string
  titleOriginalCalculated: string
  descriptionCalculated: string
  descriptionShortCalculated: string
  comingSoon: boolean
  posterImage: string
  display: string
  genres: string[]
  unixTimeFormat: string
}

export interface TitleTranslationsIndexed2 {
  "bs-Latn-BA": string
}

export interface SynopsisTranslationsIndexed2 {
  "bs-Latn-BA": string
}

export interface ShortSynopsisTranslationsIndexed2 {
  "bs-Latn-BA": string
}

export interface TitleTranslation2 {
  languageTag: string
  text: string
}

export interface SynopsisTranslation2 {
  languageTag: string
  text: string
}

export interface ShortSynopsisTranslation2 {
  languageTag: string
  text: string
}

export interface Trailer2 {
  trailerKey: string
  keyframeUrl: string
  videoUrl: string
  iosUrl: string
  androidUrl: string
  universalPlayerUrl: string
}

export interface Version {
  id: string
  sorting: number
  label: string
}

export interface Restrictions2 {
  maxBonusCardTickets: number
  applyCoronaDistance: boolean
  allowBookingSplitting: boolean
  maxTickets: number
  maxReservedTickets: number
  maxReservedBonusTickets: number
  orderTTL: number
  orderPaymentTTL: number
  yellowSessionTTL: number
  yellowSeatsAvailablePercent: number
  redSessionTTL: number
  greySessionTTL: number
  boughtTicketTTL: number
  pickupTimeLimit: number
  pickupTimeLimitVip: number
  blackStatusCount: number
  numberOfRetries: number
  retryTimeout: number
  throttling: number
  timeout: number
  originalRestrictions: OriginalRestrictions2
  movieImportBackDays: number
}

export interface OriginalRestrictions2 {
  maxBonusCardTickets: number
  applyCoronaDistance: boolean
  allowBookingSplitting: boolean
  maxTickets: number
  maxReservedTickets: number
  maxReservedBonusTickets: number
  orderTTL: number
  orderPaymentTTL: number
  yellowSessionTTL: number
  yellowSeatsAvailablePercent: number
  redSessionTTL: number
  greySessionTTL: number
  boughtTicketTTL: number
  pickupTimeLimit: number
  pickupTimeLimitVip: number
  blackStatusCount: number
  numberOfRetries: number
  retryTimeout: number
  throttling: number
  timeout: number
  movieImportBackDays: number
}
