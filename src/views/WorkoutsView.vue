<!-- WorkoutsList.vue -->
<template>
  <div class="workouts-list container">
    <h1>Browse Workouts</h1>
    <div class="grid">
      <div v-for="workout in workouts" :key="workout.id" class="card">
        <RouterLink :to="`/workouts/${workout.id}`" class="card-link">
          <div class="card-content">
            <h3>{{ workout.title }}</h3>
            <p>{{ workout.description }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const workouts = ref([
  { id: 1, title: "Full Body Strength", description: "Build total body strength in 30 minutes." },
  { id: 2, title: "Cardio Burn", description: "High-intensity cardio to torch calories." },
  { id: 3, title: "Yoga Stretch", description: "Flexibility and relaxation workout." },
  { id: 4, title: "Core Blast", description: "Strengthen your core with targeted exercises." },
  { id: 5, title: "HIIT Express", description: "Short bursts of high-intensity training." },
])
</script>

<style scoped>
.workouts-list {
  padding: 4rem 2rem;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}
.workouts-list h1 {
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

/* Link Reset */
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 1.5rem;
}

/* Card Content */
.card-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #007c91;
}
.card-content p {
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
}

/* Responsive Padding */
@media (max-width: 768px) {
  .workouts-list {
    padding: 2rem 1rem;
  }
}
</style>
