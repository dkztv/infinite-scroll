import { onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/modules/infinite-feed/stores/userStore';
import { debounce } from '@/shared/utils/debounce';

/**
 * useInfiniteScroll.ts
 *
 * A custom hook for implementing infinite scrolling. It dynamically calculates the number of items
 * to load based on the current screen height and listens for scroll events to fetch more data
 * when the user reaches near the bottom of the page.
 *
 * @returns {object} Returns reactive references to users, loading state, count, and errors.
 * @property {Ref<User[]>} users - The list of users fetched from the API.
 * @property {Ref<string>} loadingState - The current state of loading ("idle", "loading", "success", "error").
 * @property {Ref<number>} count - The number of items to fetch in the next request.
 * @property {Ref<string | null>} error - The error message, if any.
 */
export const useInfiniteScroll = () => {
  /**
   * The estimated height of a single card in pixels.
   * @type {number}
   */
  const cardHeight: number = 110;

  /** The store instance for managing user data. */
  const userStore = useUserStore();

  /** Extracts reactive references and actions from the store. */
  const { updateCount, fetchUsers } = userStore;
  const { users, loadingState, count, error } = storeToRefs(userStore);

  /**
   * Dynamically calculates the number of results to fetch based on screen height.
   * @returns {number} The calculated number of results to fetch.
   */
  const getDynamicResults = (): number => {
    const screenHeight = window.innerHeight;
    const visibleCards = Math.ceil(screenHeight / cardHeight);
    return visibleCards * 2;
  };

  /**
   * A debounced scroll handler to detect when the user is near the bottom of the page.
   * If near the bottom, fetches more users.
   */
  const debouncedHandleScroll = debounce(async () => {
    const nearBottomOfWindow =
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight - 1000;

    if (nearBottomOfWindow) {
      updateCount(getDynamicResults());
      await fetchUsers();
    }
  }, 200);

  /**
   * Lifecycle hook to initialize infinite scroll logic.
   * - Dynamically sets the initial count of results.
   * - Fetches the initial data.
   * - Attaches a debounced scroll listener.
   */
  onMounted(async () => {
    updateCount(getDynamicResults());
    await fetchUsers();
    window.addEventListener('scroll', debouncedHandleScroll);
  });

  /**
   * Lifecycle hook to clean up the scroll listener.
   */
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', debouncedHandleScroll);
  });

  return { users, loadingState, count, error };
};
