<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const registrationSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})
type RegistrationSchema = z.output<typeof registrationSchema>

const { loggedIn, user, fetch: refreshSession } = useUserSession()
const credentials = reactive<Partial<RegistrationSchema>>({
  email: undefined,
  password: undefined
})
const submitResponse = ref<undefined | string>(undefined);
var submitResponseCount = 0;

async function handleRegister(event: FormSubmitEvent<RegistrationSchema>) {
  $fetch('/api/register', {
    method: 'POST',
    body: event.data
  })
    .then(async () => {
      await refreshSession()
      await navigateTo('/')
    })
    .catch((reason) => {
      submitResponseCount += 1
      submitResponse.value = reason.statusMessage
    })
}
</script>

<template>
  <div class="max-w-md mx-auto py-12">
    <div class="shadow-md p-8">
      <UForm :schema="registrationSchema" :state="credentials" class="space-y-4 text-2xl"
        @submit.prevent="handleRegister">

        <h1 class="text-2xl font-bold text-center">Registration</h1>

        <UFormField name="email">
          <UInput v-model="credentials.email" placeholder="Email" class="w-full" />
        </UFormField>

        <UFormField name="password">
          <UInput v-model="credentials.password" type="password" placeholder="Password" class="w-full" />
        </UFormField>

        <UButton type="submit" color='neutral' class='w-full justify-center'>
          Register
        </UButton>

        <UAlert v-if="submitResponse !== undefined" color="error" :title="'Error: ' + submitResponseCount"
          :description="submitResponse" icon="material-symbols:error-rounded" />

        <div class="mt-6 text-center text-sm">
          <p>
            Have an account?
            <NuxtLink to="/login" class="text-blue-600 hover:underline">
              Sign In Now
            </NuxtLink>
          </p>
        </div>

      </UForm>
    </div>
  </div>
</template>