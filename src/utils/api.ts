import { ICard } from './types';

export async function fetchCards(searchText?: string, page = 1, itemsPerPage = 4) {
  let url = `https://mock-server-api-nastasyma.vercel.app/catalog?_limit=${itemsPerPage}&_page=${page}`;
  if (searchText && searchText.trim() !== '') {
    url += `&title_like=${searchText}`;
  }

  const response = await fetch(url);
  const data: ICard[] = await response.json();
  return data;
}
