<script setup lang="ts">
import * as z from 'zod'
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { type Book } from "~/stores/products"

const addToCartSchema = z.object({ quantity: z.number().min(1).max(10) })
type AddToCartSchema = z.output<typeof addToCartSchema>
const addToCart = reactive<AddToCartSchema>({ quantity: 1 })

const route = useRoute();

const productId = computed(() => Number(route.params.id));
const readyToReveal = ref(false);
const loadError = ref<string | null>(null);
const product = ref<Book | null>(null);

// Fetch product details
onMounted(async () => {
  try {
    product.value = await $fetch('/api/product-by-id', {
      method: 'POST',
      body: { id: productId.value }
    });

    if (!product.value) throw Error("Product is not found");
    readyToReveal.value = true;
  } catch (err: any) {
    loadError.value = err.message || "Unknown error in load of product details";
  }
});

// TODO
const product_stock_quantity = 50;

</script>

<template>
  <div>

    <!-- Error Page -->

    <div v-if="loadError" class="py-12">
      <UAlert color="error" title="Error" :description="loadError" icon="material-symbols:error-rounded" />
      <UButton color="neutral" variant="outline" class="mt-4 justify-self" @click="navigateTo('/')">
        Back To Main Page
      </UButton>
    </div>

    <!-- Product Page -->

    <div v-else class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

        <!-- Product Image -->

        <div v-if="product && readyToReveal" class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
          <div class="w-full h-[600px] bg-blue-950"></div>
          <!-- <img :src="product.image_url || 'https://placehold.co/600x400?text=No+Image'" :alt="product.title" class="w-full h-auto object-cover" /> -->
        </div>
        <USkeleton v-else class="w-full h-[600px] rounded-lg" />

        <!-- Product Information -->

        <div class="flex flex-col gap-6">

          <!-- Title + Price -->

          <div class="flex flex-col gap-2">
            <h1 v-if="product && readyToReveal" class="text-3xl font-bold">{{ product.title }}</h1>
            <USkeleton v-else class="h-8 w-full" />

            <div v-if="product && readyToReveal" class="text-2xl font-bold text-gray-900 dark:text-gray-50">
              ${{ product.price.toFixed(2) }}
            </div>
            <USkeleton v-else class="h-8 w-[25%]" />
          </div>

          <!-- Description -->

          <p v-if="product && readyToReveal" class="text-gray-600">{{ product.description }}</p>
          <USkeleton v-else class="h-24 w-full" />

          <!-- Quantity + Add to Cart -->

          <UForm v-if="product && readyToReveal" :schema="addToCartSchema" :state="addToCart"
            class="grid grid-cols-2 gap-4">
            <UInputNumber v-model="addToCart.quantity" :min="1" :max="10" color='neutral' />
            <UButton type="submit" color='neutral'>Add to Cart</UButton>
          </UForm>
          <div v-else class="grid grid-cols-2 gap-4">
            <USkeleton class="h-8" />
            <USkeleton class="h-8" />
          </div>

          <!-- Details: Stock + Shipping + Transaction -->

          <div v-if="product && readyToReveal" class="border-t border-gray-200 pt-8 space-y-4">
            <div v-if="product_stock_quantity > 0" class="flex items-center gap-x-2">
              <UIcon name="i-uil-box" class="size-5 text-green-500" />
              <span class="text-gray-600">In Stock: {{ product_stock_quantity }}</span>
            </div>
            <div v-else-if="true" class="flex items-center gap-x-2">
              <UIcon name="i-uil-times" class="size-5 text-orange-500" />
              <span class="text-gray-600">Temporarily Out of Stock</span>
            </div>
            <div v-else-if="true" class="flex items-center gap-x-2">
              <UIcon name="i-uil-times" class="size-5 text-red-500" />
              <span class="text-gray-600">Discontinued</span>
            </div>

            <div class="flex items-center gap-x-2">
              <UIcon name="i-uil-truck" class="size-5 text-green-500" />
              <span class="text-gray-600">Free Shipping</span>
            </div>
            <div class="flex items-center gap-x-2">
              <UIcon name="i-uil-shield-check" class="size-5 text-green-500" />
              <span class="text-gray-600">Secure Transaction</span>
            </div>
          </div>

          <!-- Details as Skeleton -->

          <div v-else class="border-t border-gray-200 pt-8 space-y-4">
            <USkeleton class="h-8 w-[40%]" />
            <USkeleton class="h-8 w-[40%]" />
            <USkeleton class="h-8 w-[40%]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
