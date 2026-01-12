<template>
    <div class="preloader">
        <div class="loading-container">
            <div class="loading"></div>
            <div id="loading-icon"><img src="/images/loader.svg" alt=""></div>
        </div>
    </div>
</template>

<script setup lang="ts">
$(window).on('load', function () {
    setTimeout(() => {
        $(".preloader").fadeOut(100)
    }, 1000)
})
</script>