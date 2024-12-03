`<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <TableToolbar
            v-if="searchableFields && searchableFields.length > 0"
            v-model:searchQuery="searchQuery"
            v-model:perPage="perPage"
            :data="sortedData"
            :row-sizes="rowSizes"
            :table-name="tableName"
            :selected-count="selectedCount"
            @clearSelection="clearSelection"
          />
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <TableHeader
                :columns="columnsWithVisibility"
                :sort-key="sortKey"
                :sort-order="sortOrder"
                :selectable="selectable"
                :selected-rows="selectedRows"
                :total-rows="filteredData.length"
                @sort="toggleSort"
                @toggleAll="toggleAllRows"
                @toggleColumn="toggleColumn"
              />
              <TableBody
                :columns="columnsWithVisibility"
                :data="displayData"
                :selectable="selectable"
                :selected-rows="selectedRows"
                @toggleRow="toggleRow"
                @edit="handleEdit"
                @delete="handleDelete"
                @duplicate="handleDuplicate"
              >
                <template v-for="(_, name) in $slots" #[name]="slotData">
                  <slot :name="name" v-bind="slotData" />
                </template>
              </TableBody>
            </table>
          </div>
          <TablePagination
            v-if="pagination"
            :current-page="currentPage"
            :per-page="perPage"
            :total="sortedData.length"
            @update:page="setPage"
            @update:per-page="setPerPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import TableHeader from './components/TableHeader.vue';
import TableBody from './components/TableBody.vue';
import TablePagination from './components/TablePagination.vue';
import TableToolbar from './components/TableToolbar.vue';
import { useSort } from './composables/useSort';
import { usePagination } from './composables/usePagination';
import { useSearch } from './composables/useSearch';
import type { TableProps, SelectedRows } from './types';

const props = withDefaults(defineProps<TableProps>(), {
  pagination: true,
  initialSort: undefined,
  searchableFields: () => [],
  rowSizes: () => [5, 10, 25, 50, 100],
  tableName: 'table',
  selectable: false,
});

const emit = defineEmits<{
  (e: 'edit', row: Record<string, any>): void;
  (e: 'delete', row: Record<string, any>): void;
  (e: 'duplicate', row: Record<string, any>): void;
}>();

const columnVisibility = ref<Record<string, boolean>>(
  props.columns.reduce((acc, column) => {
    acc[column.key] = column.visible !== false;
    return acc;
  }, {} as Record<string, boolean>)
);

const columnsWithVisibility = computed(() => 
  props.columns.map(column => ({
    ...column,
    visible: columnVisibility.value[column.key]
  }))
);

const selectedRows = ref<SelectedRows>({});
const tableData = ref(props.data);
const { searchQuery, filteredData } = useSearch(tableData, props.searchableFields);
const { sortKey, sortOrder, sortedData, toggleSort } = useSort(filteredData, props.initialSort);
const { currentPage, perPage, paginatedData, setPage, setPerPage } = usePagination(sortedData);

const displayData = computed(() => props.pagination ? paginatedData.value : sortedData.value);
const selectedCount = computed(() => Object.values(selectedRows.value).filter(Boolean).length);

const toggleRow = (key: string) => {
  selectedRows.value[key] = !selectedRows.value[key];
  if (!selectedRows.value[key]) {
    delete selectedRows.value[key];
  }
};

const toggleAllRows = () => {
  const allSelected = selectedCount.value === filteredData.value.length;
  if (allSelected) {
    selectedRows.value = {};
  } else {
    selectedRows.value = filteredData.value.reduce((acc, row, index) => {
      acc[row.id?.toString() || index.toString()] = true;
      return acc;
    }, {} as SelectedRows);
  }
};

const clearSelection = () => {
  selectedRows.value = {};
};

const toggleColumn = (key: string) => {
  columnVisibility.value[key] = !columnVisibility.value[key];
};

const handleEdit = (row: Record<string, any>) => {
  emit('edit', row);
};

const handleDelete = (row: Record<string, any>) => {
  emit('delete', row);
};

const handleDuplicate = (row: Record<string, any>) => {
  emit('duplicate', row);
};

watch(() => props.data, () => {
  selectedRows.value = {};
  tableData.value = props.data;
});

watch(() => props.columns, (newColumns) => {
  columnVisibility.value = newColumns.reduce((acc, column) => {
    acc[column.key] = column.visible !== false;
    return acc;
  }, {} as Record<string, boolean>);
}, { deep: true });
</script>

<style>
.datatable-select {
  @apply border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 focus:ring-0 focus:ring-offset-0;
}

.datatable-checkbox {
  @apply rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0;
}

@media (max-width: 640px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}
</style>`