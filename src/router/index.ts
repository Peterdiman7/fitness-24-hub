import WorkoutDetailsView from "@/views/WorkoutDetailsView.vue"
import WorkoutsView from "@/views/WorkoutsView.vue"
import CategoryExercisesView from "@/views/CategoryExercisesView.vue"
import LandingPageView from "@/views/LandingPageView.vue"
import LoginView from "@/views/LoginView.vue"

import { createRouter as createVueRouter, createWebHistory } from "vue-router"

import type { RouteLocationNamedRaw } from "vue-router"
import FitnessPlans from "@/views/FitnessPlans.vue"
import ArticlesView from "@/views/ArticlesView.vue"
import ArticleDetailsView from "@/views/ArticleDetailsView.vue"
import NutritionView from "@/views/NutritionView.vue"
import NutritionDetailsView from "@/views/NutritionDetailsView.vue"
import RecipeDetail from "@/views/RecipeDetail.vue"
import ContactsView from "@/views/ContactsView.vue"
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue"
import TermsConditionsView from "@/views/TermsConditionsView.vue"
import RegisterView from "@/views/RegisterView.vue"
import CancelSubscriptionView from "@/views/CancelSubscriptionView.vue"
import CheckoutView from "@/views/CheckoutView.vue"
import NutritionRecipes from "@/views/NutritionRecipes.vue"

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
                path: "/workouts/category/:categoryId",
                name: "category-exercises",
                component: CategoryExercisesView,
            },
            {
                path: "/workouts/:workoutId",
                name: "workout-details",
                component: WorkoutDetailsView,
            },
            {
                path: "/nutrition",
                name: "nutrition",
                component: NutritionView,
            },
            {
                path: "/nutrition/:id/recipes",
                name: "nutrition-recipes",
                component: NutritionRecipes,
            },
            {
                path: "/recipes/:id",
                name: "recipe-details",
                component: RecipeDetail,
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
                path: "/checkout",
                name: "checkout",
                component: CheckoutView,
                // meta: { requiresAuth: true },
            },
            {
                path: "/cancel-subscription",
                name: "cancel-subscription",
                component: CancelSubscriptionView,
                meta: { requiresAuth: true },
            },
            {
                path: "/terms-conditions",
                name: "terms-conditions",
                component: TermsConditionsView,
            },
        ],
    })

    router.beforeEach(async (to, _from, next) => {
        const requiresAuth = to.matched.some(r => (r.meta as any)?.requiresAuth)
        const requiresGuest = to.matched.some(r => (r.meta as any)?.requiresGuest)

        let loggedIn = false
        try {
            const res = await fetch("https://back.fitness24hub.com/auth/me", {
                credentials: "include"
            })
            loggedIn = res.ok
        } catch (_) { }

        if (requiresAuth && !loggedIn) next({ name: "login" })
        else if (requiresGuest && loggedIn) next({ name: "home" })
        else next()
    })

    return router
}

export default createRouter
