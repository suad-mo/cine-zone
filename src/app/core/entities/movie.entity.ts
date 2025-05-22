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

export interface Trailer {
  trailerKey: string;
  keyframeUrl: string;
  videoUrl: string;
  iosUrl: string;
  androidUrl: string;
  universalPlayerUrl: string;
}

export interface Translation {
  languageTag: string;
  text: string;
}

export interface TranslationsIndexed {
  'bs-Latn-BA': string;
}
