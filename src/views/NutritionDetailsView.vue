<template>
  <section class="container" v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <img :src="recipe.image || '/placeholder.jpg'" />
    <p>{{ recipe.description }}</p>

    <h3>Steps</h3>
    <ol>
      <li v-for="(step, i) in parsedSteps" :key="i">{{ step }}</li>
    </ol>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const recipe = ref(null)

onMounted(async () => {
  const res = await fetch(`https://back.fitness24hub.com/nutrition/recipes/${route.params.id}`)
  recipe.value = await res.json()
})

const parsedSteps = computed(() =>
  recipe.value?.steps?.split("||") || []
)
</script>
