`<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <DataTable
      :columns="columns"
      :data="users"
      :pagination="true"
      :initial-sort="{ key: 'name', order: 'asc' }"
      :searchable-fields="['name', 'email', 'role']"
      :row-sizes="[5, 10, 20, 50]"
      table-name="Users"
      :selectable="true"
    >
      <template #status="{ value }">
        <span
          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
          :class="{
            'bg-green-100 text-green-800': value === 'active',
            'bg-red-100 text-red-800': value === 'inactive'
          }"
        >
          {{ value }}
        </span>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from './components/DataTable/DataTable.vue';
import type { Column } from './components/DataTable/types';

const columns: Column[] = [
  { key: 'name', label: 'Name', sortable: true, visible: true },
  { key: 'email', label: 'Email', sortable: true, visible: true },
  { key: 'role', label: 'Role', sortable: true, visible: true },
  { key: 'status', label: 'Status', sortable: true, visible: true },
];

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'inactive',
  },
];
</script>`