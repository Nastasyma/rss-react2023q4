import { describe } from 'node:test';
import { expect, it, vi } from 'vitest';
import { fetchDetailedCard } from '../utils/api';

describe('fetchDetailedCard', () => {
  it('fetch a detailed card by id', async () => {
    const id = '1';

    const mockData = {
      id: 1,
      title: 'Card 1',
      edibility: 'Edible',
      image: 'card-image.jpg',
      habitat: [],
      season: 'June',
      description: 'Card description',
    };

    const response = { json: vi.fn().mockResolvedValue(mockData) };
    global.fetch = vi.fn().mockResolvedValue(response);

    const data = await fetchDetailedCard(id);
    const url = `https://mock-server-api-nastasyma.vercel.app/catalog/${id}`;

    expect(global.fetch).toHaveBeenCalledWith(url);

    expect(data).toEqual({
      id: 1,
      title: 'Card 1',
      edibility: 'Edible',
      image: 'card-image.jpg',
      habitat: [],
      season: 'June',
      description: 'Card description',
    });
  });
});
