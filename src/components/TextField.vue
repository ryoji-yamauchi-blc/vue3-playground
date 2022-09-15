<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
  errorMessage?: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const styles = computed(() => ({
  "input--error": !!props.errorMessage,
}));
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div>
    <input
      class="input"
      :class="styles"
      type="text"
      :value="props.modelValue"
      @input="handleChange"
      v-bind="$attrs"
    />
    <div class="error-message">{{ props.errorMessage }}</div>
  </div>
</template>

<style scoped>
.input {
  display: inline-block;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border-width: 1px;
  border-color: var(--vt-c-gray300);
  border-style: solid;
}
.input--error {
  border-color: var(--vt-c-red);
}
.error-message {
  color: var(--vt-c-red);
}
</style>
