<template>
  <header class="site-header">
    <nav class="nav">
      <!-- Logo -->
      <router-link to="/" class="logo" @click="closeMenu">
        <span class="logo-icon">💪</span>
        <span class="logo-text">Fitness24Hub</span>
      </router-link>

      <!-- Desktop / Mobile Nav -->
      <ul class="nav-links" :class="{ open: menuOpen }">
        <li>
          <router-link to="/" @click="closeMenu" class="nav-link">
            <span class="link-icon">🏠</span> Home
          </router-link>
        </li>
        <li>
          <router-link to="/workouts" @click="closeMenu" class="nav-link">
            <span class="link-icon">🏋️</span> Workouts
          </router-link>
        </li>
        <li>
          <router-link to="/nutrition" @click="closeMenu" class="nav-link">
            <span class="link-icon">🥗</span> Nutrition
          </router-link>
        </li>
        <li>
          <router-link to="/fitness-plans" @click="closeMenu" class="nav-link">
            <span class="link-icon">💪</span> Plans
          </router-link>
        </li>
        <li>
          <router-link to="/articles" @click="closeMenu" class="nav-link">
            <span class="link-icon">📰</span> Articles
          </router-link>
        </li>

        <!-- Login / Logout -->
        <li v-if="!loggedIn">
          <router-link to="/login" @click="closeMenu" class="nav-link login-btn">
            <span class="link-icon">🔑</span> Login
          </router-link>
        </li>
        <li v-else>
          <button class="nav-link logout-btn" @click="logout">
            <span class="link-icon">🚪</span> Logout
          </button>
        </li>
      </ul>

      <!-- Hamburger Button -->
      <button class="menu-toggle" @click="toggleMenu" :aria-expanded="menuOpen.toString()" aria-label="Toggle menu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const menuOpen = ref(false)
const loggedIn = ref(sessionStorage.getItem("loggedIn") === "true")

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? "hidden" : ""
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ""
}

const handleResize = () => {
  if (window.innerWidth > 768) closeMenu()
}

onMounted(() => {
  window.addEventListener("resize", handleResize)
  window.addEventListener("storage", syncLoginState)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
  window.removeEventListener("storage", syncLoginState)
})

const logout = () => {
  sessionStorage.removeItem("loggedIn")
  loggedIn.value = false
  router.push("/login")
}

const syncLoginState = () => {
  loggedIn.value = sessionStorage.getItem("loggedIn") === "true"
}
</script>

<style scoped>
.site-header {
  width: 100%;
  background: #1e3a8a; /* dark blue */
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 200;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
  color: white;
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  color: white;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgba(255,255,255,0.2);
  color: white;
}

.link-icon {
  font-size: 1.1rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 22px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 300;
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background: white; /* always visible */
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 6px);
}

.menu-toggle span.open:nth-child(2) {
  opacity: 0;
}

.menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile */
@media (max-width: 1078px) {
  .menu-toggle { display: flex; }
  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    background: #1e3a8a; /* dark blue */
    width: 80%;
    max-width: 320px;
    height: 100vh;
    padding: 5rem 1.5rem 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  .nav-links.open { transform: translateX(0); }
  .nav-links li { width: 100%; }
  .nav-link { width: 100%; justify-content: flex-start; padding: 1rem 1.2rem; border-radius: 6px; }
}

@media (max-width: 480px) {
  .logo-text { display: none; }
  .nav-links { width: 100%; max-width: none; }
}
</style>
