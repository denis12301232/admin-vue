<script setup lang="ts">
import BaseIcon from './BaseIcon.vue';
import { mdiLoading } from '@mdi/js';

interface Props {
  size?: string;
}

withDefaults(defineProps<Props>(), { size: '30px' });
</script>

<template>
  <BaseIcon class="icon" :path="mdiLoading" size="30px" />
</template>

<style lang="scss" scoped>
.icon {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
