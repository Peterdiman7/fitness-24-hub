<!-- NutritionList.vue -->
<template>
  <div class="nutrition-list container">
    <h1>Nutrition Plans & Tips</h1>
    <div class="grid">
      <div v-for="plan in nutritionPlans" :key="plan.id" class="card">
        <RouterLink :to="`/nutrition/${plan.id}`" class="card-link">
          <div class="card-header">
            <span class="icon">{{ plan.icon }}</span>
            <h3>{{ plan.title }}</h3>
          </div>
          <p>{{ plan.description }}</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nutritionPlans = ref([
  { id: 1, title: "High Protein", description: "Boost muscle growth with protein-rich meals.", icon: "🥩" },
  { id: 2, title: "Low Carb", description: "Burn fat with low carbohydrate meal plans.", icon: "🥗" },
  { id: 3, title: "Vegan", description: "Plant-based meals for energy and wellness.", icon: "🌱" },
  { id: 4, title: "Balanced Diet", description: "Well-rounded meals for daily energy.", icon: "🍎" },
  { id: 5, title: "Pre-Workout Snacks", description: "Quick energy snacks to fuel workouts.", icon: "🍌" },
])
</script>

<style scoped>
.nutrition-list {
  padding: 4rem 2rem;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}
.nutrition-list h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #00acc1;
}

/* Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

/* Card Styles */
.card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
}
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 1.5rem;
}
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.icon {
  font-size: 2rem;
  margin-right: 0.8rem;
}
.card h3 {
  font-size: 1.3rem;
  color: #007c91;
}
.card p {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .nutrition-list {
    padding: 2rem 1rem;
  }
}
</style>
