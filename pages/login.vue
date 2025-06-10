<script setup lang="ts">

const { loggedIn, user, fetch: refreshSession } = useUserSession()

const credentials = reactive({
  email: '',
  password: '',
})

async function handleLogin() {

  $fetch('/api/login', {
    method: 'POST',
    body: credentials
  })
    .then(async () => {
      await refreshSession()
      await navigateTo('/')
    })
    .catch((reason: Error) => alert(reason.message + reason.stack))
}
</script>

<template>
  <div class="max-w-md mx-auto py-12">
    <div class="shadow-md p-8">
      <form @submit.prevent="handleLogin">
        <div class="space-y-4">
          <!-- Login Title -->
          <h1 class="text-2xl font-bold text-center">Login</h1>

          <!-- Email Input -->
          <div>
            <input v-model="credentials.email" id="email" type="email" required
              class="w-full border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500 px-3 py-2"
              placeholder="Email">
          </div>

          <!-- Password Input -->
          <div>
            <input v-model="credentials.password" id="password" type="password" required
              class="w-full border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500 px-3 py-2"
              placeholder="Password">
          </div>

          <!-- Submit Button-->
          <button type="submit" class="w-full bg-black rounded-sm text-white py-2 px-3">
            Login
          </button>

          <!-- Switch Between Login and Registration -->
          <div class="mt-6 text-center text-sm">
            <p>
              Don't have an account?
              <NuxtLink to="/register" class="text-blue-600 hover:underline">
                Sign Up Now
              </NuxtLink>
            </p>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>