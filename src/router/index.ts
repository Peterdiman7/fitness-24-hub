import WorkoutDetailsView from "@/views/WorkoutDetailsView.vue"
import WorkoutsView from "@/views/WorkoutsView.vue"
import LandingPageView from "@/views/LandingPageView.vue"
import LoginView from "@/views/LoginView.vue"

import { createRouter as createVueRouter, createWebHistory } from "vue-router"

import type { RouteLocationNamedRaw } from "vue-router"
import FitnessPlans from "@/views/FitnessPlans.vue"
import ArticlesView from "@/views/ArticlesView.vue"
import ArticleDetailsView from "@/views/ArticleDetailsView.vue"
import NutritionView from "@/views/NutritionView.vue"
import NutritionDetailsView from "@/views/NutritionDetailsView.vue"
import ContactsView from "@/views/ContactsView.vue"
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue"
import TermsConditionsView from "@/views/TermsConditionsView.vue"
import RegisterView from "@/views/RegisterView.vue"

export const rootRoute: RouteLocationNamedRaw = { name: "home" }

const createRouter = () => {
    const router = createVueRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: "/",
                name: "home",
                component: LandingPageView,
            },
            {
                path: "/fitness-plans",
                name: "fitness-plans",
                component: FitnessPlans,
            },
            {
                path: "/workouts",
                name: "workouts",
                component: WorkoutsView,
            },
            {
                path: "/workouts/:workoutId",
                name: "workout-details",
                component: WorkoutDetailsView,
                meta: { requiresAuth: true },
            },
            {
                path: "/nutrition",
                name: "nutrition",
                component: NutritionView,
            },
            {
                path: "/nutrition/:id",
                name: "nutrition-details",
                component: NutritionDetailsView,
                meta: { requiresAuth: true },
            },
            {
                path: "/articles",
                name: "articles",
                component: ArticlesView,
            },
            {
                path: "/articles/:articleId",
                name: "article-details",
                component: ArticleDetailsView,
                meta: { requiresAuth: true },
            },
            {
                path: "/login",
                name: "login",
                component: LoginView,
                meta: { requiresGuest: true },
            },
            {
                path: "/register",
                name: "register",
                component: RegisterView,
                meta: { requiresGuest: true },
            },
            {
                path: "/contacts",
                name: "contacts",
                component: ContactsView,
            },
            {
                path: "/privacy-policy",
                name: "privacy-policy",
                component: PrivacyPolicyView,
            },
            {
                path: "/terms-conditions",
                name: "terms-conditions",
                component: TermsConditionsView,
            },
        ],
    })

    // Global route guard
    router.beforeEach(async (to, _from, next) => {
        const requiresAuth = to.matched.some(record => (record.meta as any)?.requiresAuth === true)
        const requiresGuest = to.matched.some(record => (record.meta as any)?.requiresGuest === true)

        let loggedIn = false

        try {
            const res = await fetch("http://localhost:3000/auth/me", {
                credentials: "include"
            })
            loggedIn = res.ok
        } catch (err) {
            loggedIn = false
        }

        if (requiresAuth && !loggedIn) {
            // Not logged in → redirect to login
            next({ name: "login" })
        } else if (requiresGuest && loggedIn) {
            // Logged in → redirect to home
            next({ name: "home" })
        } else {
            next()
        }
    })

    return router
}

export default createRouter
