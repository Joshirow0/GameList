export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
}

export interface GameResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface GameDetails extends Game {
  description_raw: string;
  website: string;
  playtime: number;
  publishers: { name: string }[];
  platforms: { platform: { name: string } }[];
}