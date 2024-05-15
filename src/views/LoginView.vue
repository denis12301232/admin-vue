<script setup>
import { useRouter } from 'vue-router';
import { mdiAccount, mdiAsterisk } from '@mdi/js';
import SectionFullScreen from '@/components/SectionFullScreen.vue';
import CardBox from '@/components/CardBox.vue';
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue';
import FormCheckRadio from '@/components/FormCheckRadio.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import { useForm } from 'vee-validate';
import { Validation } from '@/validation';
import { toTypedSchema } from '@vee-validate/yup';

const router = useRouter();
const { values, errors, meta, defineField } = useForm({
  validationSchema: toTypedSchema(Validation.login),
  initialValues: { remember: true },
});
const [login, loginAttrs] = defineField('login');
const [password, passwordAttrs] = defineField('password');
const [remember, rememberAttrs] = defineField('remember');

const submit = () => {
  console.log(values);
  router.push('/dashboard');
};
</script>

<template>
  <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
    <CardBox :class="cardClass" is-form @submit.prevent="submit">
      <CardBoxComponentTitle title="Sign In" />
      <FormField label="Login" :help="!errors.login ? 'Please enter your login' : undefined">
        <div class="flex flex-col">
          <FormControl
            v-model="login"
            v-bind="loginAttrs"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
          <small class="mt-2 text-red-800">{{ errors.login }}</small>
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
      <FormCheckRadio
        v-model="remember"
        v-bind="rememberAttrs"
        name="remember"
        label="Remember"
        :input-value="true"
      />
      <template #footer>
        <BaseButtons>
          <BaseButton :disabled="!meta.valid" type="submit" color="info" label="Login" />
          <BaseButton to="/dashboard" color="info" outline label="Back" />
        </BaseButtons>
      </template>
    </CardBox>
  </SectionFullScreen>
</template>
