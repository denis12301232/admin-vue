import type { NavigationGuard } from 'vue-router';
import { useStore } from '@/stores';

const auth: NavigationGuard = (to) => {
  const store = useStore();

  if (!store.isAuth && to.name !== 'login') {
    return { name: 'login' };
  }
};

export default auth;