<script setup lang="ts">
import BaseLevel from '@/components/BaseLevel.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import BaseButton from '@/components/BaseButton.vue';
import { computed } from 'vue';

interface Props {
  total: number;
  limit: number;
}

const props = defineProps<Props>();
const page = defineModel<number>('page', { required: true });
const pagesCount = computed(() => Math.ceil(props.total / props.limit));
const range = computed(() => getRange(page.value, pagesCount.value));

function onPage(current: number | string) {
  if (typeof current === 'number') page.value = current;
}

function getRange(current: number, last: number, delta = 2) {
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l = 0;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}
</script>

<template>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="item of range"
          :key="item"
          :active="item === page"
          :label="item"
          :color="item === page ? 'lightDark' : 'whiteDark'"
          small
          @click="onPage(item)"
        />
      </BaseButtons>
      <small>Page {{ page }} of {{ pagesCount }}</small>
    </BaseLevel>
  </div>
</template>
