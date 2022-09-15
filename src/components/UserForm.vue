<script setup lang="ts">
import { InvalidSubmissionContext } from "vee-validate";
import * as zod from "zod";
import { useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import FormTextField from "./FormTextField.vue";

export type UserFormValues = {
  id: string;
  name: string;
};

const emit = defineEmits<{ (e: "submit", formValues: UserFormValues): void }>();

const validationSchema = toFormValidator(
  zod.object({
    id: zod
      .string({ required_error: "入力してください。" })
      .min(5, "5文字以上で入力してください。"),
    name: zod.string({ required_error: "入力してください。" }),
  })
);

const { handleSubmit } = useForm<UserFormValues>({ validationSchema });

const onError = (ctx: InvalidSubmissionContext<UserFormValues>) => {
  const firstErrorKey = Object.keys(ctx.errors)[0];
  const el = document.querySelector(
    `input[name=${firstErrorKey}],select[name=${firstErrorKey}],textarea[name=${firstErrorKey}]`
  );
  el instanceof HTMLElement && el.focus();
};

const onSubmit = handleSubmit((formValues) => {
  emit("submit", formValues);
}, onError);
</script>

<template>
  <form @submit="onSubmit">
    <FormTextField name="id" placeholder="id" />
    <FormTextField name="name" placeholder="name" />
    <button type="submit">submit</button>
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
