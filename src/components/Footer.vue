<template>
    <footer class="footer-main light-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="about-footer">
                        <div class="footer-logo">
                            <img src="/images/logo.png" alt="">
                        </div>
                        <div class="about-footer-content">
                            <p>Push harder, go further. Your fitness journey starts today!</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="footer-links">
                        <h3>contact us</h3>
                        <div class="footer-contact-item">
                            <div class="icon-box">
                                <img src="/images/icon-phone.svg" alt="">
                            </div>
                            <div class="footer-contact-content">
                                <p><a href="tel:+1-747-250-0014">+1-747-250-0014</a></p>
                            </div>
                        </div>
                        <div class="footer-contact-item">
                            <div class="icon-box">
                                <img src="/images/icon-mail.svg" alt="">
                            </div>
                            <div class="footer-contact-content">
                                <p><a href="mailto:info@fitness24hub.com">info@fitness24hub.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="footer-links">
                        <h3>Support</h3>
                        <ul>
                            <li @click="navigate('contacts')" class="footer-link">Contact Us</li>
                            <li @click="navigate('help')" class="footer-link">Help</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 col-md-12">
                    <div class="footer-links">
                        <h3>Legal</h3>
                        <ul>
                            <li @click="navigate('terms-conditions')" class="footer-link">Terms & Conditions</li>
                            <li @click="navigate('privacy-policy')" class="footer-link">Privacy Policy</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="footer-copyright">
                        <div class="footer-copyright-text">
                            <p>Fitness24Hub © 2025 All Rights Reserved.</p>
                        </div>
                        <div class="footer-payment">
                            <ul class="footer-card clearfix">
                                <li>
                                    <h4>We accept: </h4>
                                </li>
                                <li><a href="#"><img src="/public/images/card-2.png" alt=""></a></li>
                                <li><a href="#"><img src="/public/images/card-4.png" alt=""></a></li>
                            </ul>
                        </div>
                        <div class="footer-social-links">
                            <ul>
                                <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-dribbble"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigate = (name: string) => {
    router.push({ name })
}
</script>

<style scoped>
.footer-link {
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: gray;
    }
}
.footer-payment {
    text-align: center;
}

.footer-card {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 0;
}

.footer-card li {
    margin: 0 10px;
}

.footer-card h4 {
    font-weight: normal;
}
</style>
