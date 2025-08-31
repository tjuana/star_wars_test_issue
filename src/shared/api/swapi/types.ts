export interface Person {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
  id?: string // extracted from url
}

export interface SwapiList<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ListPeopleParams {
  page?: number
  search?: string
  pageSize?: number // SWAPI supports page_size param (max 100)
}

export interface Film {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  created: string
  edited: string
  url: string
  id?: string
}

export interface Vehicle {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  vehicle_class: string
  pilots: string[]
  films: string[]
  created: string
  edited: string
  url: string
  id?: string
}

export interface Starship {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: string[]
  films: string[]
  created: string
  edited: string
  url: string
  id?: string
}

export interface Species {
  name: string
  classification: string
  designation: string
  average_height: string
  skin_colors: string
  hair_colors: string
  eye_colors: string
  average_lifespan: string
  homeworld: string
  language: string
  people: string[]
  films: string[]
  created: string
  edited: string
  url: string
  id?: string
}
