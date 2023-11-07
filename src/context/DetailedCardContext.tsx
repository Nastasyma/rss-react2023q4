import { PropsWithChildren, createContext, useState } from 'react';
import { ICard } from '../utils/types';

type DetailedCardContextType = {
  card: ICard;
  setCard: (setCard: ICard) => void;
};

export const DetailedCardContext = createContext<DetailedCardContextType | null>(null);

export function DetailedCardProvider({ children }: PropsWithChildren): JSX.Element {
  const [card, setCard] = useState<ICard>({} as ICard);

  return (
    <DetailedCardContext.Provider value={{ card, setCard }}>
      {children}
    </DetailedCardContext.Provider>
  );
}
