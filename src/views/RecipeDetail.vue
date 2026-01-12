<template>
    <div class="recipe-detail" v-if="recipe">
        <div class="container">
            <button style="margin-top: 5rem;" @click="goBack" class="back-link">Back to Recipes</button>
            <div class="hero-section">
                <div class="hero-image">
                    <img :src="recipe.image_url || '/placeholder.jpg'" :alt="recipe.title" />
                </div>
                <div class="hero-content">
                    <h1>{{ recipe.title }}</h1>
                    <p class="description">{{ recipe.description }}</p>

                    <div class="recipe-stats">
                        <div class="stat">
                            <div class="stat-info">
                                <div class="stat-label">Calories</div>
                                <div class="stat-value">{{ recipe.calories }} cal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-grid">
                <div class="section ingredients-section">
                    <h2>Ingredients</h2>
                    <ul class="ingredients-list">
                        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                            <span class="checkmark">✓</span>
                            <span class="ingredient-text">
                                <strong>{{ ingredient.amount }} {{ ingredient.unit }}</strong>
                                {{ ingredient.ingredient }}
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="section instructions-section">
                    <h2>Instructions</h2>
                    <ol class="instructions-list">
                        <li v-for="instruction in recipe.instructions" :key="instruction.step_number">
                            <div class="step-number">{{ instruction.step_number }}</div>
                            <p>{{ instruction.instruction }}</p>
                        </li>
                    </ol>
                </div>
            </div>
            <div class="nutrition-info" v-if="recipe.protein || recipe.carbs || recipe.fat">
                <h2>Nutrition Facts (per serving)</h2>
                <div class="nutrition-grid">
                    <div class="nutrition-item" v-if="recipe.protein">
                        <span class="label">Protein</span>
                        <span class="value">{{ recipe.protein }}g</span>
                    </div>
                    <div class="nutrition-item" v-if="recipe.carbs">
                        <span class="label">Carbs</span>
                        <span class="value">{{ recipe.carbs }}g</span>
                    </div>
                    <div class="nutrition-item" v-if="recipe.fat">
                        <span class="label">Fat</span>
                        <span class="value">{{ recipe.fat }}g</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading recipe...</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

interface Ingredient {
    ingredient: string
    amount: string
    unit: string
}

interface Instruction {
    step_number: number
    instruction: string
}

interface Recipe {
    id: number
    category_id: number
    title: string
    description: string
    servings: number
    calories: number
    protein?: number
    carbs?: number
    fat?: number
    image_url: string
    ingredients: Ingredient[]
    instructions: Instruction[]
}

const route = useRoute()
const router = useRouter()
const recipe = ref<Recipe | null>(null)

const fetchRecipe = async () => {
    try {
        const res = await fetch(`https://back.fitness24hub.com/recipes/${route.params.id}`, {
            credentials: "include"
        })

        if (!res.ok) throw new Error("Failed to fetch recipe")

        recipe.value = await res.json()
    } catch (err) {
        console.error("Failed to load recipe:", err)
        router.push("/nutrition")
    }
}

const goBack = () => {
    if (recipe.value?.category_id) {
        router.push(`/nutrition/${recipe.value.category_id}/recipes`)
    } else {
        router.push("/nutrition")
    }
}

onMounted(fetchRecipe)
</script>

<style scoped>
:root {
    --primary: #00acc1;
    --primary-dark: #007c91;
    --gray-100: #f9fafb;
    --gray-300: #e5e7eb;
    --gray-600: #4b5563;
    --gray-900: #111827;
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
}

.recipe-detail {
    min-height: 100vh;
    padding-bottom: 4rem;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
}

.back-link {
    padding: 8px;
    border: none;
    border-radius: 9px;
    background-color: #D7FB00;
    margin-bottom: 2rem;
    transition: color 0.3s ease;
    font-size: 1rem;
    font-family: inherit;
}

.back-link:hover {
    color: gray;
}

.hero-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
    align-items: start;
}

.hero-image {
    width: 100%;
    height: 400px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
}

.hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero-content h1 {
    font-size: 2.5rem;
    color: var(--primary-dark);
    margin-bottom: 1rem;
}

.description {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--gray-600);
    margin-bottom: 2rem;
}

.recipe-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

.stat {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--gray-100);
    border-radius: 12px;
    border: 1px solid var(--gray-300);
}

.stat-icon {
    font-size: 2rem;
}

.stat-label {
    font-size: 0.875rem;
    color: var(--gray-600);
    margin-bottom: 0.25rem;
}

.stat-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: limegreen;
}

.content-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    margin: 4rem 0;
}

.section {
    background-color: #171E2E;
    padding: 2rem;
    border: 1px solid white;
    border-radius: 16px;
    box-shadow: var(--shadow-md);
}

.section h2 {
    font-size: 1.75rem;
    color: var(--primary-dark);
    margin-bottom: 1.5rem;
}

.ingredients-list {
    list-style: none;
    padding: 0;
}

.ingredients-list li {
    display: flex;
    align-items: start;
    gap: 1rem;
    padding: 0.75rem;
    border-bottom: 1px solid var(--gray-300);
}

.ingredients-list li:last-child {
    border-bottom: none;
}

.checkmark {
    color: var(--primary);
    font-size: 1.25rem;
    font-weight: bold;
    flex-shrink: 0;
}

.ingredient-text {
    color: var(--gray-600);
    line-height: 1.6;
}

.instructions-list {
    list-style: none;
    counter-reset: step-counter;
    padding: 0;
}

.instructions-list li {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
    counter-increment: step-counter;
}

.step-number {
    width: 40px;
    height: 40px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-shrink: 0;
}

.instructions-list li p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--gray-600);
    margin: 0;
}

.nutrition-info {
    padding: 2rem;
    border-radius: 16px;
    border: 1px solid var(--gray-300);
}

.nutrition-info h2 {
    font-size: 1.75rem;
    color: var(--primary-dark);
    margin-bottom: 1.5rem;
}

.nutrition-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
}

.nutrition-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background-color: #D7FB00;
    color: black;
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
}

.nutrition-item .label {
    font-size: 0.875rem;
    color: var(--gray-600);
    margin-bottom: 0.5rem;
}

.nutrition-item .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
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

@media (max-width: 1024px) {

    .hero-section,
    .content-grid {
        grid-template-columns: 1fr;
    }

    .hero-image {
        height: 300px;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }

    .hero-content h1 {
        font-size: 2rem;
    }

    .recipe-stats {
        grid-template-columns: 1fr;
    }

    .section {
        padding: 1.5rem;
    }
}
</style>