<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef } from "vue";
import TextField from "./TextField.vue";

type UseFieldArgs = Parameters<typeof useField<string>>;

const props = defineProps<{
  name: string;
  rules?: UseFieldArgs[1];
}>();

const nameRef = toRef(props, "name");
const { value, errorMessage } = useField<string>(nameRef, props.rules);
</script>

<template>
  <TextField :name="props.name" v-model="value" :errorMessage="errorMessage" />
</template>
