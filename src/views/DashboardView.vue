<script setup lang="ts">
import { mdiMonitorCellphone, mdiTableBorder, mdiTableOff, mdiGithub } from '@mdi/js';
import SectionMain from '@/components/SectionMain.vue';
import NotificationBar from '@/components/NotificationBar.vue';
import TableSampleClients from '@/components/TableSampleClients.vue';
import CardBox from '@/components/CardBox.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import BaseButton from '@/components/BaseButton.vue';
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue';
import VPagination from '@/components/VPagination.vue';
import VTableTransactions from '@/components/VTableTransactions.vue';
import { onMounted, ref } from 'vue';
import type { ITransaction } from '@/types';

const page = ref(1);
const transactions = ref<ITransaction[]>([]);

onMounted(() => {
  fetch('data-sources/transactions.json')
    .then((response) => {
      console.log(response);
      return response.json()
    })
    .then((data) => (transactions.value = data));
});
</script>

<template>
  <SectionMain>
    <VTableTransactions :transactions="transactions" />
    
  </SectionMain>
</template>
