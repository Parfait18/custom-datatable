`<template>
  <div class="px-4 py-3 bg-white border-b border-gray-200">
    <div class="flex items-center">
      <div class="relative flex-grow">
        <input
          type="text"
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          placeholder="Search..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        <div v-if="modelValue" class="absolute right-0 top-0 h-full flex items-center pr-3">
          <button
            @click="$emit('update:modelValue', '')"
            class="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid';

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>`