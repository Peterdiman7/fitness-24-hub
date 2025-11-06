<template>
	<div class="workouts-list container">
		<h1 class="section-title">Browse Workouts</h1>
		<div class="grid">
			<div v-for="workout in workouts" :key="workout.id" class="workout-card">
				<RouterLink :to="`/workouts/${workout.id}`" class="card-link">
					<div class="card-content">
						<!-- Workout Image -->
						<div class="card-image">
							<img :src="workout.image || '/placeholder.jpg'" :alt="workout.title" />
						</div>

						<!-- Workout Text -->
						<h3>{{ workout.title }}</h3>
						<p>{{ workout.description }}</p>
					</div>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const workouts = ref([])

const fetchWorkouts = async () => {
	try {
		const res = await fetch("http://localhost:9102/categories", {
			credentials: "include"
		})
		if (!res.ok) throw new Error("Failed to fetch")
		const data = await res.json()

		workouts.value = data.map((item: any) => ({
			id: item.id,
			title: item.name,
			description: item.description,
			image: item.image_url
		}))
	} catch (err) {
		console.error("Fetch workouts error:", err)
	}
}

onMounted(fetchWorkouts)
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

/* Container */
.workouts-list {
	padding: 4rem 2rem;
	font-family: 'Poppins', sans-serif;
	text-align: center;
}

/* Section Title */
.section-title {
	font-size: 2.5rem;
	margin-bottom: 2.5rem;
	font-weight: 700;
	color: var(--primary);
}

/* Grid Layout */
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 2rem;
}

/* Card Styles */
.workout-card {
	background: #fff;
	border: 1px solid var(--gray-300);
	border-radius: 20px;
	box-shadow: var(--shadow-md);
	transition: all 0.3s ease;
}

.workout-card:hover {
	transform: translateY(-6px);
	box-shadow: var(--shadow-lg);
	border-color: var(--primary);
}

/* Link Reset */
.card-link {
	text-decoration: none;
	color: inherit;
	display: block;
	padding: 2rem;
	height: 100%;
}

/* Card Content */
.card-content h3 {
	font-size: 1.4rem;
	margin-bottom: 0.75rem;
	font-weight: 600;
	color: var(--primary-dark);
}

.card-content p {
	font-size: 1rem;
	line-height: 1.6;
	color: var(--gray-600);
}

/* Responsive */
@media (max-width: 768px) {
	.workouts-list {
		padding: 2rem 1rem;
	}

	.section-title {
		font-size: 2rem;
	}
}

/* Card Image */
.card-image {
	width: 100%;
	height: 180px;
	border-radius: 15px;
	overflow: hidden;
	margin-bottom: 1rem;
}

.card-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}
</style>
