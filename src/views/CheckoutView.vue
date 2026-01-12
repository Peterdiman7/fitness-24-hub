<template>
	<div class="checkout-page">
		<div class="checkout-container">
			<div class="payment-section">
				<div class="logo-container">
					<RouterLink to="/">
					</RouterLink>
				</div>
				<h1 class="section-title">Payment Information</h1>
				<form @submit.prevent="handleSubmit" class="payment-form">
					<div class="form-group">
						<label for="cardNumber">Card Number</label>
						<input id="cardNumber" v-model="form.cardNumber" type="text" placeholder="1234 5678 9012 3456"
							maxlength="19" @input="formatCardNumber" required />
					</div>
					<div class="form-group">
						<label for="cardHolder">Cardholder Name</label>
						<input id="cardHolder" v-model="form.cardHolder" type="text" placeholder="John Doe" required />
					</div>
					<div class="form-row">
						<div class="form-group">
							<label for="expiry">Expiry Date</label>
							<input id="expiry" v-model="form.expiry" type="text" placeholder="MM/YY" maxlength="5"
								@input="formatExpiry" required />
						</div>
						<div class="form-group">
							<label for="cvv">CVV</label>
							<input id="cvv" v-model="form.cvv" type="text" placeholder="123" maxlength="4" required />
						</div>
					</div>
					<div class="form-group">
						<label for="address">Billing Address</label>
						<input id="address" v-model="form.address" type="text" placeholder="123 Main Street" required />
					</div>
					<div class="form-row">
						<div class="form-group">
							<label for="city">City</label>
							<input id="city" v-model="form.city" type="text" placeholder="New York" required />
						</div>
						<div class="form-group">
							<label for="zipCode">ZIP Code</label>
							<input id="zipCode" v-model="form.zipCode" type="text" placeholder="10001" required />
						</div>
					</div>
					<div class="form-group">
						<label for="country">Country</label>
						<select id="country" v-model="form.country" required>
							<option value="">Select Country</option>
							<option value="US">United States</option>
							<option value="CA">Canada</option>
							<option value="UK">United Kingdom</option>
							<option value="AU">Australia</option>
							<option value="DE">Germany</option>
							<option value="FR">France</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div class="checkbox-group">
						<input id="terms" v-model="form.acceptTerms" type="checkbox" required />
						<label for="terms">
							I agree to the
							<RouterLink to="/terms-conditions">Terms & Conditions</RouterLink>
							and
							<RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
						</label>
					</div>
					<button type="submit" class="btn-submit" :disabled="processing">
						{{ processing ? 'Processing...' : 'Complete Purchase' }}
					</button>
					<div class="security-notice">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2">
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
							<path d="M7 11V7a5 5 0 0110 0v4" />
						</svg>
						<span>Your payment information is encrypted and secure</span>
					</div>
				</form>
			</div>
			<div class="summary-section">
				<h2 class="section-title">Order Summary</h2>
				<div class="plan-details">
					<div class="plan-header">
						<h3>{{ selectedPlan.name }}</h3>
						<span v-if="selectedPlan.bestValue" class="best-value-badge">Best Value</span>
					</div>
					<div class="plan-price">
						<span class="price-amount">{{ selectedPlan.price }}</span>
					</div>
					<ul class="plan-features">
						<li v-for="(feature, index) in selectedPlan.features" :key="index">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
								stroke-width="2">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							{{ feature }}
						</li>
					</ul>
				</div>
				<div class="price-breakdown">
					<div class="breakdown-row">
						<span>Subtotal</span>
						<span>{{ selectedPlan.price }}</span>
					</div>
					<div class="breakdown-row">
						<span>Tax</span>
						<span>$0.00</span>
					</div>
					<div class="breakdown-row total">
						<span>Total</span>
						<span>{{ selectedPlan.price }}</span>
					</div>
				</div>
				<div class="guarantee-badge">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
					</svg>
					<div>
						<strong>Money-Back Guarantee</strong>
						<p>Cancel anytime. No questions asked.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

interface Plan {
	id: number
	name: string
	price: string
	features: string[]
	bestValue?: boolean
}

const route = useRoute()
const router = useRouter()

const plans: Plan[] = [
	{
		id: 1,
		name: "1 Day Access",
		price: "$1.95",
		features: ["Full library access", "HD streaming", "One-time payment"],
	},
	{
		id: 2,
		name: "7 Days Access",
		price: "$9.95",
		features: ["Full library access", "HD streaming", "Cancel anytime"],
	},
	{
		id: 3,
		name: "Monthly",
		price: "$19.95",
		features: ["Full library access", "HD streaming", "Cancel anytime"],
	},
	{
		id: 4,
		name: "Monthly",
		price: "$29.95",
		features: ["Full library access", "HD streaming", "Cancel anytime"],
	},
	{
		id: 5,
		name: "Monthly",
		price: "$29.95",
		features: ["Full library access", "HD streaming", "Cancel anytime"],
		bestValue: true,
	},
	{
		id: 6,
		name: "Monthly",
		price: "$39.95",
		features: ["Full library access", "HD streaming", "Cancel anytime"],
	},
	{
		id: 7,
		name: "Monthly",
		price: "$49.95",
		features: ["Full library access", "HD streaming", "Cancel anytime"],
	},
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
	{
		id: 201,
		name: "Daily Access",
		price: "1.50 SAR / day",
		features: ["Full library access", "HD streaming", "Works on all devices"],
	},
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
]

const selectedPlan = ref<Plan>(plans[4]) // Default to best value
const processing = ref(false)

const form = ref({
	cardNumber: '',
	cardHolder: '',
	expiry: '',
	cvv: '',
	address: '',
	city: '',
	zipCode: '',
	country: '',
	acceptTerms: false
})

onMounted(() => {
	const planId = Number(route.query.plan)
	if (planId) {
		const plan = plans.find(p => p.id === planId)
		if (plan) {
			selectedPlan.value = plan
		}
	}
})

const formatCardNumber = (event: Event) => {
	const input = event.target as HTMLInputElement
	const value = input.value.replace(/\s/g, '')
	const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
	form.value.cardNumber = formattedValue
}

const formatExpiry = (event: Event) => {
	const input = event.target as HTMLInputElement
	let value = input.value.replace(/\D/g, '')

	if (value.length >= 2) {
		value = value.slice(0, 2) + '/' + value.slice(2, 4)
	}

	form.value.expiry = value
}

const handleSubmit = async () => {
	processing.value = true

	// Simulate payment processing
	setTimeout(() => {
		processing.value = false
		alert('Payment processed successfully! Welcome to Fitness24Hub.')
		router.push('/')
	}, 2000)
}
</script>

<style scoped>
.checkout-page {
	min-height: 100vh;
	background: var(--gray-50);
	padding: 3rem 2rem;
}

.checkout-container {
	max-width: 1200px;
	margin: 5rem auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 3rem;
	align-items: start;
}

.section-title {
	font-size: 1.75rem;
	font-weight: 700;
	color: gray;
	margin-bottom: 2rem;
}

.payment-section {
	background: #202737;
	padding: 2.5rem;
	border-radius: 9px;
	box-shadow: var(--shadow-lg);
}

.logo-container {
	text-align: center;
	margin-bottom: 1.5rem;
	background-color: #1e3a8a;
	border-radius: 19px;
}

.logo {
	height: 170px;
	width: auto;
	object-fit: contain;
	transition: transform 0.3s ease;
}

.logo:hover {
	transform: scale(1.05);
}


.payment-form {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.form-group {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.form-group label {
	font-weight: 600;
	color: gray;
	font-size: 0.875rem;
}

.form-group input,
.form-group select {
	padding: 0.875rem 1rem;
	border: 2px solid gray;
	border-radius: 9px;
	font-size: 1rem;
	transition: all var(--transition-base);
	font-family: inherit;
}

.form-group input:focus,
.form-group select:focus {
	outline: none;
	border-color: #202737;
	box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-row {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
}

.checkbox-group {
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
}

.checkbox-group input[type="checkbox"] {
	width: 18px;
	height: 18px;
	margin-top: 0.25rem;
	cursor: pointer;
}

.checkbox-group label {
	font-size: 0.875rem;
	color: var(--gray-600);
	line-height: 1.5;
}

.checkbox-group a {
	color: var(--primary);
	text-decoration: none;
	font-weight: 500;
}

.checkbox-group a:hover {
	text-decoration: underline;
}

.btn-submit {
	padding: 1rem 2rem;
	background: var(--primary);
	color: white;
	border: none;
	border-radius: 9px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all var(--transition-base);
	font-family: inherit;
}

.btn-submit:hover:not(:disabled) {
	background: var(--primary-dark);
	transform: translateY(-1px);
	box-shadow: var(--shadow-md);
}

.btn-submit:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.security-notice {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.75rem 1rem;
	background: var(--gray-100);
	border-radius: 9px;
	font-size: 0.875rem;
	color: var(--gray-600);
}

.security-notice svg {
	color: var(--secondary);
	flex-shrink: 0;
}

.summary-section {
	background: #202737;
	padding: 2.5rem;
	border-radius: 9px;
	box-shadow: var(--shadow-lg);
	position: sticky;
	top: 2rem;
}

.plan-details {
	padding-bottom: 1.5rem;
	border-bottom: 2px solid var(--gray-200);
	margin-bottom: 1.5rem;
}

.plan-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1rem;
}

.plan-header h3 {
	font-size: 1.5rem;
	font-weight: 700;
	color: var(--gray-900);
}

.best-value-badge {
	padding: 0.375rem 0.75rem;
	background: var(--secondary);
	color: white;
	border-radius: var(--radius-full);
	font-size: 0.75rem;
	font-weight: 600;
}

.plan-price {
	margin-bottom: 1.5rem;
}

.price-amount {
	font-size: 2.5rem;
	font-weight: 800;
	color: #D7FB00;
}

.plan-features {
	list-style: none;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.plan-features li {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	color: var(--gray-700);
	font-size: 0.9375rem;
}

.plan-features svg {
	color: var(--secondary);
	flex-shrink: 0;
}

.price-breakdown {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	padding-bottom: 1.5rem;
	border-bottom: 2px solid var(--gray-200);
	margin-bottom: 1.5rem;
}

.breakdown-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: var(--gray-700);
}

.breakdown-row.total {
	font-size: 1.25rem;
	font-weight: 700;
	color: var(--gray-900);
	padding-top: 0.75rem;
}

.guarantee-badge {
	display: flex;
	gap: 1rem;
	padding: 1.25rem;
	border-radius: 9px;
	border: 2px solid gray;
}

.guarantee-badge svg {
	color: green;
	flex-shrink: 0;
}

.guarantee-badge strong {
	display: block;
	color: var(--gray-900);
	margin-bottom: 0.25rem;
	font-size: 0.9375rem;
}

.guarantee-badge p {
	font-size: 0.875rem;
	color: var(--gray-600);
	margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
	.checkout-container {
		grid-template-columns: 1fr;
	}

	.summary-section {
		position: static;
	}
}

@media (max-width: 768px) {
	.checkout-page {
		padding: 2rem 1rem;
	}

	.payment-section,
	.summary-section {
		padding: 1.5rem;
	}

	.form-row {
		grid-template-columns: 1fr;
	}

	.section-title {
		font-size: 1.5rem;
	}
}
</style>
