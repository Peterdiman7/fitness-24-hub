<template>
  <div class="workout-detail container">
    <div class="workout-card">
      <h1>{{ workout.title }}</h1>
      <p class="description">{{ workout.description }}</p>

      <h2>Steps</h2>
      <ul class="steps">
        <li v-for="(step, index) in workout.steps" :key="index">
          <span class="step-number">{{ index + 1 }}</span>
          <span class="step-text">{{ step }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()

const workouts = [
  { id: 1, title: "Full Body Strength", description: "Build total body strength in 30 minutes.", steps: ["Warm up 5 min", "Push-ups 3x10", "Squats 3x15", "Cool down 5 min"] },
  { id: 2, title: "Cardio Burn", description: "High-intensity cardio to torch calories.", steps: ["Jumping jacks 3x30", "Burpees 3x10", "Sprints 5x1min"] },
  { id: 3, title: "Yoga Stretch", description: "Flexibility and relaxation workout.", steps: ["Sun Salutation", "Downward Dog", "Seated Forward Bend"] },
]

const workout = computed(() => workouts.find(w => w.id === Number(route.params.workoutId)) ?? workouts[0])
</script>

<style scoped>
.workout-detail {
  padding: 4rem 2rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
}
.workout-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem 3rem;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.workout-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}
.workout-card h1 {
  font-size: 2rem;
  color: #007c91;
  margin-bottom: 0.5rem;
}
.description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.6;
}
.steps {
  list-style: none;
  padding: 0;
}
.steps li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background: #e0f7fa;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  transition: transform 0.2s ease;
}
.steps li:hover {
  transform: translateX(5px);
}
.step-number {
  background: #00acc1;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
.step-text {
  font-size: 1rem;
  color: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .workout-card {
    padding: 2rem 1.5rem;
  }
  .workout-card h1 {
    font-size: 1.7rem;
  }
}
</style>
