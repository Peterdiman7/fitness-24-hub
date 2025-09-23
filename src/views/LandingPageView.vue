<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Your Fitness Journey Starts Here 💪</h1>
        <p>
          Discover workout plans, nutrition tips, and progress tracking tools to stay fit and healthy.
          Take the first step towards your personal best.
        </p>
        <div class="actions">
          <RouterLink to="/fitness-plans" class="btn primary">Start Training</RouterLink>
          <RouterLink to="/workouts" class="btn secondary">Explore Workouts</RouterLink>
        </div>
      </div>
      <div class="hero-image">
        <div class="floating-elements">
          <div class="element element-1">🏋️‍♂️</div>
          <div class="element element-2">🥗</div>
          <div class="element element-3">💪</div>
          <div class="element element-4">🏃‍♀️</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2>Why Choose FitWave?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3>Expert Workouts</h3>
            <p>Workout routines designed by certified personal trainers and fitness coaches</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🥗</div>
            <h3>Nutrition Guidance</h3>
            <p>Track your meals and follow expert nutrition tips to fuel your workouts</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Train Anywhere</h3>
            <p>Follow workouts on any device with offline access for on-the-go fitness</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3>Fitness Community</h3>
            <p>Join a supportive network of fitness enthusiasts sharing progress and tips</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial / Stats Section -->
    <section class="stats">
      <div class="container">
        <h2>Real Results, Real People</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <h3>10k+</h3>
            <p>Active Users</p>
          </div>
          <div class="stat-card">
            <h3>500+</h3>
            <p>Workout Plans</p>
          </div>
          <div class="stat-card">
            <h3>95%</h3>
            <p>User Satisfaction</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta">
      <div class="container">
        <h2>Ready to Transform Your Body?</h2>
        <p>Join thousands reaching their fitness goals with evidence-based routines</p>
        <RouterLink to="/fitness-plans" class="btn primary large">Start Free Trial</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* Landing Page Background */
.landing-page {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #e0f7fa, #80deea, #26c6da);
  color: #333;
}

/* Hero Section */
.hero {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 2rem;
  gap: 2rem;
}
.hero-content h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}
.actions .btn {
  margin-right: 1rem;
  transition: all 0.3s ease;
}
.actions .btn:hover {
  transform: translateY(-3px);
}

/* Floating Elements */
.floating-elements {
  display: flex;
  gap: 1rem;
}
.floating-elements .element {
  font-size: 2rem;
  animation: float 3s ease-in-out infinite alternate;
}
@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-15px); }
}

/* Features Section */
.features {
  padding: 4rem 2rem;
  background: #ffffffdd;
  border-radius: 20px;
  margin: 2rem;
}
.features h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
.feature-card {
  background: #ffffff;
  border-radius: 15px;
  padding: 2rem 1.5rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}
.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
}
.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

/* Stats Section */
.stats {
  padding: 4rem 2rem;
}
.stats h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
}
.stats-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}
.stat-card {
  background: #ffffff;
  border-radius: 15px;
  padding: 2rem 3rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
}
.stat-card h3 {
  font-size: 2rem;
  color: #26c6da;
  margin-bottom: 0.5rem;
}

/* CTA Section */
.cta {
  text-align: center;
  padding: 4rem 2rem;
  background: #26c6da;
  color: white;
  border-radius: 20px;
  margin: 2rem;
}
.cta h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.cta p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
.btn.primary {
  background-color: #00acc1;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  font-weight: 600;
}
.btn.secondary {
  background-color: #ffffff;
  color: #00acc1;
  border: 2px solid #00acc1;
}
.btn.large {
  font-size: 1.2rem;
  padding: 1rem 2.5rem;
}
.btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
  }
  .actions .btn {
    margin: 0.5rem 0;
  }
}
</style>
