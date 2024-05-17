<script setup lang="ts">
import type { ApiTokens } from '@/types';
import CardBox from '@/components/CardBox.vue';
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import { VCode, VLoader } from '@/components';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { Validation } from '@/validation';
import { useQuery } from '@/composables';
import { Api } from '@/services';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const { values, errors, meta, defineField, resetForm } = useForm<ApiTokens.CreateRequest.Body>({
  validationSchema: toTypedSchema(Validation.apiTokensRequest),
});
const [name, nameAttrs] = defineField('api_token_name');
const { data, error, isLoading, query: createRequest } = useQuery(Api.Tokens.createRequest);
const {
  error: codeError,
  isLoading: isConfirmLoading,
  query: createConfirm,
} = useQuery(Api.Tokens.createConfirm);

const code = ref('');

watch(error, () => error.value && $toast.error(error.value.message));
watch(codeError, (n) => n && $toast.error(n.message));

function submit() {
  createConfirm(
    {
      api_token_name: values.api_token_name,
      code: code.value,
      code_token: data.value?.code_token!,
    },
    {
      afterResponse(request, options, response) {
        if (response.ok) {
          $toast.success('Created');
          data.value = null;
          resetForm();
        }
      },
    }
  );
}
</script>

<template>
  <div class="flex justify-center">
    <CardBox
      v-if="!data?.code_token"
      class="max-w-lg w-full mt-5"
      is-form
      @submit.prevent="createRequest(values)"
    >
      <CardBoxComponentTitle class="!justify-center" title="Api Tokens" />
      <FormField
        label="Name"
        :help="!errors.api_token_name ? 'Please enter name for tokens' : undefined"
      >
        <div class="flex flex-col">
          <FormControl v-model="name" v-bind="nameAttrs" name="name" />
          <small class="mt-2 text-red-800">{{ errors.api_token_name }}</small>
        </div>
      </FormField>
      <template #footer>
        <BaseButtons v-if="!isLoading" class="justify-center mt-4">
          <BaseButton :disabled="!meta.valid" type="submit" color="info" label="Add" />
        </BaseButtons>
        <div v-else class="flex justify-center">
          <VLoader size="55px" />
        </div>
      </template>
    </CardBox>
    <CardBox v-else is-form @submit.prevent="submit">
      <CardBoxComponentTitle class="!justify-center" title="Enter code" />
      <FormField class="mt-5 flex flex-col items-center" help="Code from mail">
        <VCode v-model="code" class="mt-10 pb-4" />
      </FormField>
      <template #footer>
        <BaseButtons v-if="!isConfirmLoading" class="justify-center">
          <BaseButton :disabled="!(code.length === 4)" type="submit" color="info" label="Submit" />
        </BaseButtons>
        <div v-else class="flex justify-center">
          <VLoader size="55px" />
        </div>
      </template>
    </CardBox>
  </div>
</template>
