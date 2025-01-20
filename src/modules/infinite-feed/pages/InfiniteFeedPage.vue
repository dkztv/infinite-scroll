<template>
  <h1>Infinite Scroll Demo</h1>
  <transition-group name="card-list" tag="div" :class="$style.cardList">
    <UserCard v-for="user in users" :key="user.login.uuid" :user="user" />
  </transition-group>
  <transition-group
    v-if="loadingState === 'loading'"
    name="skeleton-list"
    tag="div"
    :class="[$style.cardList, $style.skeletonList]"
  >
    <SkeletonCard v-for="n in count" :key="n" />
  </transition-group>
  <div v-if="loadingState === 'loading'" :class="$style.loader">Loading...</div>
  <div v-if="loadingState === 'error'" :class="$style.error">{{ error }}</div>
</template>

<script setup lang="ts">
import SkeletonCard from '@/modules/infinite-feed/components/SkeletonCard.vue';
import UserCard from '@/modules/infinite-feed/components/UserCard.vue';
import { useInfiniteScroll } from '@/modules/infinite-feed/hooks/useInfiniteScroll';

const { users, count, loadingState, error } = useInfiniteScroll();
</script>

<style module lang="scss">
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.cardList {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.skeletonList {
  margin-top: 12px;
}

.loader {
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-top: 20px;
}

.error {
  color: red;
  text-align: center;
  margin-top: 20px;
}

.card-list-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.card-list-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.card-list-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.card-list-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.skeleton-list-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.skeleton-list-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.skeleton-list-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.skeleton-list-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
</style>
