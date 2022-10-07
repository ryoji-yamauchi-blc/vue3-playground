<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef } from "vue";

const props = defineProps<{
  name: string;
}>();

const nameRef = toRef(props, "name");
const { value } = useField<string>(nameRef);
</script>

<template>
  <el-select v-model="value" :validate-event="false">
    <slot />
  </el-select>
</template>
