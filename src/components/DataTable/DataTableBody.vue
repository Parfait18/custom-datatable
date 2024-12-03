`<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr v-for="(row, index) in data" :key="index">
      <td
        v-for="column in columns"
        :key="column.key"
        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
      >
        <slot :name="column.key" :row="row" :value="row[column.key]">
          {{ row[column.key] }}
        </slot>
      </td>
    </tr>
    <tr v-if="data.length === 0">
      <td
        :colspan="columns.length"
        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
      >
        No data available
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import type { Column } from './types';

interface Props {
  columns: Column[];
  data: Record<string, any>[];
}

defineProps<Props>();
</script>`