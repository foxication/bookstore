<script setup lang="ts">
const { user, fetch: refreshSession, clear } = useUserSession()

function logout() {
  clear();
  navigateTo("/");
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
          <NuxtLink to="/" class="text-xl font-bold">Online Store</NuxtLink>

          <!-- Navigation Buttons -->
          <div class="flex items-center space-x-4">

            <!-- Account -->
            <div v-if="user !== null" class="relative group">
              <button class="font-semibold flex items-center bg-gray-200 rounded-md px-4 py-2">
                Account: {{ capitalizeFirstLetter(user.name) }}
              </button>

              <!-- Dropdown Menu -->

              <div class="absolute right-0 w-56 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <NuxtLink to="/account/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Orders
                </NuxtLink>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>

            <!-- Login -->
            <NuxtLink v-else to="/login" class="font-semibold flex items-center bg-gray-200 rounded-md px-4 py-2">
              Login
            </NuxtLink>
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
                Online Store
              </h3>
              <p class="text-gray-600">
                Shop Description
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
              &copy; 2025 Online Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  </UApp>
</template>
