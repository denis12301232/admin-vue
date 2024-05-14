<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { mdiAccount, mdiAsterisk } from '@mdi/js';
import SectionFullScreen from '@/components/SectionFullScreen.vue';
import CardBox from '@/components/CardBox.vue';
import FormCheckRadio from '@/components/FormCheckRadio.vue';
import FormField from '@/components/FormField.vue';
import FormControl from '@/components/FormControl.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';
import LayoutGuest from '@/layouts/LayoutGuest.vue';
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue';

const router = useRouter();
const form = reactive({
  login: '',
  password: '',
  remember: true,
});

function submit() {
  router.push('/dashboard');
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <CardBoxComponentTitle title="Registration" />
        <FormField class="mt-5" label="Login" help="Please enter your login">
          <FormControl v-model="form.login" :icon="mdiAccount" required name="login" />
        </FormField>
        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            required
            type="password"
            name="password"
          />
        </FormField>
        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
