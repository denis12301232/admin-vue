<script setup lang="ts">
import type { Auth } from '@/types';
import SectionFullScreen from '@/components/SectionFullScreen.vue';
import CardBox from '@/components/CardBox.vue';
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import { VCode, VLoader } from '@/components';
import { mdiEmail, mdiAsterisk } from '@mdi/js';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { Validation } from '@/validation';
import { toTypedSchema } from '@vee-validate/yup';
import { useQuery } from '@/composables';
import { Api } from '@/services';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores';
import { useToast } from 'vue-toast-notification';

const { isAuth } = storeToRefs(useStore());
const $toast = useToast();
const router = useRouter();
const { values, errors, meta, defineField } = useForm<Auth.ResetPasswordRequest.Body>({
  validationSchema: toTypedSchema(Validation.forgotPassword),
});
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('new_password');
const { data, error, isLoading, query: resetPasswordRequest } = useQuery(Api.Auth.resetPasswordRequest);
const {
  error: resetError,
  isLoading: isCodeLoading,
  query: resetPasswordComplete,
} = useQuery(Api.Auth.resetPasswordComplete);

const code = ref('');
const codeToken = computed(() => data.value?.code_token);

watch(error, () => error.value && $toast.error(error.value.message));
watch(resetError, (n) => n && $toast.error(n.message));
watch(isAuth, (n) => n && router.push('/'));

function submit() {
  resetPasswordComplete({
    code: code.value,
    code_token: codeToken.value!,
    new_password: values.new_password,
  });
}
</script>

<template>
  <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
    <CardBox
      v-if="!codeToken"
      :class="cardClass"
      is-form
      @submit.prevent="resetPasswordRequest(values)"
    >
      <CardBoxComponentTitle class="!justify-center" title="Forgot password" />
      <FormField
        class="mt-5"
        label="Email"
        :help="!errors.email ? 'Please enter your email' : undefined"
      >
        <div class="flex flex-col">
          <FormControl v-model="email" v-bind="emailAttrs" :icon="mdiEmail" required name="email" />
          <small class="mt-2 text-red-800">{{ errors.email }}</small>
        </div>
      </FormField>
      <FormField
        label="New password"
        :help="!errors.new_password ? 'Please enter new password' : undefined"
      >
        <div class="flex flex-col">
          <FormControl
            v-model="password"
            v-bind="passwordAttrs"
            :icon="mdiAsterisk"
            required
            type="password"
            name="password"
          />
          <small class="mt-2 text-red-800">{{ errors.new_password }}</small>
        </div>
      </FormField>
      <template #footer>
        <BaseButtons v-if="!isLoading" class="justify-center mt-4">
          <BaseButton :disabled="!meta.valid" type="submit" color="info" label="Submit" />
        </BaseButtons>
        <div v-else class="flex justify-center">
          <VLoader size="55px" />
        </div>
      </template>
    </CardBox>
    <CardBox v-else :class="cardClass" is-form @submit.prevent="submit">
      <CardBoxComponentTitle class="!justify-center" title="Enter code" />
      <FormField class="mt-5 flex flex-col items-center" help="Code from mail">
        <VCode v-model="code" class="mt-10 pb-4" />
      </FormField>
      <template #footer>
        <BaseButtons v-if="!isCodeLoading" class="justify-center">
          <BaseButton :disabled="!(code.length === 4)" type="submit" color="info" label="Submit" />
        </BaseButtons>
        <div v-else class="flex justify-center">
          <VLoader size="55px" />
        </div>
      </template>
    </CardBox>
  </SectionFullScreen>
</template>
