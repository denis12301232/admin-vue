<script setup lang="ts">
import type { ITransaction } from '@/types';
import VPagination from '@/components/VPagination.vue';
import { computed, ref, watch } from 'vue';

interface Props {
  transactions: ITransaction[];
}

const props = defineProps<Props>();
const page = ref(1);
const limit = ref(5);
const paginated = computed(() =>
  props.transactions.slice(
    (page.value - 1) * limit.value,
    (page.value - 1) * limit.value + limit.value
  )
);

watch(page, () => {
  console.log(props.transactions.slice((page.value - 1) * limit.value));
});
</script>

<template>
  <figure>
    <figcaption class="py-4 text-xl">Transactions</figcaption>
    <table>
      <thead>
        <tr>
          <th>Hash</th>
          <th>Method</th>
          <th>Block</th>
          <th>From</th>
          <th>To</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction of paginated" :key="transaction.id">
          <td>{{ transaction.hash }}</td>
          <td>{{ transaction.method }}</td>
          <td>{{ transaction.block }}</td>
          <td>{{ transaction.from }}</td>
          <td>{{ transaction.to }}</td>
          <td>{{ transaction.value }}</td>
        </tr>
      </tbody>
    </table>
    <VPagination v-model:page="page" :total="transactions.length" :limit="limit" />
  </figure>
</template>
