<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

const redirectToHome = () => clearError({ redirect: '/' })
</script>

<template>
    <div class="flex flex-col items-center justify-center text-center min-h-[100vh]">
        <UCard>
            <template #header>
                <p class=" text-lg font-semibold text-left">Book Store</p>
            </template>

            <p v-if="error?.statusCode !== undefined" class="font-semibold text-7xl text-red-500">
                {{ error.statusCode }}
            </p>
            
            <p v-if="error?.statusMessage !== undefined" class="font-bold text-3xl mt-4">
                {{ error.statusMessage }}
            </p>
            <p v-else class="font-bold text-3xl mt-4">
                Unknown Error
            </p>

            <template #footer>
                <UButton color="neutral" variant="outline" @click="redirectToHome">Go Back to Home Page
                </UButton>
            </template>
        </UCard>
    </div>
</template>