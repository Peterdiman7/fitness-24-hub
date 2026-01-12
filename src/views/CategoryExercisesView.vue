<template>
    <!-- <div class="exercises-list container">
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
                            <div class="card-image">
                                <img :src="exercise.image_url || '/placeholder.jpg'" :alt="exercise.title" />
                            </div>
                            <h3>{{ exercise.title }}</h3>
                            <p class="description">{{ exercise.description }}</p>
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
    </div> -->
    <div class="page-header parallaxie">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <div class="page-header-box">
                        <h1 class="text-anime-style-2" data-cursor="-opaque">Workouts</h1>
                        <nav class="wow fadeInUp">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="./">home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">workouts</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="our-scrolling-ticker subpages-scrolling-ticker">
        <div class="scrolling-ticker-box">
            <div class="scrolling-content">
                <span><img src="/images/star-icon.svg" alt="">personal trainers</span>
                <span><img src="/images/star-icon.svg" alt="">live classes</span>
                <span><img src="/images/star-icon.svg" alt="">outdoor & online trainers</span>
                <span><img src="/images/star-icon.svg" alt="">personal training</span>
                <span><img src="/images/star-icon.svg" alt="">live classes</span>
                <span><img src="/images/star-icon.svg" alt="">personal trainers</span>
                <span><img src="/images/star-icon.svg" alt="">personal trainers</span>
                <span><img src="/images/star-icon.svg" alt="">live classes</span>
                <span><img src="/images/star-icon.svg" alt="">outdoor & online trainers</span>
                <span><img src="/images/star-icon.svg" alt="">personal training</span>
                <span><img src="/images/star-icon.svg" alt="">live classes</span>
                <span><img src="/images/star-icon.svg" alt="">personal trainers</span>
            </div>
            <div class="scrolling-content">
                <span><img src="/images/star-icon.svg" alt="">personal trainers</span>
                <span><img src="/images/star-icon.svg" alt="">live classes</span>
                <span><img src="/images/star-icon.svg" alt="">outdoor & online trainers</span>
                <span><img src="/images/star-icon.svg" alt="">personal training</span>
                <span><img src="/images/star-icon.svg" alt="">live classes</span>
                <span><img src="/images/star-icon.svg" alt="">personal trainers</span>
                <span><img src="/images/star-icon.svg" alt="">personal trainers</span>
                <span><img src="/images/star-icon.svg" alt="">live classes</span>
                <span><img src="/images/star-icon.svg" alt="">outdoor & online trainers</span>
                <span><img src="/images/star-icon.svg" alt="">personal training</span>
                <span><img src="/images/star-icon.svg" alt="">live classes</span>
                <span><img src="/images/star-icon.svg" alt="">personal trainers</span>
            </div>
        </div>
    </div>
    <div class="page-services">
        <div class="container">
            <div class="row">
                <div v-for="exercise in exercises" :key="exercise.id" class="col-lg-4 col-md-6">
                    <div class="service-item wow fadeInUp">
                        <div class="service-image">
                            <a :href="`/workouts/${exercise.id}`" data-cursor-text="View">
                                <figure class="image-anime">
                                    <img :src="exercise.image_url" :alt="exercise.title">
                                </figure>
                            </a>
                        </div>
                        <div class="service-body">
                            <div class="service-content">
                                <h3 style="background-color: white; color: #171E2E; border-radius: 9px; padding: 4px;">
                                    <a :href="`/workouts/${exercise.id}`">{{ exercise.title }}</a></h3>
                            </div>
                            <div class="service-readmore-btn">
                                <div
                                    style="background-color: rgb(215, 251, 0); color: black; width: 50%; padding: 0.25rem; margin: 10px 0; border-radius: 9px; text-align: center;">
                                    Duration: {{ exercise.duration }}min</div>
                                <a :href="`/workouts/${exercise.id}`" class="readmore-btn">read more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

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
        const res = await fetch(`https://back.fitness24hub.com/categories/${categoryId.value}/workouts`, {
            credentials: "include"
        })

        if (!res.ok) throw new Error("Failed to fetch exercises")

        exercises.value = await res.json()

        // Fetch category name
        const catRes = await fetch(`https://back.fitness24hub.com/categories`, {
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