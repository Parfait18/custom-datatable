import { ref, computed, type Ref } from 'vue';

export function usePagination<T>(data: Ref<T[]>, initialPerPage = 10) {
  const currentPage = ref(1);
  const perPage = ref(initialPerPage);

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return data.value.slice(start, start + perPage.value);
  });

  const totalPages = computed(() => Math.ceil(data.value.length / perPage.value));

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  const setPerPage = (size: number) => {
    perPage.value = size;
    currentPage.value = 1; // Reset to first page when changing page size
  };

  return {
    currentPage,
    perPage,
    paginatedData,
    totalPages,
    setPage,
    setPerPage
  };
}