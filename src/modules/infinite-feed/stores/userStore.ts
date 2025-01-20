import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchUsersFromApi } from '@/modules/infinite-feed/api/userApi';
import { User } from '@/modules/infinite-feed/types/user';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Pinia store for managing user data and API interactions.
 */
export const useUserStore = defineStore('userStore', () => {
  /**
   * Array of users fetched from the API.
   * @type {Ref<User[]>}
   */
  const users: Ref<User[]> = ref<User[]>([]);

  /**
   * The number of users to fetch per request.
   * @type {Ref<number>}
   */
  const count: Ref<number> = ref(20);

  /**
   * Current page number for API requests.
   * @type {Ref<number>}
   */
  const page: Ref<number> = ref(1);

  /**
   * Loading state of the API requests.
   * @type {Ref<LoadingState>}
   */
  const loadingState: Ref<LoadingState> = ref('idle');

  /**
   * Error message, if any, from the API requests.
   * @type {Ref<string | null>}
   */
  const error: Ref<string | null> = ref<string | null>(null);

  /**
   * Increments the current page number for paginated API requests.
   */
  const increasePages = () => {
    page.value++;
  };

  /**
   * Updates the count of users to fetch dynamically.
   * @param {number} newState - The new count value.
   */
  const updateCount = (newState: number) => {
    count.value = newState;
  };

  /**
   * Updates the current loading state of the store.
   * @param {LoadingState} newState - The new loading state (e.g., "idle", "loading", "success", "error").
   */
  const updateLoadingState = (newState: LoadingState) => {
    loadingState.value = newState;
  };

  /**
   * Updates the error message in the store.
   * @param {string} newState - The new error message to set.
   */
  const updateError = (newState: string) => {
    error.value = newState;
  };

  /**
   * Fetches users from the API and updates the store.
   * @async
   * @function fetchUsers
   * @returns {Promise<void>}
   */
  const fetchUsers = async (): Promise<void> => {
    if (loadingState.value === 'loading') return;
    updateLoadingState('loading');
    error.value = null;

    try {
      const data = await fetchUsersFromApi(page.value, count.value);
      users.value.push(...data.results);
      increasePages();
      updateLoadingState('success');
    } catch (err) {
      updateLoadingState('error');
      updateError(`Failed to load data: ${(err as Error).message}`);
    }
  };

  return {
    users,
    page,
    loadingState,
    count,
    error,
    updateCount,
    fetchUsers,
  };
});
