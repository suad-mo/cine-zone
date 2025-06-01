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
