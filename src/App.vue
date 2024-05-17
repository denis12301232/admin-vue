<script setup lang="ts">
import { onMounted } from 'vue';
import { Api } from './services';

onMounted(() => {
  if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) {
    Api.Auth.refresh({ token: localStorage.getItem('refresh_token')! });
  }
});
</script>

<template>
  <RouterView />
</template>
