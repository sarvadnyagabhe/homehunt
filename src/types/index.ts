export interface CityType {
  id: number;
  name: string;
}

export interface AreaType {
  id: number;
  name: string;
  city_id: number;
}

export interface LocalityType {
  area_id: number;
  city_id: number;
  id: number;
  name: string;
  ranking: number;
}

export interface locationType {
  area_id: number | null;
  city_id: number | null;
  id: number | null;
  name: string;
  ranking: number | null;
  city_name: string;
  area_name: string;
  locality_name: string;
}

export interface workLocationType {
  location_id: number;
  area_id: number;
  city_id: number;
}
