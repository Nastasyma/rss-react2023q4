import { PropsWithChildren, createContext, useState } from 'react';

type SearchContextType = {
  searchText: string;
  setSearchText: (text: string) => void;
};

export const SearchContext = createContext<SearchContextType>(null!);

export function SearchProvider({ children }: PropsWithChildren): JSX.Element {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
}
