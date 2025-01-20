import { onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/modules/infinite-feed/stores/userStore';
import { debounce } from '@/shared/utils/debounce';

export const useInfiniteScroll = () => {
  const cardHeight = 110;
  const userStore = useUserStore();
  const { updateCount, fetchUsers } = userStore;
  const { users, loadingState, count, error } = storeToRefs(userStore);

  const getDynamicResults = () => {
    const screenHeight = window.innerHeight;
    const visibleCards = Math.ceil(screenHeight / cardHeight);
    return visibleCards * 2;
  };

  const debouncedHandleScroll = debounce(async () => {
    const nearBottomOfWindow =
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight - 1000;
    if (nearBottomOfWindow) {
      updateCount(getDynamicResults());
      await fetchUsers();
    }
  }, 200);

  onMounted(async () => {
    updateCount(getDynamicResults());
    await fetchUsers();
    window.addEventListener('scroll', debouncedHandleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', debouncedHandleScroll);
  });

  return { users, loadingState, count, error };
};
