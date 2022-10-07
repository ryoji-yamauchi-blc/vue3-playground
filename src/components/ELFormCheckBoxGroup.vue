<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  name: string;
}>();

const nameRef = toRef(props, "name");
const { value } = useField<string[]>(nameRef, {
  type: "checkbox",
});
</script>

<template>
  <el-checkbox-group v-model="value" :validate-event="false">
    <slot />
  </el-checkbox-group>
</template>
