import { ref, computed, type Ref } from 'vue';

export function useSearch<T extends Record<string, any>>(
  data: Ref<T[]>,
  searchableFields: string[] = []
) {
  const searchQuery = ref('');

  const filteredData = computed(() => {
    if (!searchQuery.value || searchableFields.length === 0) {
      return data.value;
    }

    const query = searchQuery.value.toLowerCase();
    return data.value.filter((item) => {
      return searchableFields.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(query);
      });
    });
  });

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  return {
    searchQuery,
    filteredData,
    setSearchQuery,
  };
}