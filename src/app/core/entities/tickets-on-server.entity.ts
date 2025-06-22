import { Order } from "./order.entity"
import { SeatPlan } from "./seat-plan.entity"

export interface TicketsOnServer {
  seatPlan: SeatPlan
  order: Order
}
