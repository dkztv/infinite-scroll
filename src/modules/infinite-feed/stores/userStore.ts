import { Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchUsersFromApi } from '@/modules/infinite-feed/api/userApi';
import { User } from '@/modules/infinite-feed/types/user';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export const useUserStore = defineStore('userStore', () => {
  const users: Ref<User[]> = ref<User[]>([]);
  const count: Ref<number> = ref(20);
  const page: Ref<number> = ref(1);
  const loadingState: Ref<LoadingState> = ref('idle');
  const error: Ref<string | null> = ref<string | null>(null);

  const increasePages = () => {
    page.value++;
  };

  const updateCount = (newState: number) => {
    count.value = newState;
  };

  const updateLoadingState = (newState: LoadingState) => {
    loadingState.value = newState;
  };

  const updateError = (newState: string) => {
    error.value = newState;
  };

  const fetchUsers = async () => {
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
