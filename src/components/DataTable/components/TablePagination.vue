`<template>
  <div class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
    <div class="flex items-center">
      <label class="mr-2 text-sm text-gray-700">Rows per page:</label>
      <select
        :value="perPage"
        class="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
        @change="$emit('update:perPage', Number($event.target.value))"
      >
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>

    <div class="flex items-center space-x-2">
      <button
        class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="$emit('update:page', currentPage - 1)"
      >
        Previous
      </button>
      <span class="text-sm text-gray-700">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="$emit('update:page', currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PaginationProps } from '../types';

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSizes: () => [5, 10, 25, 50],
});

defineEmits<{
  'update:page': [page: number];
  'update:perPage': [perPage: number];
}>();

const totalPages = computed(() => Math.ceil(props.total / props.perPage));
</script>`