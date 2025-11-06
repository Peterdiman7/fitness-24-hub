<template>
    <div class="exercises-list container">
        <RouterLink to="/workouts" class="back-link">← Back to Categories</RouterLink>

        <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading exercises...</p>
        </div>

        <div v-else>
            <h1 class="section-title">{{ categoryName }} Exercises</h1>
            <p class="subtitle">Choose an exercise to view step-by-step instructions</p>

            <div v-if="exercises.length === 0" class="empty-state">
                <p>No exercises available in this category yet.</p>
            </div>

            <div v-else class="grid">
                <div v-for="exercise in exercises" :key="exercise.id" class="exercise-card">
                    <RouterLink :to="`/workouts/${exercise.id}`" class="card-link">
                        <div class="card-content">
                            <!-- Exercise Image -->
                            <div class="card-image">
                                <img :src="exercise.image_url || '/placeholder.jpg'" :alt="exercise.title" />
                            </div>

                            <!-- Exercise Info -->
                            <h3>{{ exercise.title }}</h3>
                            <p class="description">{{ exercise.description }}</p>

                            <!-- Exercise Badges -->
                            <div class="exercise-meta">
                                <span class="badge duration">⏱️ {{ exercise.duration }} min</span>
                                <span class="badge level" :class="exercise.level?.toLowerCase()">
                                    {{ exercise.level }}
                                </span>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

interface Exercise {
    id: number
    title: string
    description: string
    duration: number
    level: string
    image_url: string
}

const route = useRoute()
const exercises = ref<Exercise[]>([])
const categoryName = ref<string>('')
const loading = ref(true)

const categoryId = computed(() => route.params.categoryId)

const fetchExercises = async () => {
    loading.value = true
    try {
        const res = await fetch(`http://localhost:9102/categories/${categoryId.value}/workouts`, {
            credentials: "include"
        })

        if (!res.ok) throw new Error("Failed to fetch exercises")

        exercises.value = await res.json()

        // Fetch category name
        const catRes = await fetch(`http://localhost:9102/categories`, {
            credentials: "include"
        })
        const categories = await catRes.json()
        const category = categories.find((c: any) => c.id === Number(categoryId.value))
        categoryName.value = category?.name || 'Unknown Category'

    } catch (err) {
        console.error("Fetch exercises error:", err)
    } finally {
        loading.value = false
    }
}

onMounted(fetchExercises)
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

.exercises-list {
    padding: 4rem 2rem;
    font-family: 'Poppins', sans-serif;
}

.back-link {
    display: inline-block;
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    margin-bottom: 2rem;
    transition: color 0.3s ease;
}

.back-link:hover {
    color: var(--primary-dark);
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

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.exercise-card {
    background: #fff;
    border: 1px solid var(--gray-300);
    border-radius: 20px;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
}

.exercise-card:hover {
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
    height: 180px;
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
}

.exercise-meta {
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

.badge.duration {
    background: #dbeafe;
    color: #1e40af;
}

.badge.level {
    text-transform: capitalize;
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

@media (max-width: 768px) {
    .exercises-list {
        padding: 2rem 1rem;
    }

    .section-title {
        font-size: 2rem;
    }
}
</style>