<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">Your Fitness Partner</div>
        <h1 class="hero-title">
          Transform Your Body,<br />
          <span class="gradient-text">Elevate Your Life</span>
        </h1>
        <p class="hero-description">
          Discover science-backed workout plans, expert nutrition guidance, and progress tracking tools
          designed to help you achieve your fitness goals.
        </p>
        <div class="hero-actions">
          <RouterLink to="/fitness-plans" class="btn btn-primary btn-lg">
            Get Started
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15l5-5-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </RouterLink>
          <RouterLink to="/workouts" class="btn btn-outline btn-lg">Explore Workouts</RouterLink>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-value">10k+</div>
            <div class="stat-label">Active Members</div>
          </div>
          <div class="stat">
            <div class="stat-value">500+</div>
            <div class="stat-label">Workout Plans</div>
          </div>
          <div class="stat">
            <div class="stat-value">95%</div>
            <div class="stat-label">Satisfaction Rate</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="visual-card card-1">
          <div class="card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div class="card-text">
            <div class="card-title">Heart Rate</div>
            <div class="card-value">142 bpm</div>
          </div>
        </div>
        <div class="visual-card card-2">
          <div class="card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
          </div>
          <div class="card-text">
            <div class="card-title">Progress</div>
            <div class="card-value">+24%</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="section-header">
        <h2>Everything You Need to Succeed</h2>
        <p>Comprehensive tools and resources to support your fitness journey</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
          </div>
          <h3>Expert Workouts</h3>
          <p>Professionally designed routines by certified trainers for all fitness levels</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="7" />
              <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" />
            </svg>
          </div>
          <h3>Nutrition Guidance</h3>
          <p>Science-based meal plans and nutritional advice to fuel your workouts</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <h3>Progress Tracking</h3>
          <p>Monitor your achievements and stay motivated with detailed analytics</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <h3>Community Support</h3>
          <p>Join thousands of members sharing tips, motivation, and success stories</p>
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="testimonials">
      <div class="section-header">
        <h2>Trusted by Thousands</h2>
        <p>Real results from real people</p>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="testimonial-rating">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <p class="testimonial-text">"The workout plans are incredibly well-structured. I've seen amazing results in
            just 3 months!"</p>
          <div class="testimonial-author">
            <div class="author-avatar">JD</div>
            <div class="author-info">
              <div class="author-name">Jessica Davis</div>
              <div class="author-role">Member since 2024</div>
            </div>
          </div>
        </div>
        <!-- Additional testimonial cards... -->
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="cta-content">
        <h2>Ready to Start Your Transformation?</h2>
        <p>Join thousands of members achieving their fitness goals with our expert-guided programs</p>
        <RouterLink to="/fitness-plans" class="btn btn-primary btn-lg">
          View Plans
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15l5-5-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.landing-page {
  font-family: 'Inter', sans-serif;
}

/* ---------------- Hero Section ---------------- */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--gray-100);
  color: var(--primary);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
  line-height: 1.7;
  max-width: 540px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

/* Buttons */
.btn,
a {
  text-decoration: none;
  /* removes underline */
  transition: all 0.3s ease;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}

.hero-stats {
  display: flex;
  gap: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--gray-200);
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.visual-card {
  position: absolute;
  background: white;
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-xl);
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--gray-300);
  transition: all 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

.visual-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.card-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.card-2 {
  bottom: 20%;
  right: 10%;
  animation-delay: 1.5s;
}

.card-icon {
  width: 48px;
  height: 48px;
  background: var(--gray-100);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.card-title {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 0.25rem;
}

.card-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

/* ---------------- Features Section ---------------- */
.features {
  padding: 6rem 2rem;
  background: white;
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-header p {
  font-size: 1.125rem;
  color: var(--gray-600);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.feature-card {
  padding: 2rem;
  border-radius: var(--radius-xl);
  background: var(--gray-50);
  border: 1px solid var(--gray-300);
  transition: all var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.feature-icon {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.feature-card p {
  color: var(--gray-600);
  line-height: 1.6;
}

/* ---------------- Testimonials ---------------- */
.testimonials {
  padding: 6rem 2rem;
  background: var(--gray-50);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-300);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.testimonial-rating {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  color: var(--accent);
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--gray-700);
  margin-bottom: 1.5rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 48px;
  height: 48px;
  background: var(--primary);
  color: white;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.author-name {
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.author-role {
  font-size: 0.875rem;
  color: var(--gray-500);
}

/* ---------------- CTA Section ---------------- */
.cta {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  color: white;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: white;
}

.cta-content p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-content .btn {
  background: white;
  color: var(--primary);
}

.cta-content .btn:hover {
  background: var(--gray-100);
  transform: translateY(-2px);
}

/* ---------------- Responsive ---------------- */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 4rem 2rem;
  }

  .hero-visual {
    min-height: 400px;
  }

  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    gap: 2rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
