import { ref, computed, type Ref } from 'vue';
import type { SortOrder } from '../types';

export function useSort<T extends Record<string, any>>(
  data: Ref<T[]>,
  initialSort?: { key: string; order: SortOrder }
) {
  const sortKey = ref<string | undefined>(initialSort?.key);
  const sortOrder = ref<SortOrder>(initialSort?.order || 'asc');

  const sortedData = computed(() => {
    if (!sortKey.value) return [...data.value];

    return [...data.value].sort((a, b) => {
      const aVal = a[sortKey.value!];
      const bVal = b[sortKey.value!];
      
      if (typeof aVal === 'string') {
        return sortOrder.value === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return sortOrder.value === 'asc'
        ? aVal - bVal
        : bVal - aVal;
    });
  });

  const toggleSort = (key: string) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  };

  return {
    sortKey,
    sortOrder,
    sortedData,
    toggleSort
  };
}