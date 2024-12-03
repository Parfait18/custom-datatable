`<template>
  <thead class="bg-gray-50">
    <tr>
      <th
        v-if="selectable"
        class="w-12 px-6 py-3"
      >
        <input
          type="checkbox"
          :checked="allSelected"
          :indeterminate="someSelected"
          @change="$emit('toggleAll')"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
        />
      </th>
      <th
        v-for="column in visibleColumns"
        :key="column.key"
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
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
      <th class="relative px-6 py-3">
        <button
          @click="showColumnSelector = !showColumnSelector"
          class="text-gray-500 hover:text-gray-700"
        >
          <Cog6ToothIcon class="w-5 h-5" />
        </button>
        <!-- Column Selector Dropdown -->
        <div
          v-if="showColumnSelector"
          class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
        >
          <div class="py-1">
            <label
              v-for="column in columns"
              :key="column.key"
              class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                :checked="column.visible !== false"
                @change="toggleColumn(column.key)"
                class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
              />
              {{ column.label }}
            </label>
          </div>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronUpIcon, ChevronDownIcon, Cog6ToothIcon } from '@heroicons/vue/20/solid';
import type { Column, SortOrder } from '../types';

const props = defineProps<{
  columns: Column[];
  sortKey?: string;
  sortOrder?: SortOrder;
  selectable?: boolean;
  selectedRows: Record<string, boolean>;
  totalRows: number;
}>();

const emit = defineEmits<{
  (e: 'sort', key: string): void;
  (e: 'toggleAll'): void;
  (e: 'toggleColumn', key: string): void;
}>();

const showColumnSelector = ref(false);

const visibleColumns = computed(() => 
  props.columns.filter(column => column.visible !== false)
);

const allSelected = computed(() => 
  Object.keys(props.selectedRows).length === props.totalRows &&
  Object.values(props.selectedRows).every(Boolean)
);

const someSelected = computed(() =>
  Object.keys(props.selectedRows).length > 0 && !allSelected.value
);

const toggleColumn = (key: string) => {
  emit('toggleColumn', key);
};
</script>`