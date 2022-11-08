<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import UserForm from "./UserForm.vue";
import type { UserFormValues } from "./UserForm.vue";

const isMutating = ref(false);

const handleSubmit = async (formValues: UserFormValues) => {
  isMutating.value = true;
  await axios.post("/users", {
    params: formValues,
  });
  isMutating.value = false;
};
</script>

<template>
  <div>
    <UserForm :is-mutating="isMutating" @submit="handleSubmit" />
  </div>
</template>
