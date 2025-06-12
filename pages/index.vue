<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { type Book, type Category } from '~/stores/storage'
import type { CheckboxGroupItem, CheckboxGroupValue, RadioGroupItem, RadioGroupValue } from '@nuxt/ui'

const loadingProducts = ref(true);
const error = ref<string | null>(null);
const products = ref<Book[]>([]);
const sortBy = ref("name-asc");

// Status Filter
const stockGroupItem = ref<RadioGroupItem[]>(['Available', 'Out of Stock', 'Discontinued'])
const stockGroupValue = ref<RadioGroupValue>('Available')

// Categories Filter
const categories = ref<Category[]>([]);
const categoryGroupItem = ref<CheckboxGroupItem[]>([])
const categoryGroupValue = ref<CheckboxGroupValue[]>([])
const loadingCategories = ref(true);

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

    // Apply stock availability filter
    switch (stockGroupValue.value) {
        case 'Available':
            filtered = filtered.filter((book) => book.stock_quantity > 0)
            break;
        case 'Out of Stock':
            filtered = filtered.filter((book) => book.stock_quantity === 0 && !book.is_discontinued)
            break;
        case 'Discontinued':
            filtered = filtered.filter((book) => book.stock_quantity === 0 && book.is_discontinued)
            break;
    }

    // Apply category filter
    if (categoryGroupValue.value.length > 0) {
        const selectedSlugs = categoryGroupValue.value.map((t) => categories.value.find((c) => c.name === t)?.slug);
        filtered = filtered.filter((product) => {
            for (const categorySlug of product.categories) {
                if (selectedSlugs.includes(categorySlug)) return true;
            }
            return false;
        })
    }

    // Apply sorting
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

const readyToReveal = ref(false);

function resetFilters() {
    stockGroupValue.value = "Available";
    categoryGroupValue.value = [];
}
function addToCart(id: number) { }

// Load products and categories
onMounted(async () => {
    try {
        // Load products
        loadingProducts.value = true;
        products.value = await $fetch('/api/product-all', { method: 'GET' });
        loadingProducts.value = false;

        // Load categories
        loadingCategories.value = true;
        categories.value = (await $fetch('/api/category-all', { method: 'GET' })).sort((a, b) => a.name.localeCompare(b.name));
        categoryGroupItem.value = categories.value.map((c) => c.name)
        loadingCategories.value = false;

        readyToReveal.value = true;
    } catch (err: any) {
        error.value = err.message || "Failed to load products";
        loadingProducts.value = false;
        loadingCategories.value = false;
        console.error("Error loading data:", err);
    }
});

</script>

<template>
    <div class="flex flex-col gap-y-14">

        <!-- Store Title -->
        <section v-if="readyToReveal" class="bg-gray-100 py-12 rounded-lg">
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
        <USkeleton v-else class="w-full h-45"></USkeleton>

        <section>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

                <!-- Filter Sidebar -->

                <div v-if="!loadingCategories && readyToReveal" class="md:col-span-1">
                    <div class="bg-white p-6 rounded-lg shadow-sm sticky top-4 transition-colors">
                        <h2 class="text-lg font-semibold mb-4 text-center">
                            Filter Books
                        </h2>

                        <div class="space-y-4">

                            <!-- Filter by Status -->
                            <URadioGroup legend="Selling Status" color='neutral' variant="table"
                                v-model="stockGroupValue" :items="stockGroupItem" />

                            <!-- Filter by Category -->
                            <UCheckboxGroup legend="Categories" color="neutral" variant="table"
                                v-model="categoryGroupValue" :items="categoryGroupItem" />

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
                <USkeleton v-else class="rounded-lg top-4 h-110"></USkeleton>

                <!-- Table of Products -->

                <div class="md:col-span-3">

                    <!-- Counting and Sorting -->

                    <div class="mb-6 flex justify-between items-center">
                        <p v-if="readyToReveal" class="text-gray-600">
                            {{ ['Showing', filteredProducts.length, 'products'].join(' ') }}
                        </p>
                        <USkeleton v-else class="h-8 w-[200px]"></USkeleton>

                        <div v-if="readyToReveal" class="flex items-center space-x-2">
                            <label for="sort" class="text-sm text-gray-600">Sort By:</label>
                            <USelect v-model="sortByState" :items="sortByOptions" class="w-48" />
                        </div>
                        <USkeleton v-else class="h-8 w-[230px]"></USkeleton>
                    </div>

                    <!-- Product Cards -->

                    <div v-if="error" class="text-center py-12">
                        <p class="text-red-500">{{ error }}</p>
                    </div>
                    <div v-else-if="!loadingProducts && readyToReveal && filteredProducts.length === 0"
                        class="text-center py-12 bg-white rounded-lg shadow-sm transition-colors">
                        <p class="text-gray-600">
                            No Products Found
                        </p>
                    </div>
                    <div v-else-if="!loadingProducts && readyToReveal"
                        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div v-for="product in filteredProducts" :key="product.id">
                            <NuxtLink :to="'/products/' + product.id" class="rounded-xl">
                                <div class="aspect-2/3 bg-gray-200 rounded-t-xl">
                                    <img :src="product.image_url" loading="lazy"
                                        class="w-full aspect-400/600 object-cover rounded-t-xl">
                                </div>
                                <div class="shadow-md p-3 rounded-b-xl">
                                    <p class="text-xl font-bold">{{ product.price }} $</p>
                                    <p class="line-clamp-2">{{ product.title }}</p>
                                    <p class="font-light">{{ product.author }}</p>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div v-for="id in [1, 2, 3, 4]" :key="id">
                            <USkeleton class="aspect-6/10 rounded-xl"></USkeleton>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>