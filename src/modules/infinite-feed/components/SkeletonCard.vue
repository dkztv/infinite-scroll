<template>
  <div :class="$style.skeleton">
    <div :class="$style.photoWrapper">
      <div :class="$style.avatar"></div>
    </div>
    <div :class="$style.info">
      <div :class="$style.line"></div>
      <div :class="$style.shortLine"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * SkeletonCard.vue
 *
 * A skeleton loader component used as a placeholder while actual data is being loaded.
 *
 * This component provides a visual representation of a user card with a photo
 * and text placeholders. It uses CSS animations to fade in smoothly.
 */
</script>

<style module lang="scss">
/**
 * Skeleton loader styles.
 * @class skeleton - Main container for the skeleton loader.
 * @class photoWrapper - Wrapper for the circular avatar placeholder.
 * @class avatar - Placeholder for the user avatar.
 * @class info - Wrapper for text placeholders.
 * @class line - Placeholder for a longer text line.
 * @class shortLine - Placeholder for a shorter text line.
 */
.skeleton {
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.2s;
  width: 100%;
  max-width: 360px;
  gap: 15px;
  opacity: 0;
  animation: skeletonFadeIn 0.6s ease forwards;

  .photoWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #eee;
    box-shadow: 0 0 0 2px #ccc;
  }

  .avatar {
    width: 95px;
    height: 95px;
    border-radius: 50%;
    background: #ddd;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 10px;
  }

  .line {
    width: 70%;
    height: 12px;
    background: #ddd;
    border-radius: 4px;
  }

  .shortLine {
    width: 50%;
    height: 12px;
    background: #ddd;
    border-radius: 4px;
  }
}

@keyframes skeletonFadeIn {
  to {
    opacity: 1;
  }
}
</style>
