export interface SeatPlan {
  rows: Row[]
  rowsMax: number
  icons: Icon[]
}

export interface Row {
  physicalName: string
  seats: Seat[]
  number: number
  areaCategoryCode: string
  description: string
  right: number
  bottom: number
  height: number
  columnCount: number
}

export interface Seat {
  columnIndex: number
  statusCalculated: number
  doubleSeatId: string
  position: Position
  id: string
  status: number
  seatStyle: number
  seatsInGroup: number[]
  originalStatus: number
  seatIconId: number
  seatImprovedIconId: number
  areaCategoryCode: string
  rowName: number
  normalizedRowIndex: number
  rowRight: number
  normalizedColumnIndex: number
}

export interface Position {
  rowIndex: number
  columnIndex: number
  areaNumber: number
}

export interface Icon {
  id: number
  imageUrl: string
}
