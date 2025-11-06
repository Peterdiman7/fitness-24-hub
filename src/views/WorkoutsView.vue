<template>
	<div class="workouts-list container">
		<h1 class="section-title">Browse Workout Categories</h1>
		<p class="subtitle">Choose a category to explore available exercises</p>

		<div class="grid">
			<div v-for="category in categories" :key="category.id" class="category-card">
				<RouterLink :to="`/workouts/category/${category.id}`" class="card-link">
					<div class="card-content">
						<!-- Category Image -->
						<div class="card-image">
							<img :src="category.image_url || '/placeholder.jpg'" :alt="category.name" />
						</div>

						<!-- Category Info -->
						<h3>{{ category.name }}</h3>
						<p>{{ category.description }}</p>

						<div class="view-exercises-btn">
							View Exercises →
						</div>
					</div>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Category {
	id: number
	name: string
	description: string
	image_url: string
}

const categories = ref<Category[]>([])

const fetchCategories = async () => {
	try {
		const res = await fetch("http://localhost:9102/categories", {
			credentials: "include"
		})
		if (!res.ok) throw new Error("Failed to fetch categories")
		categories.value = await res.json()
	} catch (err) {
		console.error("Fetch categories error:", err)
	}
}

onMounted(fetchCategories)
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

.workouts-list {
	padding: 4rem 2rem;
	font-family: 'Poppins', sans-serif;
	text-align: center;
}

.section-title {
	font-size: 2.5rem;
	margin-bottom: 1rem;
	font-weight: 700;
	color: var(--primary);
}

.subtitle {
	font-size: 1.125rem;
	color: var(--gray-600);
	margin-bottom: 3rem;
}

.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 2rem;
}

.category-card {
	background: #fff;
	border: 1px solid var(--gray-300);
	border-radius: 20px;
	box-shadow: var(--shadow-md);
	transition: all 0.3s ease;
}

.category-card:hover {
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

.card-content {
	padding: 1.5rem;
}

.card-image {
	width: 100%;
	height: 200px;
	border-radius: 15px;
	overflow: hidden;
	margin-bottom: 1.5rem;
}

.card-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}

.card-content h3 {
	font-size: 1.5rem;
	margin-bottom: 0.75rem;
	font-weight: 600;
	color: var(--primary-dark);
}

.card-content p {
	font-size: 1rem;
	line-height: 1.6;
	color: var(--gray-600);
	margin-bottom: 1.5rem;
}

.view-exercises-btn {
	display: inline-block;
	padding: 0.75rem 1.5rem;
	background: var(--primary);
	color: white;
	border-radius: 8px;
	font-weight: 600;
	transition: background 0.3s ease;
}

.category-card:hover .view-exercises-btn {
	background: var(--primary-dark);
}

@media (max-width: 768px) {
	.workouts-list {
		padding: 2rem 1rem;
	}

	.section-title {
		font-size: 2rem;
	}
}
</style>