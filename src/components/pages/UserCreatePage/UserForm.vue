<script setup lang="ts">
import { ref } from "vue";
import * as zod from "zod";
import { useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import FormTextField from "./FormTextField.vue";

export type UserFormValues = {
  id: string;
  name: string;
};

defineProps<{ isMutating: boolean }>();
const emit = defineEmits<{ (e: "submit", formValues: UserFormValues): void }>();

const validationSchema = toFormValidator(
  zod.object({
    id: zod.string().min(1, "入力してください。"),
    name: zod.string().min(1, "入力してください。"),
  })
);

const { handleSubmit } = useForm<UserFormValues>({
  validationSchema,
  initialValues: {
    id: "",
    name: "",
  },
});

const onSubmit = handleSubmit(async (formValues) => {
  emit("submit", formValues);
});
</script>

<template>
  <form @submit="onSubmit">
    <div>
      <label for="id">ユーザID</label>
      <FormTextField name="id" placeholder="eg) Nomura" id="id" />
    </div>
    <label>
      <label for="name">名前</label>
      <FormTextField name="name" placeholder="eg) 野村" id="name" />
    </label>

    <button type="submit" :disabled="isMutating">
      {{ isMutating ? "...登録中" : "submit" }}
    </button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}
</style>
