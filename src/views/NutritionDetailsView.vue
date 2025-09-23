<!-- NutritionDetail.vue -->
<template>
  <div class="nutrition-detail container">
    <div class="nutrition-card">
      <h1>{{ plan.title }}</h1>
      <p class="description">{{ plan.description }}</p>

      <h2>Meals / Tips</h2>
      <ul class="steps">
        <li v-for="(item, index) in plan.items" :key="index">
          <span class="step-number">{{ index + 1 }}</span>
          <span class="step-icon">{{ item.icon }}</span>
          <span class="step-text">{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const nutritionPlans = [
  {
    id: 1,
    title: "High Protein",
    description: "Boost muscle growth with protein-rich meals.",
    items: [
      { icon: "🥩", text: "Grilled chicken with quinoa" },
      { icon: "🍳", text: "Egg white omelet with spinach" },
      { icon: "🥜", text: "Protein smoothie with peanut butter" },
    ],
  },
  {
    id: 2,
    title: "Low Carb",
    description: "Burn fat with low carbohydrate meal plans.",
    items: [
      { icon: "🥗", text: "Caesar salad with grilled salmon" },
      { icon: "🥩", text: "Steak with roasted vegetables" },
      { icon: "🥚", text: "Boiled eggs for a snack" },
    ],
  },
  {
    id: 3,
    title: "Vegan",
    description: "Plant-based meals for energy and wellness.",
    items: [
      { icon: "🌱", text: "Lentil soup with vegetables" },
      { icon: "🥙", text: "Chickpea wrap with hummus" },
      { icon: "🍌", text: "Banana smoothie" },
    ],
  },
]

const plan = computed(() => nutritionPlans.find(p => p.id === Number(route.params.nutritionId)) ?? nutritionPlans[0])
</script>

<style scoped>
.nutrition-detail {
  padding: 4rem 2rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
}
.nutrition-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem 3rem;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.nutrition-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}
.nutrition-card h1 {
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
  margin-right: 0.8rem;
}
.step-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}
.step-text {
  font-size: 1rem;
  color: #333;
}

/* Responsive */
@media (max-width: 768px) {
  .nutrition-card {
    padding: 2rem 1.5rem;
  }
  .nutrition-card h1 {
    font-size: 1.7rem;
  }
}
</style>
