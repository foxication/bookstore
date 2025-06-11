<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { type Book, type Category } from '~/stores/storage'
import type { RadioGroupItem } from '@nuxt/ui'

const loading = ref(true);
const error = ref<string | null>(null);
const products = ref<Book[]>([]);
const sortBy = ref("name-asc");

// Status Filter
const statusFilter = ref<RadioGroupItem[]>(['Available', 'Out of Stoke', 'Discontinued'])

// Categories Filter
const categories = ref<Category[]>([]);
const loadingCategories = ref(true);
const selectedCategories = ref<string[]>([]);

// SortBy
const sortMap = {
    fromA: 'Name: A to Z',
    fromZ: 'Name: Z to A',
    priceAsc: 'Price: Lowest to Most',
    priceDesc: 'Price: Most to Lowest',
}
const sortByOptions = ref(Object.values(sortMap))
const sortByState = ref(sortMap['fromA'])

// Filtered
const filteredProducts = computed(() => {
    let filtered = [...products.value];

    filtered.sort((a, b) => {
        switch (sortByState.value) {
            case sortMap['fromA']: return a.title.localeCompare(b.title);
            case sortMap['fromZ']: return b.title.localeCompare(a.title);
            case sortMap['priceAsc']: return a.price - b.price;
            case sortMap['priceDesc']: return b.price - a.price;
        }
        return 0;
    });

    return filtered;
});

function resetFilters() { }
function addToCart(id: number) { }

// Load products and categories
onMounted(async () => {
    try {
        // Load products
        loading.value = true;
        products.value = await $fetch('/api/product-all', { method: 'GET' });
        loading.value = false;

        // Load categories
        loadingCategories.value = true;
        categories.value = await $fetch('/api/category-all', { method: 'GET' });
        loadingCategories.value = false;
    } catch (err: any) {
        error.value = err.message || "Failed to load products";
        loading.value = false;
        loadingCategories.value = false;
        console.error("Error loading data:", err);
    }
});

</script>

<template>
    <div class="flex flex-col gap-y-14">

        <!-- Store Title -->
        <section class="bg-gray-100 py-12 rounded-lg">
            <div class="container mx-auto px-4">
                <div class="max-w-3xl mx-auto text-center">
                    <h1 class="text-4xl font-bold mb-4">
                        Welcome to Book Store!
                    </h1>
                    <p class="text-lg text-gray-600">
                        Your best online store
                    </p>
                </div>
            </div>
        </section>

        <section>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

                <!-- Filter Sidebar -->

                <div class="md:col-span-1">
                    <div class="bg-white p-6 rounded-lg shadow-sm sticky top-4 transition-colors">
                        <h2 class="text-lg font-semibold mb-4">
                            Filter Books
                        </h2>

                        <div class="space-y-4">

                            <!-- Filter by Status -->
                            <URadioGroup legend="Selling Status" color='neutral' variant="table"
                                default-value="Available" :items="statusFilter" />

                            <!-- Filter by Category -->
                            <div class="pt-4 border-t border-gray-200">
                                <h3 class="text-sm font-medium text-gray-700 mb-1">Categories</h3>
                                <div class="space-y-2 mt-2">
                                    <div v-if="loadingCategories" class="text-sm text-gray-500">
                                        Loading Categories
                                    </div>
                                    <div v-else-if="categories.length === 0" class="text-sm text-gray-500">
                                        No Categories
                                    </div>
                                    <div v-else class="space-y-2">
                                        <div class="flex items-center" v-for="category in categories"
                                            :key="category.id">
                                            <input type="checkbox" :id="`category-${category.id}`"
                                                :value="category.slug" v-model="selectedCategories"
                                                class="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                            <label :for="`category-${category.id}`" class="ml-2 text-sm text-gray-600">
                                                {{ category.name }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Reset Filters -->
                            <div class="pt-4 border-gray-200">
                                <UButton color="neutral" variant="outline" class="w-full justify-center"
                                    @click="resetFilters">
                                    Reset Filters
                                </UButton>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table of Products -->

                <div class="md:col-span-3">

                    <!-- Counting and Sorting -->

                    <div class="mb-6 flex justify-between items-center">
                        <p class="text-gray-600">
                            {{ ['Showing', filteredProducts.length, 'products'].join(' ') }}
                        </p>

                        <div class="flex items-center space-x-2">
                            <label for="sort" class="text-sm text-gray-600">Sort By:</label>
                            <USelect v-model="sortByState" :items="sortByOptions" class="w-48" />
                        </div>
                    </div>

                    <!-- Product Cards -->

                    <div v-if="loading" class="text-center py-12">
                        <p class="text-gray-500">Loading Products</p>
                    </div>
                    <div v-else-if="error" class="text-center py-12">
                        <p class="text-red-500">{{ error }}</p>
                    </div>
                    <div v-else-if="filteredProducts.length === 0"
                        class="text-center py-12 bg-white rounded-lg shadow-sm transition-colors">
                        <p class="text-gray-600">
                            No Products Found
                        </p>
                    </div>
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="product in filteredProducts" :key="product.id">
                            <NuxtLink :to="'/products/' + product.id" class="rounded-xl">
                                <img :src="product.image_url" class="w-full aspect-400/600 object-cover rounded-t-xl">
                                <div class="shadow-md p-3 rounded-b-xl">
                                    <p class="text-xl font-bold">{{ product.price }} $</p>
                                    <p class="line-clamp-2">{{ product.title }}</p>
                                    <p class="font-light">{{ product.author }}</p>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>