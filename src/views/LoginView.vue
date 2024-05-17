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
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { Validation } from '@/validation';
import { toTypedSchema } from '@vee-validate/yup';
import { Api } from '@/services';
import { useQuery } from '@/composables';
import { useToast } from 'vue-toast-notification';
import { computed, ref, watch } from 'vue';
import { useStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { mdiAsterisk, mdiEmail } from '@mdi/js';

const $toast = useToast();
const router = useRouter();
const { isAuth } = storeToRefs(useStore());
const { values, errors, meta, defineField } = useForm<Auth.SignIn.Body>({
  validationSchema: toTypedSchema(Validation.signIn),
});
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const { data, error, query: signIn, isLoading } = useQuery(Api.Auth.signIn);
const {
  query: validate,
  error: codeError,
  isLoading: isCodeLoading,
} = useQuery(Api.Auth.twoFaCode);

const code = ref('');
const token = computed(() => data.value?.twofa.token);

watch(error, () => error.value && $toast.error(error.value.message));
watch(codeError, (n) => n && $toast.error(n.message));
watch(isAuth, (n) => n && router.push('/'));

function submit() {
  validate({ code: code.value, code_token: token.value! });
}
</script>
``

<template>
  <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
    <CardBox v-if="!token" :class="cardClass" is-form @submit.prevent="signIn(values)">
      <CardBoxComponentTitle class="!justify-center" title="Sign In" />
      <FormField label="Email" :help="!errors.email ? 'Please enter your email' : undefined">
        <div class="flex flex-col">
          <FormControl
            v-model="email"
            v-bind="emailAttrs"
            :icon="mdiEmail"
            name="email"
            autocomplete="username"
          />
          <small class="mt-2 text-red-800">{{ errors.email }}</small>
        </div>
      </FormField>
      <FormField
        label="Password"
        :help="!errors.password ? 'Please enter your password' : undefined"
      >
        <div class="flex flex-col">
          <FormControl
            v-model="password"
            v-bind="passwordAttrs"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
          <small class="mt-2 text-red-800">{{ errors.password }}</small>
        </div>
      </FormField>
      <template #footer>
        <div class="text-sm">
          <span>Forgot password?</span>
          <RouterLink class="text-slate-500 font-bold hover:text-blue-500" to="/forgot/password">
            click
          </RouterLink>
        </div>
        <BaseButtons v-if="!isLoading" class="justify-center mt-4">
          <BaseButton :disabled="!meta.valid" type="submit" color="info" label="Login" />
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
