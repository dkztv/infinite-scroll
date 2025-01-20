<template>
  <div :class="$style.card">
    <div :class="$style.photoWrapper">
      <img
        :src="user.picture?.medium"
        :srcset="`${user.picture?.large} 2x`"
        :alt="user.name?.first"
        loading="lazy"
      />
    </div>
    <div :class="$style.info">
      <p :class="$style.name">{{ user.name?.first }} {{ user.name?.last }}</p>
      <p :class="$style.email">{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * UserCard.vue
 *
 * Displays a user's profile card, including photo, name, and email.
 *
 * @param {User} user - The user object containing name, email, and picture.
 */
import { defineProps } from 'vue';
import { User } from '@/modules/infinite-feed/types/user';

defineProps<{
  user: User;
}>();
</script>

<style module lang="scss">
.card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.2s;
  width: 100%;
  max-width: 360px;
  gap: 15px;

  &:hover {
    transform: scale(1.05);
  }
}

.photoWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #f0f0f0;
  position: relative;
  box-shadow: 0 0 0 2px #ccc;

  img {
    width: 95px;
    height: 95px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.email {
  font-size: 0.9rem;
  color: #555;
  margin: 5px 0 0;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
