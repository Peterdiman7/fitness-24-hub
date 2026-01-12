<template>
    <header class="main-header">
        <div class="header-sticky">
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <img src="/images/logo.png" alt="Logo">
                    </a>
                    <div class="collapse navbar-collapse main-menu">
                        <div class="nav-menu-wrapper">
                            <ul class="navbar-nav mr-auto" id="menu">
                                <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                                <li class="nav-item"><a class="nav-link" href="/workouts">Workouts</a></li>
                                <li class="nav-item"><a class="nav-link" href="/nutrition">Nutrition</a></li>
                                <li class="nav-item"><a class="nav-link" href="/fitness-plans">Plans</a></li>
                                <li class="nav-item"><a class="nav-link" href="/articles">Blog</a></li>
                                <li class="nav-item" v-if="!loggedIn"><router-link to="/login" @click="closeMenu"
                                        class="nav-link login-btn">Login</router-link></li>
                                <li style="cursor: pointer;" class="nav-item" v-else><a class="nav-link logout" @click="logout">Logout</a></li>
                            </ul>
                        </div>
                        <div class="header-btn">
                            <a href="/workouts" class="btn-default">Get Started</a>
                        </div>
                    </div>
                    <div class="navbar-toggle"></div>
                </div>
            </nav>
            <div class="responsive-menu"></div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()
const { loggedIn } = storeToRefs(auth)

const logout = async () => {
    await auth.logout()
    router.push("/")
}

onMounted(() => {
    auth.checkLogin()

    nextTick(() => {
        const menu = $('#menu')
        if (menu.hasClass('slicknav')) menu.slicknav('destroy')

        menu.slicknav({
            prependTo: '.responsive-menu',
            label: '',
        })

        $(document).on('click', '.slicknav_nav .nav-link.logout', () => {
            logout()
        })
    })
})
</script>
