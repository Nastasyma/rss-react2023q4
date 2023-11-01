export interface ICard {
  id: number;
  title: string;
  edibility: string;
  image: string;
  habitat: string[];
  season: string;
  description: string;
}

export enum RoutesName {
  home = '/',
}
