<template>
  <div class="field pt-4">
    <span class="p-float-label p-fluid">
      <InputText v-model="model" :id="`${uid}_field`" type="text" :disabled="disabled" />
      <label :for="`${uid}_field`">{{ props.label }}</label>
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, getCurrentInstance } from 'vue';
import Customer from '@/models/customer';

const uid = getCurrentInstance()?.uid;
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

const model = computed<string>({
  get() {
    return props.modelValue;
  },
  set(v: string) {
    emit('update:modelValue', v);
  },
});
</script>
