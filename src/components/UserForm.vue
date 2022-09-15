<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import FormTextField from './FormTextField.vue';

export type UserFormValues = {
  id: string;
  name: string;
};

const props = defineProps<{ initialValue: UserFormValues }>();
const emit = defineEmits<{ (e: 'submit', formValues: UserFormValues): void }>();

const { handleSubmit } = useForm();

const onSubmit = handleSubmit((formValues) => {
  emit('submit', formValues);
});

const validator = {
  required: (value = '') => {
    if (value === '') return '入力してください。';
    return true;
  },
  min:
    (min: number) =>
    (value = '') => {
      if (value.length < min) return `${min}文字以上を入力してください。`;
      return true;
    },
};

const handleClick = () => {
  console.log('click');
};
</script>

<template>
  <form @submit="onSubmit">
    <FormTextField
      name="id"
      placeholder="id"
      :rules="[validator.required, validator.min(5)]"
      @click="handleClick"
    />
    <FormTextField name="name" placeholder="name" :rules="validator.required" />
    <button type="submit">submit</button>
  </form>
</template>
