<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section brand-section">
        <div class="brand">
          <span class="name">Fitness24Hub</span>
        </div>
        <p class="tagline">Your daily dose of workouts and nutrition guidance</p>
      </div>

      <div class="footer-section">
        <h4>Explore</h4>
        <ul>
          <li>
            <RouterLink to="/workouts">Workouts</RouterLink>
          </li>
          <li>
            <RouterLink to="/nutrition">Nutrition</RouterLink>
          </li>
          <li>
            <RouterLink to="/fitness-plans">Fitness Plans</RouterLink>
          </li>
          <li>
            <RouterLink to="/articles">Articles</RouterLink>
          </li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Support</h4>
        <ul>
          <li><a href="#" @click="navigate('contacts')">Contact Us</a></li>
          <li><a href="#" @click="navigate('cancel-subscription')">Cancel Subscription</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Legal</h4>
        <ul>
          <li><a href="#" @click="navigate('terms-conditions')">Terms & Conditions</a></li>
          <li><a href="#" @click="navigate('privacy-policy')">Privacy Policy</a></li>
          <li><a href="#" @click="openDisclaimer">Medical Disclaimer</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Newsletter</h4>
        <p>Get weekly fitness tips, workouts, and nutrition advice</p>
        <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
          <input type="email" placeholder="Enter your email" v-model="email" required />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p>&copy; 2025 Fitness24Hub. All rights reserved.</p>
        <p class="disclaimer">
          This platform provides educational content only and is not a substitute for professional medical advice or
          treatment.
        </p>
      </div>
    </div>

    <!-- Terms Modal -->
    <div v-if="showTermsModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Terms & Conditions</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-content">
          <p>By using Fitness24Hub, you agree to our terms and conditions. This platform provides educational content
            only and is not a substitute for professional medical advice.</p>
          <p class="effective-date"><strong>Effective Date:</strong> September 16, 2025</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const showTermsModal = ref(false)

function subscribeNewsletter() {
  if (email.value) {
    alert(`Thanks for subscribing with ${email.value}! You'll receive weekly fitness tips and nutrition advice.`)
    email.value = ''
  }
}

function closeModal() {
  showTermsModal.value = false
}

function openDisclaimer() {
  alert('Medical Disclaimer: Content is educational only. Consult professionals for medical advice.')
}

const navigate = (name: string) => {
  router.push({ name })
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.brand-section .brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.brand-section .icon {
  font-size: 1.5rem;
}

.tagline {
  font-style: italic;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.social-link {
  display: inline-block;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.footer-section h4 {
  color: #a5b4fc;
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.footer-section a:hover {
  color: #a5b4fc;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
}

.newsletter-form button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.newsletter-form button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 2rem;
  text-align: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.close-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-content {
  padding: 1rem;
  color: #374151;
}

.effective-date {
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Responsive */
@media(max-width:768px) {
  .footer-content {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-content {
    padding: 1rem;
  }
}
</style>
