<template>
  <div class="article-details-page">
    <div v-if="loading" class="loading">
      <p>Loading article...</p>
    </div>

    <div v-else-if="!article" class="not-found">
      <p>⚠️ Article not found.</p>
      <RouterLink to="/articles" class="btn back-btn">← Back to Articles</RouterLink>
    </div>

    <div v-else>
      <section class="article-header">
        <h1>{{ article.title }}</h1>
        <p class="article-meta">Published on {{ article.date }} | By {{ article.author }}</p>
      </section>

      <section class="article-body">
        <img :src="article.image" :alt="article.title" class="article-image" />
        <div class="article-content">
          <p v-for="(paragraph, index) in article.content" :key="index">{{ paragraph }}</p>
        </div>
      </section>

      <RouterLink to="/articles" class="btn back-btn">← Back to Articles</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

interface Article {
  id: number
  title: string
  author: string
  date: string
  image: string
  content: string[]
}

const route = useRoute()
const article = ref<Article | null>(null)
const loading = ref(true)

// Sample articles
const articles: Article[] = [
  {
    id: 1,
    title: "10-Minute Full Body Workout",
    author: "Jane Doe",
    date: "September 16, 2025",
    image: "/images/articles/fullbody.jpg",
    content: [
      "Start your day with this quick, energizing workout routine that targets all major muscle groups.",
      "Warm-up for 2 minutes with jumping jacks or running in place.",
      "Complete 3 rounds of: 10 push-ups, 15 squats, 10 lunges per leg, 20-second plank.",
      "Cool down with stretching for 3 minutes. Enjoy your energized and strong body!"
    ],
  },
  {
    id: 2,
    title: "Healthy Meal Prep Tips",
    author: "John Smith",
    date: "September 14, 2025",
    image: "/images/articles/mealprep.jpg",
    content: [
      "Meal prepping helps you save time, reduce stress, and stay on track with your nutrition goals.",
      "Plan your meals for the week and make a shopping list.",
      "Cook large batches of proteins, grains, and veggies to mix and match.",
      "Store in airtight containers and label with dates for freshness."
    ],
  },
]

onMounted(() => {
  const articleId = Number(route.params.articleId)
  if (!isNaN(articleId)) {
    article.value = articles.find(a => a.id === articleId) ?? null
  }
  loading.value = false
})
</script>

<style scoped>
.article-details-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.article-header {
  text-align: center;
  margin-bottom: 2rem;
}

.article-header h1 {
  font-size: 2.5rem;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}

.article-meta {
  color: #6b7280;
  font-size: 0.9rem;
}

.article-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.article-image {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.article-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #374151;
}

.btn.back-btn {
  display: inline-block;
  margin-top: 2rem;
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

.loading, .not-found {
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
  color: #374151;
}
</style>
