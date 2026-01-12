<template>
    <div class="our-pricing light-section">
        <div class="container">
            <div class="row section-row">
                <div class="col-lg-12">
                    <div class="section-title section-title-center">
                        <div class="section-bg-title wow fadeInUp">
                            <span>pricing</span>
                        </div>
                        <h3 class="wow fadeInUp" data-wow-delay="0.2s">pricing plan</h3>
                        <h2 class="text-anime-style-2" data-cursor="-opaque">Transform Your Body with Our <span>Dynamic
                                Fitness</span> Classes</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="plan in plans" :key="plan.id" class="col-lg-4 col-md-6">
                    <div class="pricing-item wow fadeInUp" :class="[plan.bestValue ? 'highlighted-box' : '']">
                        <div class="pricing-header">
                            <h3>{{ plan.name }}</h3>
                            <h2>{{ plan.price }}</h2>
                        </div>
                        <div class="pricing-body">
                            <ul>
                                <li v-for="feature in plan.features" :key="feature">
                                    {{ feature }}
                                </li>
                            </ul>
                        </div>
                        <div class="pricing-btn">
                            <button @click="selectPlan(plan)" class="btn-default">Get Membership</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="pricing-benefit-list wow fadeInUp" data-wow-delay="0.6s">
                        <ul>
                            <li><img src="/images/icon-pricing-benefit-2.svg" alt="">No any hidden fees pay</li>
                            <li><img src="/images/icon-pricing-benefit-3.svg" alt="">You can cancel anytime </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

interface Plan {
    id: number
    name: string
    price: string
    features: string[]
    bestValue?: boolean
}

const globalPlans: Plan[] = [
    {
        id: 1,
        name: "1 Day Access",
        price: "$1.95 – one-time",
        features: ["Full fitness library access", "Workout & meal plan preview", "One-time payment"],
    },
    {
        id: 2,
        name: "7 Days Access",
        price: "$9.95 - 7 days",
        features: ["Full fitness library access", "Personalized exercise routines", "Cancel anytime"],
    },
    {
        id: 3,
        name: "Monthly",
        price: "$19.95 Monthly",
        features: ["Full fitness library access", "Nutrition guidance", "Cancel anytime"],
    },
    {
        id: 4,
        name: "Monthly",
        price: "$29.95 Monthly",
        features: ["Full fitness library access", "Personalized workouts & nutrition", "Progress tracking", "Cancel anytime"],
        bestValue: true,
    },
    {
        id: 5,
        name: "Monthly",
        price: "$39.95 Monthly",
        features: ["Full fitness library access", "Customized plans", "Progress tracking", "Cancel anytime"],
    },
    {
        id: 6,
        name: "Monthly",
        price: "$49.95 Monthly",
        features: ["Full fitness library access", "Personalized workout & diet plans", "Progress tracking", "Expert tips", "Cancel anytime"],
    },
]

const localPricing: Record<string, Plan[]> = {
    ku: [
        {
            id: 101,
            name: "Daily Access",
            price: "0.100 KWD / day",
            features: ["Access to all workouts & nutrition guides", "Track progress", "Use on mobile & web"],
        },
        {
            id: 102,
            name: "Weekly Access",
            price: "0.700 KWD / week",
            features: ["Full fitness library", "Personalized workout & meal plans", "Priority support"],
            bestValue: true,
        },
    ],
    ksa: [
        {
            id: 201,
            name: "Daily Access",
            price: "1.50 SAR / day",
            features: ["Access to all workouts & nutrition guides", "Progress tracking", "Works on all devices"],
        },
    ],
    iq: [
        {
            id: 301,
            name: "Daily Access",
            price: "0.240 IQD / day",
            features: ["Access to workouts & nutrition", "Progress tracking", "Cancel anytime"],
        },
        {
            id: 302,
            name: "Weekly Access",
            price: "0.700 IQD / week",
            features: ["Full fitness access", "Customized plans", "Priority support"],
            bestValue: true,
        },
    ],
    su: [
        {
            id: 401,
            name: "Daily Access",
            price: "600 SDP / day",
            features: ["Access to workouts & meal plans", "Progress tracking", "Basic support"],
        },
        {
            id: 402,
            name: "Weekly Access",
            price: "1500 SDP / week",
            features: ["Full fitness access", "Customized plans", "Priority support"],
            bestValue: true,
        },
        {
            id: 403,
            name: "Monthly Access",
            price: "3600 SDP / month",
            features: ["Full fitness access", "Personalized workouts & nutrition", "VIP support", "Multi-device access"],
        },
    ],
}

const subdomain = window.location.hostname.split(".")[0]
const isLocal = ["ku", "ksa", "iq", "su"].includes(subdomain)

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
    background-color: #D7FB00;
    position: relative;
    transition: transform 0.3s ease;
}

.plan-card:hover {
    transform: translateY(-5px);
}

.best-value {
    background-color: #F2F2F2;
}

.best-value-label {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem;
    background: #D7FB00;
    border: 1px solid black;
    border-top: none;
    color: #000;
    font-weight: bold;
    border-radius: 0 0 12px 12px;
}

.plan-card h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: black;
}

.price {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: black;
}

.features {
    list-style: none;
    padding: 0;
    margin-bottom: 1.5rem;
}

.features li {
    margin-bottom: 0.5rem;
    text-align: left;
    color: black;
}

.btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    background-color: #171E2E;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.btn:hover {
    background-color: #242f49;
}
</style>
