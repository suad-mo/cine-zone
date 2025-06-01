export interface DateSessions {
  date: string
  sessions: Session[]
}

export interface Session {
  id: string
  cinemaId: string
  movieId: string
  sessionId: string
  cinemaName: string
  screenName: string
  screenNumber: number
  technologies: string[][]
  showtime: string
  isAllocatedSeating: boolean
  status: string
  restrictions: Restrictions
  cinemaIsFavorite: boolean
}

export interface Restrictions {
  maxBonusCardTickets: number
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
  //******************************** */
  applyCoronaDistance?: boolean
  allowBookingSplitting?: boolean
  blackStatusCount?: number
  numberOfRetries?: number
  retryTimeout?: number
  throttling?: number
  timeout?: number
  originalRestrictions?: OriginalRestrictions
  movieImportBackDays?: number
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
