x
<script setup lang="ts">
import { ref } from "vue";
import UserForm from "./components/UserForm.vue";
import type { UserFormValues } from "./components/UserForm.vue";
import SampleElForm from "./components/SampleElForm.vue";

const submitResult = ref<UserFormValues | null>(null);
const handleSubmit = (formValues: UserFormValues) => {
  submitResult.value = formValues;
};
</script>

<template>
  <div>
    <UserForm @submit="handleSubmit" />
    <SampleElForm />
    <div>フォームの値</div>
    <code>{{ submitResult }}</code>
  </div>
</template>

<style>
:root {
  --vt-c-white: #ffffff;
  --vt-c-gray300: #dadedf;
  --vt-c-black: #030303;
  --vt-c-blue: #1a73e8;
  --vt-c-red: #d32f2f;
  --vt-c-pink: #f29089;
}
</style>
