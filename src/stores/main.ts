import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('main', () => {
  const isAuth = ref(false);

  return { isAuth };
});
