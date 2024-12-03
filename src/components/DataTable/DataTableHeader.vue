`<template>
  <thead class="bg-gray-50">
    <tr>
      <th
        v-for="column in columns"
        :key="column.key"
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        :class="{ 'cursor-pointer hover:bg-gray-100': column.sortable }"
        @click="column.sortable && emit('sort', column.key)"
      >
        <div class="flex items-center space-x-1">
          <span>{{ column.label }}</span>
          <span v-if="column.sortable" class="ml-2">
            <template v-if="sortKey === column.key">
              <ChevronUpIcon v-if="sortOrder === 'asc'" class="w-4 h-4" />
              <ChevronDownIcon v-else class="w-4 h-4" />
            </template>
          </span>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';
import type { Column } from './types';

interface Props {
  columns: Column[];
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
}

defineProps<Props>();
const emit = defineEmits<{
  (e: 'sort', key: string): void;
}>();
</script>`