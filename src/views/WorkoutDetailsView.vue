<template>
  <div class="workout-detail container" v-if="workout">
    <div class="workout-header">
      <h1>{{ workout.title }}</h1>
      <p>{{ workout.description }}</p>
      <img :src="workout.image_url" class="header-img" />

      <div class="meta">
        <span><strong>Duration:</strong> {{ workout.duration }} mins</span>
        <span><strong>Level:</strong> {{ workout.level }}</span>
      </div>
    </div>

    <div class="steps-container">
      <h2>How to Perform</h2>
      <ul>
        <li v-for="(step, index) in workout.steps" :key="index">
          <span class="step-number">{{ step.step_number }}</span>
          <span class="step-text">{{ step.instruction }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRoute } from "vue-router"
import { ref, onMounted } from "vue"

const route = useRoute()
const workout = ref<any>(null)

const fetchWorkout = async () => {
  try {
    const res = await fetch(`http://localhost:9102/workouts/${route.params.workoutId}`)
    workout.value = await res.json()
  } catch (err) {
    console.error("FETCH WORKOUT ERROR:", err)
  }
}

onMounted(fetchWorkout)
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.workout-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
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
