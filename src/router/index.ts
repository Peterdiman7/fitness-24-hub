import ArticleDetailsView from "@/views/ArticleDetailsView.vue"
import ArticlesView from "@/views/ArticlesView.vue"
import CancelSubscriptionView from "@/views/CancelSubscriptionView.vue"
import CategoryExercisesView from "@/views/CategoryExercisesView.vue"
import CheckoutView from "@/views/CheckoutView.vue"
import ContactsView from "@/views/ContactsView.vue"
import FitnessPlans from "@/views/FitnessPlans.vue"
import HomeView from "@/views/HomeView.vue"
import LoginView from "@/views/LoginView.vue"
import NutritionRecipes from "@/views/NutritionRecipes.vue"
import NutritionView from "@/views/NutritionView.vue"
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue"
import RecipeDetail from "@/views/RecipeDetail.vue"
import RegisterView from "@/views/RegisterView.vue"
import TermsConditionsView from "@/views/TermsConditionsView.vue"
import WorkoutDetailsView from "@/views/WorkoutDetailsView.vue"
import WorkoutsView from "@/views/WorkoutsView.vue"
import { createRouter as createVueRouter, createWebHistory } from "vue-router"

import type { RouteLocationNamedRaw } from "vue-router"

export const rootRoute: RouteLocationNamedRaw = { name: "home" }
const createRouter = () => {
	const router = createVueRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		routes: [
			{
				path: "/",
				name: "home",
				component: HomeView,
			},
			{
				path: "/articles",
				name: "articles",
				component: ArticlesView,
			},
			{
				path: "/articles/:id",
				name: "article-details",
				component: ArticleDetailsView,
                meta: { requiresAuth: true },
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
                meta: { requiresAuth: true },
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
				path: "/nutrition/:id/recipes",
				name: "nutrition-recipes",
				component: NutritionRecipes,
                meta: { requiresAuth: true },
			},
			{
				path: "/recipes/:id",
				name: "recipe-details",
				component: RecipeDetail,
			},
			{
				path: "/fitness-plans",
				name: "fitness-plans",
				component: FitnessPlans,
			},
			{
				path: "/checkout",
				name: "checkout",
				component: CheckoutView,
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
				path: "/help",
				name: "help",
				component: CancelSubscriptionView,
                meta: { requiresAuth: true },
			},
			{
				path: "/terms-conditions",
				name: "terms-conditions",
				component: TermsConditionsView,
			},
			{
				path: "/privacy-policy",
				name: "privacy-policy",
				component: PrivacyPolicyView,
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
