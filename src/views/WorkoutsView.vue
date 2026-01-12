<template>
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
		<div style="display: flex; justify-content: center; padding: 1rem 0;">
			<h2>Choose a workout that suits your needs the best</h2>
		</div>
		<div class="container">
			<div class="row">
				<div v-for="category in categories" :key="category.id" class="col-lg-4 col-md-6">
					<div class="service-item wow fadeInUp">
						<div class="service-image">
							<a :href="`/workouts/category/${category.id}`" data-cursor-text="View">
								<figure class="image-anime">
									<img :src="category.image_url" :alt="category.name">
								</figure>
							</a>
						</div>
						<div class="service-body">
							<div class="service-content">
								<h3><a :href="`/workouts/category/${category.id}`">{{ category.name }}</a></h3>
							</div>
							<div class="service-readmore-btn">
								<a :href="`/workouts/category/${category.id}`" class="readmore-btn">read more</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="why-choose-us light-section">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-6">
					<div class="why-choose-content">
						<div class="section-title section-title-center">
							<div class="section-bg-title wow fadeInUp">
								<span>why us</span>
							</div>
							<h3 class="wow fadeInUp" data-wow-delay="0.2s">why choose us</h3>
							<h2 class="text-anime-style-2" data-cursor="-opaque">Elevate fitness with the <span>best
									way</span> possible</h2>
							<p class="wow fadeInUp" data-wow-delay="0.4s">We offer a fitness journey that's tailored to
								your goals, supported by professional trainers and a welcoming community. Whether it's
								weight loss, strength building, or overall wellness, our proven methods.</p>
						</div>
						<div class="why-choose-steps">
							<div class="why-choose-step-item wow fadeInUp">
								<div class="why-choose-step-no">
									<h2>01</h2>
								</div>
								<div class="why-choose-step-content">
									<h3>personalized fitness plans</h3>
									<p>We tailor every workout to fit your unique goals and fitness level ensuring that
										you make the most progress.</p>
								</div>
							</div>
							<div class="why-choose-step-item wow fadeInUp" data-wow-delay="0.2s">
								<div class="why-choose-step-no">
									<h2>02</h2>
								</div>
								<div class="why-choose-step-content">
									<h3>results-driven focus</h3>
									<p>Everything we do is designed to help you achieve measurable results, whether
										you're aiming for weight loss.</p>
								</div>
							</div>
							<div class="why-choose-step-item wow fadeInUp" data-wow-delay="0.4s">
								<div class="why-choose-step-no">
									<h2>03</h2>
								</div>
								<div class="why-choose-step-content">
									<h3>state-of-the-art equipment</h3>
									<p>We provide the latest in gym equipment, from cardio machines to free weights,
										designed to support every type.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="why-choose-image">
						<div class="why-choose-img-box-1">
							<div class="why-choose-img-1">
								<figure class="image-anime reveal">
									<img src="/images/why-choose-image-1.jpg" alt="">
								</figure>
							</div>
							<div class="why-choose-img-2">
								<figure class="image-anime reveal">
									<img src="/images/why-choose-image-2.jpg" alt="">
								</figure>
							</div>
						</div>
						<div class="why-choose-img-box-2">
							<div class="why-choose-img-3">
								<figure class="image-anime reveal">
									<img src="/images/why-choose-image-3.jpg" alt="">
								</figure>
							</div>
							<div class="why-choose-img-4">
								<figure class="image-anime reveal   ">
									<img src="/images/why-choose-image-4.jpg" alt="">
								</figure>
							</div>
						</div>
						<div class="contact-now-circle">
							<a href="/contacts"><img src="/images/contact-us-circle.svg" alt=""></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="our-goal">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-6">
					<div class="goal-content">
						<div class="section-title">
							<div class="section-bg-title wow fadeInUp">
								<span>fitness goal</span>
							</div>
							<h3 class="wow fadeInUp" data-wow-delay="0.2s">fitness goal</h3>
							<h2 class="text-anime-style-2" data-cursor="-opaque">why we're your top <span>fitness
									choice</span></h2>
						</div>
						<div class="goal-content-list">
							<div class="goal-content-item wow fadeInUp" data-wow-delay="0.4s">
								<div class="icon-box">
									<img src="/images/icon-goal-1.svg" alt="">
								</div>
								<div class="goal-item-content">
									<h3>State of the art euipment</h3>
									<p>Experience cutting-edge fitness equipment designed to elevate your health and
										fitness journey.</p>
								</div>
							</div>
							<div class="goal-content-item wow fadeInUp" data-wow-delay="0.6s">
								<div class="icon-box">
									<img src="/images/icon-goal-2.svg" alt="">
								</div>
								<div class="goal-item-content">
									<h3>Flexible membership options</h3>
									<p>Choose from a variety of flexible membership plans tailored to fit your schedule
										and fitness goals.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="our-goal-image">
						<div class="goal-image">
							<figure>
								<img src="/images/goal-image.jpg" alt="">
							</figure>
						</div>
						<div class="goal-info-box-1">
							<div class="icon-box">
								<img src="/images/icon-goal-info.svg" alt="">
							</div>
							<div class="goal-info-content">
								<h3><span class="counter">25</span>%</h3>
								<p>Healthy nutrition</p>
							</div>
						</div>
						<div class="goal-info-box-2">
							<div class="icon-box">
								<img src="/images/icon-goal-info.svg" alt="">
							</div>
							<div class="goal-info-content">
								<h3><span class="counter">30</span>%</h3>
								<p>Balanced diet</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="our-faqs">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-6">
					<div class="faqs-content">
						<div class="section-title section-title-center">
							<div class="section-bg-title wow fadeInUp">
								<span>faqs</span>
							</div>
							<h3 class="wow fadeInUp" data-wow-delay="0.2s">Frequently Asked Questions</h3>
							<h2 class="text-anime-style-2" data-cursor="-opaque">Answers to your <span>most
									common</span> questions</h2>
						</div>
						<div class="faq-accordion" id="accordion">
							<div class="accordion-item wow fadeInUp" data-wow-delay="0.4s">
								<h2 class="accordion-header" id="heading1">
									<button class="accordion-button" type="button" data-bs-toggle="collapse"
										data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
										What types of fitness classes do you offer?
									</button>
								</h2>
								<div id="collapse1" class="accordion-collapse collapse show" aria-labelledby="heading1"
									data-bs-parent="#accordion">
									<div class="accordion-body">
										<p>We offer a wide variety of fitness classes including HIIT, yoga, spin,
											strength training, cardio, and more.</p>
									</div>
								</div>
							</div>
							<div class="accordion-item wow fadeInUp" data-wow-delay="0.6s">
								<h2 class="accordion-header" id="heading2">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
										data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
										Do I need to be a member to attend a class?
									</button>
								</h2>
								<div id="collapse2" class="accordion-collapse collapse" aria-labelledby="heading2"
									data-bs-parent="#accordion">
									<div class="accordion-body">
										<p>Yes, you’ll need to be a member to attend a class.
											But don’t worry — we offer flexible plans for every budget, from short-term
											access passes to full monthly memberships. You can choose the option that
											best fits your fitness goals and schedule.</p>
									</div>
								</div>
							</div>
							<div class="accordion-item wow fadeInUp" data-wow-delay="0.8s">
								<h2 class="accordion-header" id="heading3">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
										data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
										What should I bring to my first workout?
									</button>
								</h2>
								<div id="collapse3" class="acco	rdion-collapse collapse" aria-labelledby="heading3"
									data-bs-parent="#accordion">
									<div class="accordion-body">
										<p>Everything is online — all you need is yourself and a positive attitude! If
											you have weights or basic equipment at home, that’s great, but they’re
											completely optional. Most workouts can be done with just your body weight.
										</p>
									</div>
								</div>
							</div>
							<div class="accordion-item wow fadeInUp" data-wow-delay="1s">
								<h2 class="accordion-header" id="heading4">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
										data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
										What is your cancellation policy for classes?
									</button>
								</h2>
								<div id="collapse4" class="accordion-collapse collapse" aria-labelledby="heading4"
									data-bs-parent="#accordion">
									<div class="accordion-body">
										<p>You can cancel your membership or access plan anytime — no long-term
											commitments or hidden fees. Simply manage your plan from your account
											settings, and your access will remain active until the end of your current
											billing period.</p>
									</div>
								</div>
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

interface Category {
	id: number
	name: string
	description: string
	image_url: string
}

const categories = ref<Category[]>([])

const fetchCategories = async () => {
	try {
		const res = await fetch("https://back.fitness24hub.com/categories", {
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

<style scoped></style>