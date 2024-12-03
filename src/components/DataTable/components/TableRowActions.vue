`<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none"
      ref="trigger"
    >
      <EllipsisVerticalIcon class="w-5 h-5" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
      @click.stop
    >
      <div class="py-1">
        <button
          v-for="action in actions"
          :key="action.label"
          @click="handleAction(action)"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <component :is="action.icon" class="w-4 h-4 mr-2" />
          {{ action.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentDuplicateIcon,
} from '@heroicons/vue/20/solid';

interface Action {
  label: string;
  icon: any;
  handler: () => void;
}

const props = defineProps<{
  row: Record<string, any>;
}>();

const emit = defineEmits<{
  (e: 'edit', row: Record<string, any>): void;
  (e: 'delete', row: Record<string, any>): void;
  (e: 'duplicate', row: Record<string, any>): void;
}>();

const isOpen = ref(false);
const trigger = ref<HTMLElement | null>(null);

const actions: Action[] = [
  {
    label: 'Edit',
    icon: PencilSquareIcon,
    handler: () => emit('edit', props.row),
  },
  {
    label: 'Duplicate',
    icon: DocumentDuplicateIcon,
    handler: () => emit('duplicate', props.row),
  },
  {
    label: 'Delete',
    icon: TrashIcon,
    handler: () => emit('delete', props.row),
  },
];

const handleAction = (action: Action) => {
  action.handler();
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (trigger.value && !trigger.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>`