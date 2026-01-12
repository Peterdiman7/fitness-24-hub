<template>
    <div class="recipes-list container">
        <RouterLink style="margin-top: 5rem;" to="/nutrition" class="back-link">Back to Nutrition Categories
        </RouterLink>
        <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading recipes...</p>
        </div>
        <div v-else>
            <h1 class="section-title">{{ category?.name || 'Recipes' }}</h1>
            <p class="subtitle">{{ category?.description }}</p>
            <div v-if="recipes.length === 0" class="empty-state">
                <p>No recipes available in this category yet.</p>
            </div>
            <div v-else class="grid">
                <div v-for="recipe in recipes" :key="recipe.id" class="recipe-card">
                    <RouterLink :to="`/recipes/${recipe.id}`" class="card-link">
                        <div class="card-image">
                            <img :src="recipe.image_url || '/placeholder.jpg'" :alt="recipe.title" />
                        </div>
                        <div class="card-content">
                            <h3>{{ recipe.title }}</h3>
                            <p class="description">{{ recipe.description }}</p>
                            <div class="recipe-meta">
                                <span class="badge calories">🔥 {{ recipe.calories }} cal</span>
                                <span class="badge time" v-if="recipe.prep_time">⏱️ {{ recipe.prep_time }}min</span>
                                <span class="badge servings" v-if="recipe.servings">👥 {{ recipe.servings }}
                                    servings</span>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, RouterLink } from "vue-router"

interface Recipe {
    id: number
    title: string
    description: string
    servings: number
    calories: number
    image_url: string
}

interface Category {
    id: number
    name: string
    description: string
    image_url: string
}

const route = useRoute()
const recipes = ref<Recipe[]>([])
const category = ref<Category | null>(null)
const loading = ref(true)

const fetchData = async () => {
    loading.value = true

    try {
        const catRes = await fetch(`https://back.fitness24hub.com/nutrition/categories/${route.params.id}`, {
            credentials: "include"
        })
        if (catRes.ok) category.value = await catRes.json()

        const recipesRes = await fetch(`https://back.fitness24hub.com/nutrition/categories/${route.params.id}/recipes`, {
            credentials: "include"
        })
        if (recipesRes.ok) recipes.value = await recipesRes.json()
    } catch (err) {
        console.error("Failed to load recipes:", err)
    } finally {
        loading.value = false
    }
}

onMounted(fetchData)
</script>


<style scoped>
:root {
    --primary: #00acc1;
    --primary-dark: #007c91;
    --gray-100: #f9fafb;
    --gray-300: #e5e7eb;
    --gray-600: #4b5563;
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
}

.recipes-list {
    padding: 4rem 2rem;
    font-family: 'Poppins', sans-serif;
}

.back-link {
    display: inline-block;
    padding: 8px;
    border-radius: 9px;
    background-color: #D7FB00;
    color: black;
    text-decoration: none;
    font-weight: 500;
    margin-bottom: 2rem;
    transition: color 0.3s ease;
}

.back-link:hover {
    color: gray;
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    color: var(--primary);
    text-align: center;
}

.subtitle {
    font-size: 1.125rem;
    color: var(--gray-600);
    margin-bottom: 3rem;
    text-align: center;
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: 1rem;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e5e7eb;
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.empty-state {
    text-align: center;
    padding: 3rem;
    color: var(--gray-600);
    font-size: 1.125rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.recipe-card {
    background: #fff;
    border: 1px solid var(--gray-300);
    border-radius: 20px;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
    overflow: hidden;
}

.recipe-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary);
}

.card-link {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
}

.card-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
}

.recipe-card:hover .card-image img {
    transform: scale(1.05);
}

.card-content {
    padding: 1.5rem;
    border: 1px solid white;
    border-top: none;
    background-color: #171E2E;
}

.card-content h3 {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
    color: var(--primary-dark);
}

.description {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--gray-600);
    margin-bottom: 1.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.recipe-meta {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.875rem;
}

.badge.calories {
    background: #fee2e2;
    color: #991b1b;
}

.badge.time {
    background: #dbeafe;
    color: #1e40af;
}

.badge.servings {
    background: #d1fae5;
    color: #065f46;
}

@media (max-width: 768px) {
    .recipes-list {
        padding: 2rem 1rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .grid {
        grid-template-columns: 1fr;
    }
}
</style>