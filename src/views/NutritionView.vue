<template>
	<div class="nutrition-list container">
		<h1 class="section-title">Nutrition Plans & Recipes</h1>
		<p class="subtitle">Discover healthy recipes organized by category</p>
		<div v-if="loading" class="loading-container">
			<div class="loading-spinner"></div>
			<p>Loading nutrition categories...</p>
		</div>
		<div v-else-if="error" class="error-message">
			<p>{{ error }}</p>
			<button @click="fetchCategories" class="btn-retry">Try Again</button>
		</div>
		<div v-else class="grid">
			<div v-for="category in nutritionCategories" :key="category.id" class="nutrition-card">
				<RouterLink :to="`/nutrition/${category.id}/recipes`" class="card-link">
					<div class="card-image">
						<img :src="category.image_url || '/placeholder.jpg'" :alt="category.name" />
					</div>
					<div class="card-content">
						<h3>{{ category.name }}</h3>
						<p>{{ category.description }}</p>
						<div class="view-btn">
							View Recipes
						</div>
					</div>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"

interface NutritionCategory {
	id: number
	name: string
	description: string
	image_url: string
}

const nutritionCategories = ref<NutritionCategory[]>([])
const loading = ref(true)
const error = ref("")

const fetchCategories = async () => {
	loading.value = true
	error.value = ""

	try {
		const res = await fetch("https://back.fitness24hub.com/nutrition/categories", {
			credentials: "include"
		})

		if (!res.ok) throw new Error("Failed to fetch nutrition categories")

		nutritionCategories.value = await res.json()
	} catch (err) {
		console.error("Error loading nutrition categories:", err)
		error.value = "Failed to load nutrition categories. Please try again."
	} finally {
		loading.value = false
	}
}

onMounted(fetchCategories)
</script>

<style scoped>
:root {
	--primary: #00acc1;
	--primary-dark: #007c91;
	--gray-300: #e5e7eb;
	--gray-600: #4b5563;
	--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
	--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
}

/* Container */
.nutrition-list {
	padding: 4rem 2rem;
	font-family: 'Poppins', sans-serif;
	text-align: center;
}

/* Title */
.section-title {
	font-size: 2.5rem;
	margin: 5rem 0;
	font-weight: 700;
	color: var(--primary);
}

.subtitle {
	font-size: 1.125rem;
	color: var(--gray-600);
	margin-bottom: 3rem;
}

/* Loading */
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

/* Error */
.error-message {
	text-align: center;
	padding: 2rem;
	color: #ef4444;
}

.btn-retry {
	margin-top: 1rem;
	padding: 0.75rem 1.5rem;
	background: var(--primary);
	color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-weight: 600;
	transition: background 0.3s ease;
}

.btn-retry:hover {
	background: var(--primary-dark);
}

/* Grid */
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 2rem;
}

/* Card */
.nutrition-card {
	background: #fff;
	border: 1px solid var(--gray-300);
	border-radius: 20px;
	box-shadow: var(--shadow-md);
	transition: all 0.3s ease;
	overflow: hidden;
}

.nutrition-card:hover {
	transform: translateY(-6px);
	box-shadow: var(--shadow-lg);
	border-color: var(--primary);
}

/* Link */
.card-link {
	text-decoration: none;
	color: inherit;
	display: block;
	height: 100%;
}

/* Card Image */
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

.nutrition-card:hover .card-image img {
	transform: scale(1.05);
}

.card-content {
	padding: 1.5rem;
	color: black;
	background-color: #D7FB00;
}

.card-content h3 {
	font-size: 1.4rem;
	font-weight: 600;
	color: var(--primary-dark);
	margin-bottom: 0.75rem;
}

.card-content p {
	font-size: 1rem;
	line-height: 1.6;
	color: var(--gray-600);
	margin-bottom: 1.5rem;
}

.view-btn {
	display: inline-block;
	padding: 0.75rem 1.5rem;
	background: var(--primary);
	border-radius: 8px;
	font-weight: 600;
	transition: background 0.3s ease;
}

.nutrition-card:hover .view-btn {
	background: var(--primary-dark);
}

/* Responsive */
@media (max-width: 768px) {
	.nutrition-list {
		padding: 2rem 1rem;
	}

	.section-title {
		font-size: 2rem;
	}
}
</style>