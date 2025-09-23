<template>
  <div class="articles-page">
    <section class="page-header">
      <h1>Fitness Articles</h1>
      <p>Read evidence-based articles about workouts, nutrition, recovery, and healthy living.</p>
    </section>

    <section class="articles-list">
      <div v-for="article in articles" :key="article.id" class="article-card">
        <img :src="article.image" :alt="article.title" class="article-image" />
        <div class="article-content">
          <h3>{{ article.title }}</h3>
          <p>{{ article.summary }}</p>
          <RouterLink :to="`/articles/${article.id}`" class="btn">Read More</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

interface Article {
  id: number
  title: string
  summary: string
  image: string
}

const articles = ref<Article[]>([
  {
    id: 1,
    title: "10-Minute Full Body Workout",
    summary: "Quick, effective workout routines for all fitness levels.",
    image: "https://preview.redd.it/full-body-workout-v0-mhd2m7850qi91.png?width=640&crop=smart&auto=webp&s=d9d00e30c4993b710eb9593f2231bafc820b28dc",
  },
  {
    id: 2,
    title: "Healthy Meal Prep Tips",
    summary: "Learn how to prep meals efficiently to fuel your workouts.",
    image: "https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg",
  },
  {
    id: 3,
    title: "Stretching for Recovery",
    summary: "Essential stretches to prevent injury and improve mobility.",
    image: "https://cdn.prod.website-files.com/667e874f45b06e6a2960bd2e/676ad13a3a0169c7e8c9436a_beginner-stretches.webp",
  },
  {
    id: 4,
    title: "Nutrition Myths Busted",
    summary: "Separate fact from fiction in popular diet and fitness claims.",
    image: "https://cdn-thewellnesscorner.s3.amazonaws.com/tw-blog/content/images/wordpress/2017/07/Nutrition-Myths-Busted.png",
  },
])
</script>

<style scoped>
.articles-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.1rem;
  color: #374151;
}

.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.article-card {
  background: #f0f4ff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.article-content {
  padding: 1rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.article-content h3 {
  color: #1e3a8a;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.article-content p {
  color: #374151;
  flex: 1;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  background: #2563eb;
  color: white;
  text-align: center;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #1e3a8a;
}
</style>
