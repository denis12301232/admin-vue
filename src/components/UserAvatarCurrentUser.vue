<script setup>
import UserAvatar from '@/components/UserAvatar.vue';

</script>

<template>
  <UserAvatar username="username" :avatar="null">
    <slot />
  </UserAvatar>
</template>
