<script setup lang="ts">
import * as zod from "zod";
import { useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import ElFormItem from "./ELFormItem.vue";
import ELFormInput from "./ELFormInput.vue";
import ELFormSingleCheckBox from "./ELFormSingleCheckBox.vue";
import ELFormCheckBoxGroup from "./ELFormCheckBoxGroup.vue";
import ElFormRadioGroupVue from "./ElFormRadioGroup.vue";
import ELFormSwitch from "./ELFormSwitch.vue";
import ELFormSelect from "./ELFormSelect.vue";
import ELFormSelectV2 from "./ELFormSelectV2.vue";
import ELFormDatePicker from "./ELFormDatePicker.vue";

//const emit = defineEmits<{ (e: "submit", formValues: UserFormValues): void }>();

const validationSchema = toFormValidator(
  zod.object({
    //id: zod
    //  .string({ required_error: "入力してください。" })
    //  .min(5, "5文字以上で入力してください。"),
    name: zod.string({ required_error: "入力してください。" }),
    name2: zod.string({ required_error: "hereしてください。" }),
    //agreement: zod.literal(true, {
    //  invalid_type_error: "入力してください。",
    multi: zod.string().array().nonempty(),
    //}),
  })
);

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    single: "",
    //multi: [],
  },
});

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));

const onSubmit = handleSubmit((formValues) => {
  console.log("submit", formValues);
  //emit("submit", formValues);
});
</script>

<template>
  <el-form label-width="120px" @submit="onSubmit">
    <ElFormItem label="Name" name="name" required>
      <ELFormInput name="name" />
    </ElFormItem>
    <ElFormItem label="Name" name="name2" required>
      <ELFormInput name="name2" />
    </ElFormItem>
    <ElFormItem label="Single" name="single" required>
      <ELFormSingleCheckBox name="single" label="foo" />
    </ElFormItem>
    <ElFormItem label="Multi" name="multi" required>
      <ELFormCheckBoxGroup name="multi">
        <el-checkbox label="foo" />
        <el-checkbox label="bar" />
      </ELFormCheckBoxGroup>
    </ElFormItem>
    <ElFormItem label="Switch" name="delivery">
      <ELFormSwitch name="delivery" />
    </ElFormItem>
    <ElFormItem label="Activity zone" name="region">
      <ELFormSelect name="region">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </ELFormSelect>
    </ElFormItem>
    <ElFormItem label="Activity count" name="count">
      <ELFormSelectV2 name="count" :options="options" />
    </ElFormItem>
    <ElFormItem label="Resources" name="resources">
      <ElFormRadioGroupVue name="resources">
        <el-radio label="Sponsorship" />
        <el-radio label="Venue" />
      </ElFormRadioGroupVue>
    </ElFormItem>
    <ElFormItem label="Description" name="desc">
      <ELFormInput name="desc" type="textarea" />
    </ElFormItem>
    <ElFormItem label="Description" name="date">
      <ELFormDatePicker name="date" />
    </ElFormItem>
    <el-button type="primary" native-type="submit">submit</el-button>
  </el-form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}
</style>
