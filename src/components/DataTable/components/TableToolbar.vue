`<template>
  <div class="px-4 py-3 bg-white border-b border-gray-200">
    <div class="flex items-center justify-between">
      <!-- Search Input -->
      <div class="relative flex-grow mr-4">
        <input
          type="text"
          :value="searchQuery"
          @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          placeholder="Search..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <div v-if="searchQuery" class="absolute right-0 top-0 h-full flex items-center pr-3">
          <button
            @click="$emit('update:searchQuery', '')"
            class="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Row Count Selector -->
      <div class="flex items-center space-x-2">
        <label class="text-sm text-gray-700">Rows:</label>
        <select
          :value="perPage"
          @change="$emit('update:perPage', Number(($event.target as HTMLSelectElement).value))"
          class="border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-for="size in rowSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <!-- Export Options -->
      <div class="flex items-center ml-4">
        <select
          v-model="selectedExportFormat"
          @change="handleExport"
          class="border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Export as...</option>
          <option v-for="format in exportFormats" :key="format.value" :value="format.value">
            {{ format.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import type { ExportFormat } from '../types';
import { exportToCSV, exportToJSON, exportToTXT, exportToSQL } from '../utils/exportUtils';

const props = withDefaults(defineProps<{
  searchQuery: string;
  perPage: number;
  rowSizes?: number[];
  data: Record<string, any>[];
  tableName: string;
}>(), {
  rowSizes: () => [5, 10, 25, 50, 100],
});

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void;
  (e: 'update:perPage', value: number): void;
}>();

const selectedExportFormat = ref('');

const exportFormats = [
  { value: 'csv', label: 'Export CSV' },
  { value: 'json', label: 'Export JSON' },
  { value: 'txt', label: 'Export TXT' },
  { value: 'sql', label: 'Export SQL' },
] as const;

const handleExport = () => {
  if (!selectedExportFormat.value) return;

  const format = selectedExportFormat.value as ExportFormat;
  const filename = props.tableName.toLowerCase();

  switch (format) {
    case 'csv':
      exportToCSV(props.data, filename);
      break;
    case 'json':
      exportToJSON(props.data, filename);
      break;
    case 'txt':
      exportToTXT(props.data, filename);
      break;
    case 'sql':
      exportToSQL(props.data, filename, props.tableName);
      break;
  }

  selectedExportFormat.value = '';
};
</script>`