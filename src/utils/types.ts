export interface ICard {
  title: string;
  edibility: string;
  image: string;
  habitat: string[];
  season: string;
  description: string;
  id?: number;
}

export enum RoutesName {
  home = '/',
}
