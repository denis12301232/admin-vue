<script setup lang="ts">
import type { ITransaction } from '@/types';
import SectionMain from '@/components/SectionMain.vue';
import VTableTransactions from '@/components/VTableTransactions.vue';
import { onMounted, ref } from 'vue';

const transactions = ref<ITransaction[]>([]);

onMounted(() => {
  fetch('data-sources/transactions.json')
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => (transactions.value = data));
});
</script>

<template>
  <SectionMain>
    <VTableTransactions :transactions="transactions" />
  </SectionMain>
</template>
