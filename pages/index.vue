<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { type Product, type Category } from '~/stores/products'

const loading = ref(true);
const error = ref<string | null>(null);
const products = ref<Product[]>([]);
const statusFilter = ref("available");
const sortBy = ref("name-asc");

// Categories
const categories = ref<Category[]>([]);
const loadingCategories = ref(true);
const selectedCategories = ref<string[]>([]);

const filteredProducts = computed(() => {
    let filtered = [...products.value];
    return filtered;
});

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
                            <div>
                                <h3 class="text-sm font-medium text-gray-700 mb-1">Selling Status</h3>
                                <div class="space-y-2">
                                    <div class="flex items-center">
                                        <input type="radio" id="available" value="available" v-model="statusFilter"
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                        <label for="available" class="ml-2 text-sm text-gray-600">
                                            Available
                                        </label>
                                    </div>
                                    <div class="flex items-center">
                                        <input type="radio" id="out-of-stock" value="out-of-stock" v-model="statusFilter"
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                        <label for="out-of-stock" class="ml-2 text-sm text-gray-600">
                                            Out of Stock
                                        </label>
                                    </div>
                                    <div class="flex items-center">
                                        <input type="radio" id="discontinued" value="discontinued" v-model="statusFilter"
                                            class="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                        <label for="discontinued" class="ml-2 text-sm text-gray-600">
                                            Discontinued
                                        </label>
                                    </div>
                                </div>
                            </div>

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
                                <button variant="outline"
                                    class="w-full bg-gray-200 rounded-sm py-2 px-3 hover:bg-gray-300"
                                    @click="resetFilters">
                                    Reset Filters
                                </button>
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
                            <select id="sort" v-model="sortBy"
                                class="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                <option value="name-asc">Name: A to Z</option>
                                <option value="name-desc">Name: Z to A</option>
                                <option value="price-asc">Price: lowest to most</option>
                                <option value="price-desc">Price: most to lowest</option>
                            </select>
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
                        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="{
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            description: product.description,
                        }" @add-to-cart="addToCart" />
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>