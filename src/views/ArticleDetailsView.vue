<template>
  <div class="article-details-page">
    <div v-if="loading" class="loading">
      <p>Loading article...</p>
    </div>
    <div v-else-if="!article" class="not-found">
      <p>Article not found.</p>
      <RouterLink to="/articles" class="btn back-btn">Back to Articles</RouterLink>
    </div>
    <div v-else>
      <RouterLink style="margin-top: 4rem;" to="/articles" class="btn back-btn">Back to Articles</RouterLink>
      <section class="article-header">
        <h1>{{ article.title }}</h1>
        <p class="article-meta">Published on {{ new Date(article.date).toLocaleString() }} | By {{ article.author }}</p>
      </section>
      <section class="article-body">
        <img :src="article.image" :alt="article.title" class="article-image" />
        <div class="article-content">
          <p v-for="(paragraph, index) in article.content" :key="index">{{ paragraph }}</p>
        </div>
      </section>
      <RouterLink to="/articles" class="btn back-btn">Back to Articles</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

interface Article {
  id: number
  title: string
  author: string
  date: string
  image: string
  content: string
  summary?: string
}

const route = useRoute()
const article = ref<Article | null>(null)
const loading = ref(true)
const error = ref("")

const fetchArticle = async () => {
  loading.value = true
  error.value = ""

  try {
    const res = await fetch(`https://back.fitness24hub.com/articles/${route.params.id}`, {
      credentials: "include"
    })

    if (!res.ok) throw new Error("Failed to fetch article")

    article.value = await res.json()
  } catch (err) {
    console.error("Error loading article:", err)
    error.value = "Failed to load article. Please try again."
  } finally {
    loading.value = false
  }
}

const contentParagraphs = computed(() => {
  if (!article.value?.content) return []
  return article.value.content
    .split(/\n\n+/)
    .filter(p => p.trim().length > 0)
})

onMounted(fetchArticle)
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

.loading,
.not-found {
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
  color: #374151;
}
</style>
