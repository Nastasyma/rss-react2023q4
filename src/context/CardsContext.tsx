import { PropsWithChildren, createContext, useState } from 'react';
import { ICard } from '../utils/types';

type CardsContextType = {
  cards: ICard[];
  setCards: (setCards: ICard[]) => void;
};

export const CardsContext = createContext<CardsContextType | null>(null);

export function CardsProvider({ children }: PropsWithChildren): JSX.Element {
  const [cards, setCards] = useState<ICard[]>([]);

  return <CardsContext.Provider value={{ cards, setCards }}>{children}</CardsContext.Provider>;
}
