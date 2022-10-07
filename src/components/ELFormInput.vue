<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef } from "vue";

const props = defineProps<{
  name: string;
  type?: HTMLInputElement["type"] | "textarea";
}>();

const nameRef = toRef(props, "name");
const { value } = useField<string>(nameRef);
</script>

<template>
  <el-input v-model="value" :validate-event="false" :type="type" />
</template>
