import { Seat } from "./seat-plan.entity"
import { Session } from "./session.entity"

export interface Order {
  ticketsInfo: TicketsInfo
  id: string
  cinemaId: string
  userSessionId: string
  orderTotalValueInCents: number
  state: string
  createdAt: string
  modifiedAt: string
  cinemaName: string

  // ticketsInfo: TicketsInfo
  // id: string
  // cinemaId: string
  // userSessionId: string
  // orderTotalValueInCents: number
  session: Session
  tickets: Ticket[]
  // state: string
  bookingDate: string
  // createdAt: string
  // modifiedAt: string
  selection: Selection[]
  // cinemaName: string
}

export interface TicketsInfo {
  row: string
  columns: string
}

export interface Ticket {
  id: string
  ticketDetails: TicketDetails
  seats: Seat[]
}

export interface TicketDetails {
  ticketTypeCode: string
  finalPriceInCents: number
  isLoyaltyTicket: boolean
  isChildOnlyTicket: boolean
  description: string
}
