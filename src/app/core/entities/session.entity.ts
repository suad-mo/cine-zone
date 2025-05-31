export interface MovieSessions {
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
}
