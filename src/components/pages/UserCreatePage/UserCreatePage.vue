<script setup lang="ts">
import { ref } from "vue";
import UserForm from "./UserForm.vue";
import type { UserFormValues } from "./UserForm.vue";
import { client } from "@/api/client";

const completeMessage = ref("");
const isMutating = ref(false);

const handleSubmit = async (formValues: UserFormValues) => {
  isMutating.value = true;
  await client.post("/users", formValues);
  isMutating.value = false;
  completeMessage.value = "登録しました。";
  setTimeout(() => (completeMessage.value = ""), 2000);
};
</script>

<template>
  <div>
    <UserForm :is-mutating="isMutating" @submit="handleSubmit" />
    <p>{{ completeMessage }}</p>
  </div>
</template>
