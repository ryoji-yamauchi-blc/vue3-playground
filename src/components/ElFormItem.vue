<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef } from "vue";

const props = defineProps<{
  label: string;
  name: string;
  required?: boolean;
}>();

const nameRef = toRef(props, "name");
const { errorMessage } = useField(nameRef);
</script>

<template>
  <el-form-item :error="errorMessage" :label="label" :required="required">
    <slot />
  </el-form-item>
</template>
