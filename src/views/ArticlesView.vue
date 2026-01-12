<template>
	<div class="page-header parallaxie">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-12">
					<div class="page-header-box">
						<h1 class="text-anime-style-2" data-cursor="-opaque">Our <span>blog</span></h1>
						<nav class="wow fadeInUp">
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="/">home</a></li>
								<li class="breadcrumb-item active" aria-current="page">blog</li>
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
	<div class="page-blog">
		<div class="container">
			<div class="row">
				<div v-for="article in articles" :key="article.id" class="col-lg-4 col-md-6">
					<div class="post-item wow fadeInUp">
						<div class="post-featured-image">
							<a :href="`/articles/${article.id}`" data-cursor-text="View">
								<figure class="image-anime">
									<img :src="article.image" :alt="article.title">
								</figure>
							</a>
						</div>
						<div class="post-item-body">
							<div class="post-item-content">
								<h2><RouterLink class="readmore-btn" :to="`/articles/${article.id}`">{{ article.title }}</RouterLink></h2>
							</div>
							<div class="post-item-btn">
								<RouterLink class="readmore-btn" :to="`/articles/${article.id}`">Read More</RouterLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Article {
	id: number
	title: string
	summary: string
	image: string
	author?: string
	date?: string
}

const articles = ref<Article[]>([])
const loading = ref(true)
const error = ref("")

const fetchArticles = async () => {
	loading.value = true
	error.value = ""

	try {
		const res = await fetch("https://back.fitness24hub.com/articles", {
			credentials: "include"
		})

		if (!res.ok) throw new Error("Failed to fetch articles")

		articles.value = await res.json()
	} catch (err) {
		console.error("Error loading articles:", err)
		error.value = "Failed to load articles. Please try again."
	} finally {
		loading.value = false
	}
}

onMounted(fetchArticles)
</script>

<style scoped></style>
