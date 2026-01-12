<template>
	<div class="workout-detail-page" v-if="workout">
		<div v-if="currentStep === 1" class="screen overview-screen">
			<div class="container">
				<div style="margin-top: 5rem;" class="workout-header">
					<button @click="goBack" class="btn back-btn">Back to Exercises</button>
					<div class="workout-image">
						<img :src="workout.image_url || '/placeholder.jpg'" :alt="workout.title" />
					</div>

					<h1>{{ workout.title }}</h1>

					<div class="workout-badges">
						<span class="badge duration">⏱️ {{ workout.duration }} mins</span>
						<span class="badge level" :class="workout.level?.toLowerCase()">{{ workout.level }}</span>
					</div>

					<p class="description">{{ workout.description }}</p>

					<div class="workout-stats">
						<div class="stat">
							<div class="stat-icon">💪</div>
							<div class="stat-info">
								<div class="stat-label">Difficulty</div>
								<div class="stat-value">{{ workout.level }}</div>
							</div>
						</div>
						<div class="stat">
							<div class="stat-icon">🔥</div>
							<div class="stat-info">
								<div class="stat-label">Est. Calories</div>
								<div class="stat-value">{{ estimatedCalories }}</div>
							</div>
						</div>
						<div class="stat">
							<div class="stat-icon">📋</div>
							<div class="stat-info">
								<div class="stat-label">Steps</div>
								<div class="stat-value">{{ workout.steps?.length || 0 }}</div>
							</div>
						</div>
					</div>

					<div class="what-to-expect">
						<h2>What to Expect</h2>
						<ul>
							<li>✓ Step-by-step visual guidance</li>
							<li>✓ Proper form and technique tips</li>
							<li>✓ Safety considerations</li>
							<li>✓ Common mistakes to avoid</li>
						</ul>
					</div>

					<button @click="currentStep = 2" class="btn btn-primary btn-large">
						Start Exercise
					</button>
				</div>
			</div>
		</div>
		<div v-if="currentStep === 2" class="screen instructions-screen">
			<div style="margin-top: 5rem;" class="container">
				<div class="instructions-header">
					<a :href="`/workouts/${route.params.workoutId}`" class="btn back-btn">Back to Overview</a>
					<h1>How to Perform</h1>
					<p class="step-counter">{{ workout.steps?.length || 0 }} Steps to Master</p>
				</div>

				<div class="steps-container">
					<div v-for="(step, index) in workout.steps" :key="index" class="step-card"
						:class="{ 'completed': completedSteps.includes(index) }">
						<div class="step-header">
							<div class="step-number">
								<span v-if="!completedSteps.includes(index)">{{ step.step_number }}</span>
								<span v-else class="checkmark">✓</span>
							</div>
							<h3>Step {{ step.step_number }}</h3>
						</div>
						<p class="step-instruction">{{ step.instruction }}</p>
						<button v-if="!completedSteps.includes(index)" @click="markStepComplete(index)"
							class="btn btn-outline btn-small">
							Mark Complete
						</button>
						<div v-else class="completed-badge">
							✓ Completed
						</div>
					</div>
				</div>

				<div class="action-buttons">
					<button @click="resetProgress" class="btn btn-secondary">
						Reset Progress
					</button>
					<button @click="goBack" class="btn btn-primary">
						✓ Finish Exercise
					</button>
				</div>
			</div>
		</div>
	</div>

	<div v-else class="loading-container">
		<div class="loading-spinner"></div>
		<p>Loading exercise...</p>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface WorkoutStep {
	step_number: number
	instruction: string
}

interface Workout {
	id: number
	category_id: number
	title: string
	description: string
	duration: number
	level: string
	image_url: string
	steps: WorkoutStep[]
}

const route = useRoute()
const router = useRouter()
const workout = ref<Workout | null>(null)
const currentStep = ref(1)
const completedSteps = ref<number[]>([])

const estimatedCalories = computed(() => {
	if (!workout.value) return 0
	const baseCalories = {
		'Beginner': 5,
		'Intermediate': 8,
		'Advanced': 12
	}
	const multiplier = baseCalories[workout.value.level as keyof typeof baseCalories] || 5
	return workout.value.duration * multiplier
})

const fetchWorkout = async () => {
	try {
		const res = await fetch(`https://back.fitness24hub.com/workouts/${route.params.workoutId}`, {
			credentials: "include"
		})

		if (!res.ok) throw new Error("Failed to fetch workout")

		workout.value = await res.json()
	} catch (err) {
		console.error("Fetch workout error:", err)
	}
}

const goBack = () => {
	if (workout.value?.category_id) {
		router.push(`/workouts/category/${workout.value.category_id}`)
	} else {
		router.push('/workouts')
	}
}

const markStepComplete = (index: number) => {
	if (!completedSteps.value.includes(index)) {
		completedSteps.value.push(index)
	}
}

const resetProgress = () => {
	completedSteps.value = []
}

onMounted(fetchWorkout)
</script>

<style scoped>
.workout-detail-page {
	min-height: 100vh;
	padding-bottom: 2rem;
}

.container {
	max-width: 900px;
	margin: 0 auto;
	padding: 0 2rem;
}

/* Progress Bar */
.progress-bar {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	background: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 2rem;
}

.progress-step {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	color: #9ca3af;
	transition: color 0.3s ease;
}

.progress-step.active {
	color: var(--primary);
}

.progress-step.completed {
	color: var(--secondary);
}

.step-circle {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 2px solid currentColor;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	font-size: 1.1rem;
	transition: all 0.3s ease;
}

.progress-step.active .step-circle {
	background: var(--primary);
	color: white;
}

.progress-step.completed .step-circle {
	background: var(--secondary);
	color: white;
	border-color: var(--secondary);
}

.progress-line {
	width: 100px;
	height: 2px;
	background: #e5e7eb;
	margin: 0 1rem;
	transition: background 0.3s ease;
}

.progress-line.completed {
	background: var(--secondary);
}

.progress-step span {
	font-size: 0.875rem;
	font-weight: 500;
}

/* Screen Transitions */
.screen {
	animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* Overview Screen */
.overview-screen {
	padding: 2rem 0;
}

.back-link {
	display: inline-block;
	background: none;
	border: none;
	color: var(--primary);
	text-decoration: none;
	font-weight: 500;
	margin-bottom: 1.5rem;
	cursor: pointer;
	transition: color 0.3s ease;
	font-size: 1rem;
	font-family: inherit;
}

.back-link:hover {
	color: var(--primary-dark);
}

.workout-image {
	width: 100%;
	height: 300px;
	border-radius: 16px;
	overflow: hidden;
	margin-bottom: 2rem;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	border: 1px solid white;
}

.workout-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.workout-header h1 {
	font-size: 2.5rem;
	color: #1e3a8a;
	margin-bottom: 1rem;
}

.workout-badges {
	display: flex;
	gap: 1rem;
	margin-bottom: 1.5rem;
}

.badge {
	padding: 0.5rem 1rem;
	border-radius: 20px;
	font-weight: 600;
	font-size: 0.9rem;
}

.badge.duration {
	background: #dbeafe;
	color: #1e40af;
}

.badge.level {
	padding: 0.5rem 1rem;
}

.badge.level.beginner {
	background: #d1fae5;
	color: #065f46;
}

.badge.level.intermediate {
	background: #fef3c7;
	color: #92400e;
}

.badge.level.advanced {
	background: #fee2e2;
	color: #991b1b;
}

.description {
	font-size: 1.1rem;
	line-height: 1.7;
	color: #4b5563;
	margin-bottom: 2rem;
}

.workout-stats {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1.5rem;
	margin-bottom: 2rem;
}

.stat {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1.5rem;
	border-radius: 12px;
	border: 1px solid #e5e7eb;
}

.stat-icon {
	font-size: 2rem;
}

.stat-label {
	font-size: 0.875rem;
	color: #6b7280;
	margin-bottom: 0.25rem;
}

.stat-value {
	font-size: 1.25rem;
	font-weight: 700;
	color: #1e3a8a;
}

.what-to-expect {
	background: #eff6ff;
	padding: 2rem;
	border-radius: 12px;
	margin-bottom: 2rem;
	border-left: 4px solid var(--primary);
}

.what-to-expect h2 {
	font-size: 1.5rem;
	color: #1e3a8a;
	margin-bottom: 1rem;
}

.what-to-expect ul {
	list-style: none;
	padding: 0;
}

.what-to-expect li {
	padding: 0.5rem 0;
	color: #374151;
	font-size: 1rem;
}

/* Instructions Screen */
.instructions-screen {
	padding: 2rem 0;
}

.instructions-header {
	text-align: center;
	margin-bottom: 3rem;
}

.btn.back-btn {
	display: inline-block;
	margin: 2rem 0;
	padding: 0.6rem 1.2rem;
	background: #2563eb;
	color: white;
	text-decoration: none;
	border-radius: 8px;
	font-weight: 500;
	transition: background 0.3s ease;
}

.btn.back-btn:hover {
	background: #1e3a8a;
}

.instructions-header h1 {
	font-size: 2.5rem;
	color: #1e3a8a;
	margin-bottom: 0.5rem;
}

.step-counter {
	color: #6b7280;
	font-size: 1.1rem;
}

.steps-container {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-bottom: 3rem;
}

.step-card {
	background: white;
	padding: 2rem;
	border-radius: 16px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	border: 2px solid #e5e7eb;
	transition: all 0.3s ease;
}

.step-card:hover {
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	border-color: var(--primary);
}

.step-card.completed {
	background: #f0fdf4;
	border-color: var(--secondary);
}

.step-header {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
}

.step-number {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: var(--primary);
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	font-size: 1.25rem;
	flex-shrink: 0;
}

.step-card.completed .step-number {
	background: var(--secondary);
}

.checkmark {
	font-size: 1.5rem;
}

.step-header h3 {
	font-size: 1.5rem;
	color: #1e3a8a;
}

.step-instruction {
	font-size: 1.1rem;
	line-height: 1.7;
	color: #374151;
	margin-bottom: 1.5rem;
}

.completed-badge {
	display: inline-block;
	padding: 0.5rem 1rem;
	background: #d1fae5;
	color: #065f46;
	border-radius: 20px;
	font-weight: 600;
	font-size: 0.9rem;
}

.action-buttons {
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
}

/* Buttons */
.btn {
	padding: 0.875rem 1.75rem;
	border-radius: 12px;
	font-weight: 600;
	font-size: 1rem;
	cursor: pointer;
	transition: all 0.3s ease;
	border: none;
	text-decoration: none;
	display: inline-block;
	font-family: inherit;
}

.btn-primary {
	background: var(--primary);
	color: white;
}

.btn-primary:hover {
	background: var(--primary-dark);
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-secondary {
	background: #f3f4f6;
	color: #374151;
}

.btn-secondary:hover {
	background: #e5e7eb;
}

.btn-outline {
	background: transparent;
	border: 2px solid var(--primary);
}

.btn-outline:hover {
	background: var(--primary);
	background-color: black;
}

.btn-large {
	padding: 1.25rem 2.5rem;
	font-size: 1.125rem;
	width: 100%;
	margin-top: 1rem;
}

.btn-small {
	padding: 0.5rem 1rem;
	font-size: 0.875rem;
}

/* Loading */
.loading-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 60vh;
	gap: 1rem;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

@media (max-width: 768px) {
	.container {
		padding: 0 1rem;
	}

	.workout-header h1,
	.instructions-header h1 {
		font-size: 2rem;
	}

	.workout-stats {
		grid-template-columns: 1fr;
	}

	.progress-bar {
		padding: 1rem;
	}

	.progress-line {
		width: 50px;
	}

	.progress-step span {
		font-size: 0.75rem;
	}

	.step-circle {
		width: 35px;
		height: 35px;
		font-size: 1rem;
	}

	.action-buttons {
		flex-direction: column;
	}

	.btn {
		width: 100%;
	}
}
</style>