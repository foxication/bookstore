<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { user, fetch: refreshSession, clear } = useUserSession()

const accountItems = ref<DropdownMenuItem[]>([
  {
    label: 'Cart',
    icon: 'i-uil-cart',
    to: '/cart'
  },
  {
    label: 'Logout',
    icon: 'i-uil-signout',
    onSelect() { logout() }
  }
])

function logout() {
  clear();
}

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col">
      <header class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">

          <!-- Link to Main Page -->
          <NuxtLink to="/" class="text-xl font-bold">Book Store</NuxtLink>

          <!-- Navigation Buttons -->
          <div class="flex items-center space-x-4">

            <!-- Account Menu-->
            <UDropdownMenu v-if="user !== null" arrow :items="accountItems" :content="{ align: 'end' }"
              :ui="{ content: 'w-48' }">
              <UButton :label="capitalizeFirstLetter(user.name)" trailing-icon="i-uil-user" color="neutral"
                variant="subtle" />
            </UDropdownMenu>

            <!-- Login and Registration -->
            <UButtonGroup v-else orientation="horizontal">
              <UButton color="neutral" variant="subtle" label="Login" to="/login" />
              <UButton color="neutral" variant="subtle" label="Register" to="register" />
            </UButtonGroup>
          </div>
        </div>
      </header>

      <main class="flex-grow container mx-auto px-4 py-8">
        <NuxtPage />
      </main>

      <footer class="bg-gray-100">
        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-4">
                Book Store
              </h3>
              <p class="text-gray-600">
                A store on the Nuxt 3 stack with responsive design, skeleton
                loading and authorization system. Developed using Tailwind CSS,
                Nuxt UI, Pinia and modern frontend development practices.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">
                Links
              </h3>
              <ul class="space-y-2">
                <li>
                  <NuxtLink to="/" class="text-gray-600 hover:text-gray-900">
                    Home
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/login" class="text-gray-600 hover:text-gray-900">
                    Login
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/register" class="text-gray-600 hover:text-gray-900">
                    Register
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/nowhere" class="text-gray-600 hover:text-gray-900">
                    Nowhere
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">
                Contacts
              </h3>
              <address class="not-italic text-gray-600">
                <p>123 Shopping Street</p>
                <p>Market City, MC 12345</p>
                <p>Email: info@online-shop.com</p>
              </address>
            </div>
          </div>
          <div class="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>
              &copy; 2025 Book Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  </UApp>
</template>
