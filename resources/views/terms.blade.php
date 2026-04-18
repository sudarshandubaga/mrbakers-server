<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms & Conditions - Mr Bakers</title>
    <meta name="description" content="Terms and Conditions for Mr Bakers app and website">
    @vite(['resources/css/app.css', 'resources/js/index.tsx'])
</head>

<body class="bg-cream-50">
    <x-nav current="terms" />

    <div class="min-h-screen pt-40 pb-12 px-4">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-bold text-bakery-brown mb-6">📋 Terms & Conditions</h1>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">Last updated: March 27, 2025</p>
                <nav class="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                    <a href="/" class="hover:text-bakery-brown transition-colors">← Back to Home</a>
                </nav>
            </div>

            <!-- Main Content -->
            <div class="space-y-8 bg-white rounded-3xl shadow-xl p-12 border">
                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
                    <p class="text-lg leading-relaxed">By accessing or using Mr Bakers app/website ("Platform"), you
                        agree
                        to these Terms & Conditions ("Terms"). If you do not agree, do not use our services.</p>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">2. User Eligibility</h2>
                    <p class="text-lg leading-relaxed mb-4">You must be 18+ years old or have parental consent.
                        Businesses
                        must comply with applicable laws.</p>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">3. Account Responsibilities</h2>
                    <div class="space-y-4">
                        <p>You are responsible for:</p>
                        <ul class="list-disc list-inside space-y-2 ml-4">
                            <li>Maintaining account confidentiality</li>
                            <li>All activity under your account</li>
                            <li>Accurate information</li>
                        </ul>
                        <p>We reserve right to suspend/terminate accounts for violations.</p>
                    </div>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">4. Orders & Payments</h2>
                    <div class="space-y-4">
                        <p><strong>Orders:</strong> All orders are binding. No cancellations after preparation begins.
                        </p>
                        <p><strong>Prices:</strong> Include taxes unless stated. Subject to change.</p>
                        <p><strong>Payments:</strong> Processed via secure gateways. No refunds except per policy.</p>
                        <p><strong>Delivery:</strong> Estimated times. Delays not liability. Check app for status.</p>
                    </div>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">5. Product Quality</h2>
                    <p class="text-lg leading-relaxed mb-4">Products per description. Minor variations possible. Report
                        issues within 2 hours of delivery.</p>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">6. User Conduct</h2>
                    <p class="text-lg leading-relaxed mb-4">Prohibited:</p>
                    <ul class="list-disc list-inside space-y-2 ml-4">
                        <li>Illegal activities</li>
                        <li>Abusive behavior</li>
                        <li>Fraud/spam</li>
                        <li>Reverse engineering</li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">7. Intellectual Property</h2>
                    <p class="text-lg">All content (logos, images, app) property of Mr Bakers. Personal use only. No
                        commercial use.</p>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">8. Limitation of Liability</h2>
                    <p class="text-lg leading-relaxed mb-4">Services "as is". Not liable for indirect damages. Maximum
                        liability = order value.</p>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">9. Termination</h2>
                    <p class="text-lg">We can terminate access anytime for violations. You can delete account anytime.
                    </p>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">10. Governing Law</h2>
                    <p class="text-lg">Governed by Indian law. Disputes in [City] courts.</p>
                </section>

                <section class="text-center pt-12 border-t">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact</h2>
                    <div class="flex flex-col md:flex-row gap-8 justify-center items-center mb-8">
                        <div class="text-center">
                            <p class="text-xl font-semibold text-bakery-brown">support@mrbakersjodhpur.in</p>
                        </div>
                        <div class="text-center">
                            <p class="text-xl font-semibold text-bakery-brown">+91 98765 43210</p>
                        </div>
                    </div>
                    <a href="/"
                        class="inline-block bg-bakery-gold hover:bg-bakery-gold/90 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-colors">←
                        Back to Home</a>
                </section>
            </div>
        </div>
    </div>

    <!-- Footer from Landing -->
    <footer class="bg-gray-900 py-12 mt-24">
        <div class="max-w-7xl mx-auto px-4 text-center text-white">
            <p>&copy; 2024 Mr Bakers. All rights reserved. Freshly baked with ❤️</p>
        </div>
    </footer>
</body>

</html>