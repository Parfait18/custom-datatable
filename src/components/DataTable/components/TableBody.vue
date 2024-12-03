`<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr
      v-for="(row, index) in data"
      :key="getRowKey(row, index)"
      class="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
      :class="{ 'bg-blue-50': isSelected(getRowKey(row, index)) }"
    >
      <td
        v-if="selectable"
        class="w-12 px-6 py-4 whitespace-nowrap"
      >
        <input
          type="checkbox"
          :checked="isSelected(getRowKey(row, index))"
          @change="toggleRow(getRowKey(row, index))"
          class="datatable-checkbox"
        />
      </td>
      <td
        v-for="column in visibleColumns"
        :key="column.key"
        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
      >
        <slot :name="column.key" :row="row" :value="row[column.key]">
          {{ row[column.key] }}
        </slot>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
        <TableRowActions
          :row="row"
          @edit="$emit('edit', row)"
          @delete="$emit('delete', row)"
          @duplicate="$emit('duplicate', row)"
        />
      </td>
    </tr>
    <tr v-if="data.length === 0">
      <td
        :colspan="visibleColumns.length + (selectable ? 2 : 1)"
        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
      >
        No data available
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TableRowActions from './TableRowActions.vue';
import type { Column } from '../types';

interface Props {
  columns: Column[];
  data: Record<string, any>[];
  selectable?: boolean;
  selectedRows: Record<string, boolean>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'toggleRow', key: string): void;
  (e: 'edit', row: Record<string, any>): void;
  (e: 'delete', row: Record<string, any>): void;
  (e: 'duplicate', row: Record<string, any>): void;
}>();

const visibleColumns = computed(() => 
  props.columns.filter(column => column.visible !== false)
);

const getRowKey = (row: Record<string, any>, index: number): string => {
  return row.id?.toString() || index.toString();
};

const isSelected = (key: string): boolean => {
  return !!props.selectedRows[key];
};

const toggleRow = (key: string) => {
  emit('toggleRow', key);
};
</script>`