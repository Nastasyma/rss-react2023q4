import { ICard } from './types';

export async function fetchCards(searchText?: string | null, page = 1, itemsPerPage = 4) {
  let url = `https://mock-server-api-nastasyma.vercel.app/catalog?_limit=${itemsPerPage}&_page=${page}`;
  if (searchText && searchText.trim() !== '') {
    url += `&title_like=${searchText}`;
  }

  const response = await fetch(url);
  const data: ICard[] = await response.json();
  const totalCountHeader = response.headers.get('X-Total-Count');

  return { data, totalCountHeader };
}

export async function fetchDetailedCard(id: string) {
  const url = `https://mock-server-api-nastasyma.vercel.app/catalog/${id}`;

  const response = await fetch(url);
  const data: ICard = await response.json();
  return data;
}
