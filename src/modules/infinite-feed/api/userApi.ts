import { RandomUserApiResponse } from '@/modules/infinite-feed/types/user';

const API_URL = 'https://randomuser.me/api/';

/**
 * Fetch users from the Random User API.
 * @async
 * @function fetchUsersFromApi
 * @param {number} page - The page number for paginated results.
 * @param {number} count - The number of users to fetch per request.
 * @returns {Promise<RandomUserApiResponse>} The API response containing user data.
 * @throws Will throw an error if the request fails.
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
