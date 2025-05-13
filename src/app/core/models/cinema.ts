// FILM:
// Response at https://app.cineplexx.ba/api/v2/movies/coming-soon?location=all
// Response at https://app.cineplexx.ba/api/v2/movies?date=2025-05-16&location=all
// Parametri date i location su obavezni
// date - datum u formatu YYYY-MM-DD
// location - lokacija u formatu "all" ili "cinemaId"
// Vraća vrijednost niza filmova koji su u ponudi

export interface Movie {
  id: string
  posterImage: string
  title: string
  titleCalculated: string
  titleOriginalCalculated: string
  descriptionCalculated: string
  descriptionShortCalculated: string
  trailers: Trailer[]
  directors: any[]
  startDate: string
  openingDate: string
  genres: string[]
  genreId: string
  comingSoon: boolean
  isScheduledAtCinema: boolean
  rating: string
  runTime: number
  gallery: string[]
  cinemaIds: string[]
  technologies: string[][]
}

export interface Trailer {
  trailerKey: string
  keyframeUrl: string
  videoUrl: string
  iosUrl: string
  androidUrl: string
  universalPlayerUrl: string
}


// KINA:
// https://app.cineplexx.ba/api/v1/cinemas
// Vraća vrijednost niza kina

export interface Cinema {
  id: string
  name: string
  image: string
  address1: string
  address2: string
  parkingInfo: string
  arrivalInfo: string
  loyaltyCode: string
  publicTransport: string
  workingHours: string
  geo: Geo
  hint: string
  favorite: boolean
  gallery: string[]
  social: Social[]
  isDriveInCinema: boolean
}

export interface Geo {
  latitude: number
  longitude: number
}

export interface Social {
  url: string
  title: string
}
