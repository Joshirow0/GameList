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