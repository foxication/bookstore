<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { type Product, type Category } from '~/stores/products'
import type { RadioGroupItem } from '@nuxt/ui'

const loading = ref(true);
const error = ref<string | null>(null);
const products = ref<Product[]>([]);
const sortBy = ref("name-asc");

// Status Filter
const statusFilter = ref<RadioGroupItem[]>(['Available', 'Out of Stoke', 'Discontinued'])

// Categories Filter
const categories = ref<Category[]>([]);
const loadingCategories = ref(true);
const selectedCategories = ref<string[]>([]);

// Filtered
const filteredProducts = computed(() => {
    let filtered = [...products.value];
    return filtered;
});

// SortBy
const sortByOptions = ref(['Name: A to Z', 'Name: Z to A', 'Price: lowest to most', 'Price: most to lowest',])
const sortByState = ref('Name: A to Z')

function resetFilters() { }
function addToCart(product: {
    id: number;
    name: string;
    price: number;
}) { }

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
                            <URadioGroup legend="Selling Status" color='neutral' variant="table" default-value="Available" :items="statusFilter" />

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
                                <UButton color="neutral" variant="outline" class="w-full justify-center" @click="resetFilters">
                                    Reset Filters
                                </UButton>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Table of Products -->

                <div class="md:col-span-3">

                    <!-- Status and Sorting -->

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
                        <!-- <ProductCard v-for="product in filteredProducts" :key="product.id" :product="{
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            description: product.description,
                        }" @add-to-cart="addToCart" /> -->
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>