import { RandomUserApiResponse } from '@/modules/infinite-feed/types/user';

const API_URL = 'https://randomuser.me/api/';

/**
 * Получение пользователей из API.
 * @param page Номер страницы.
 * @param count Количество элементов на страницу.
 * @returns Данные с API в формате RandomUserApiResponse.
 * @throws Ошибка запроса.
 */
export const fetchUsersFromApi = async (
  page: number,
  count: number = 10,
): Promise<RandomUserApiResponse> => {
  const response = await fetch(`${API_URL}?page=${page}&results=${count}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
