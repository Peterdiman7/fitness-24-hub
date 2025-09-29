<template>
  <div class="nutrition-list container">
    <h1 class="section-title">Nutrition Plans & Tips</h1>
    <div class="grid">
      <div v-for="plan in nutritionPlans" :key="plan.id" class="nutrition-card">
        <RouterLink :to="`/nutrition/${plan.id}`" class="card-link">
          <!-- Card Image -->
          <div class="card-image">
            <img :src="plan.image || '/placeholder.jpg'" :alt="plan.title" />
          </div>

          <!-- Card Header -->
          <div class="card-header">
            <span class="icon">{{ plan.icon }}</span>
            <h3>{{ plan.title }}</h3>
          </div>

          <!-- Description -->
          <p>{{ plan.description }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nutritionPlans = ref([
  {
    id: 1,
    title: "High Protein",
    description: "Boost muscle growth with protein-rich meals.",
    icon: "🥩",
    image: "https://content.health.harvard.edu/wp-content/uploads/2024/01/28e8e464-f55e-4b32-9bab-dc990d8cc927.jpg"
  },
  {
    id: 2,
    title: "Low Carb",
    description: "Burn fat with low carbohydrate meal plans.",
    icon: "🥗",
    image: "https://www.dietdoctor.com/wp-content/uploads/2019/01/Canadian-doctors-rock-awareness-raising-about-low-carb-eating.jpg"
  },
  {
    id: 3,
    title: "Vegan",
    description: "Plant-based meals for energy and wellness.",
    icon: "🌱",
    image: "https://cdn.prod.website-files.com/66bdfc87da2d5175e8c7dd54/66cc6a2cf0ed1150c428df3e_vegan.jpeg"
  },
  {
    id: 4,
    title: "Balanced Diet",
    description: "Well-rounded meals for daily energy.",
    icon: "🍎",
    image: "https://www.stormfitnessacademy.co.uk/wp-content/uploads/2020/03/Balanced-diet-scaled.jpg"
  },
  {
    id: 5,
    title: "Pre-Workout Snacks",
    description: "Quick energy snacks to fuel workouts.",
    icon: "🍌",
    image: "https://www.realsimple.com/thmb/WcYhugxkGolnVlCWsBB-J0eAf0Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pre-workout-snacks-energy-GettyImages-1184896149-33913bc249334352952998e32177677d.jpg"
  },
])
</script>

<style scoped>
:root {
  --primary: #00acc1;
  --primary-dark: #007c91;
  --gray-300: #e5e7eb;
  --gray-600: #4b5563;
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
}

/* Container */
.nutrition-list {
  padding: 4rem 2rem;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}

/* Title */
.section-title {
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  font-weight: 700;
  color: var(--primary);
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

/* Card */
.nutrition-card {
  background: #fff;
  border: 1px solid var(--gray-300);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.nutrition-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

/* Link */
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 1.5rem;
}

/* Card Image */
.card-image {
  width: 100%;
  height: 160px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.icon {
  font-size: 2rem;
  margin-right: 0.6rem;
}

.card-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--primary-dark);
}

/* Text */
.nutrition-card p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--gray-600);
}

/* Responsive */
@media (max-width: 768px) {
  .nutrition-list {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
