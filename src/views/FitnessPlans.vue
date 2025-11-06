<template>
  <div class="plans-page">
    <h1>Choose Your Fitness Plan</h1>
    <div class="plans-grid">
      <div v-for="plan in plans" :key="plan.id" :class="['plan-card', plan.bestValue ? 'best-value' : '']">
        <div v-if="plan.bestValue" class="best-value-label">Best Value</div>
        <h2>{{ plan.name }}</h2>
        <p class="price">{{ plan.price }}</p>
        <ul class="features">
          <li v-for="feature in plan.features" :key="feature">
            ✅ {{ feature }}
          </li>
        </ul>
        <button class="btn" @click="selectPlan(plan)">Select Plan</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

interface Plan {
  id: number
  name: string
  price: string
  features: string[]
  bestValue?: boolean
}

// ✅ Global default plans
const globalPlans: Plan[] = [
  {
    id: 1,
    name: "1 Day Access",
    price: "$1.95 – one-time",
    features: ["Full library access", "HD streaming", "One-time payment"],
  },
  {
    id: 2,
    name: "5 Days Access",
    price: "$9.95 every 5 days",
    features: ["Full library access", "HD streaming", "Cancel anytime"],
  },
  {
    id: 3,
    name: "10 Days Access",
    price: "$19.95 every 10 days",
    features: ["Full library access", "HD streaming", "Cancel anytime"],
  },
  {
    id: 4,
    name: "15 Days Access",
    price: "$29.95 every 15 days",
    features: ["Full library access", "HD streaming", "Cancel anytime"],
    bestValue: true,
  },
  {
    id: 5,
    name: "20 Days Access",
    price: "$39.95 every 20 days",
    features: ["Full library access", "HD streaming", "Cancel anytime"],
  },
  {
    id: 6,
    name: "30 Days Access",
    price: "$49.95 per month",
    features: ["Full library access", "HD streaming", "Cancel anytime"],
  },
]

// ✅ Localized pricing per subdomain
const localPricing: Record<string, Plan[]> = {
  ku: [
    {
      id: 101,
      name: "Daily Access",
      price: "0.100 KWD / day",
      features: ["Full library access", "HD streaming", "Works on mobile & web"],
    },
    {
      id: 102,
      name: "Weekly Access",
      price: "0.700 KWD / week",
      features: ["Full library access", "Offline access", "Priority support"],
      bestValue: true,
    },
  ],
  ksa: [
    {
      id: 201,
      name: "Daily Access",
      price: "1.50 SAR / day",
      features: ["Full library access", "HD streaming", "Works on all devices"],
    },
  ],
  iq: [
    {
      id: 301,
      name: "Daily Access",
      price: "0.240 IQD / day",
      features: ["Full library access", "HD streaming", "Cancel anytime"],
    },
    {
      id: 302,
      name: "Weekly Access",
      price: "0.700 IQD / week",
      features: ["Full library access", "Offline access", "Priority support"],
      bestValue: true,
    },
  ],
  su: [
    {
      id: 401,
      name: "Daily Access",
      price: "600 SDP / day",
      features: ["Full library access", "HD streaming", "Basic support"],
    },
    {
      id: 402,
      name: "Weekly Access",
      price: "1500 SDP / week",
      features: ["Full library access", "Offline access", "Priority support"],
      bestValue: true,
    },
    {
      id: 403,
      name: "Monthly Access",
      price: "3600 SDP / month",
      features: ["Full library access", "Offline access", "VIP support", "Multi-device"],
    },
  ],
}

// ✅ Detect subdomain
const subdomain = window.location.hostname.split(".")[0]
const isLocal = ["ku", "ksa", "iq", "su"].includes(subdomain)

// ✅ Computed plans: local if available, else global
const plans = computed(() => (isLocal ? localPricing[subdomain] : globalPlans))

const selectPlan = (plan: Plan) => {
  router.push({ name: "checkout", query: { plan: plan.id, region: isLocal ? subdomain : "global" } })
}
</script>

<style scoped>
.plans-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.plan-card {
  padding: 2rem;
  border-radius: 16px;
  background-color: #f0fdfa;
  position: relative;
  transition: transform 0.3s ease;
}

.plan-card:hover {
  transform: translateY(-5px);
}

.best-value {
  background-color: #14b8a6;
  color: white;
}

.best-value-label {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: #facc15;
  color: #000;
  font-weight: bold;
  border-radius: 0 0 12px 12px;
}

.plan-card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.features {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.features li {
  margin-bottom: 0.5rem;
  text-align: left;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #14b8a6;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.btn:hover {
  background-color: #0f766e;
}
</style>
