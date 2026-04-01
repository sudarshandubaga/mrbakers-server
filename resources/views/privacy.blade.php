<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - Mr Bakers</title>
    <meta name="description" content="Privacy Policy for Mr Bakers app and website">
    @vite(['resources/css/app.css', 'resources/js/index.tsx'])
</head>

<body class="bg-cream-50">
    <x-nav current="privacy" />

    <div class="min-h-screen pt-40 pb-12 px-4">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-5xl font-bold text-bakery-brown mb-6">🍰 Privacy Policy</h1>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">Last updated: March 27, 2025</p>
                <nav class="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                    <a href="/" class="hover:text-bakery-brown transition-colors">← Back to Home</a>
                </nav>
            </div>

            <!-- Main Content -->
            <div class="space-y-8 bg-white rounded-3xl shadow-xl p-12 border">
                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>
                    <div class="space-y-4 text-lg leading-relaxed">
                        <p>We collect information you provide directly:</p>
                        <ul class="list-disc list-inside space-y-2 ml-4">
                            <li>Personal details (name, phone, email, address)</li>
                            <li>Payment information (processed by secure gateways)</li>
                            <li>Order history and preferences</li>
                            <li>Account information for registered users</li>
                        </ul>
                        <p><strong>Automatically collected:</strong></p>
                        <ul class="list-disc list-inside space-y-2 ml-4">
                            <li>Device information, IP address, browser type</li>
                            <li>Usage data, pages visited, time spent</li>
                            <li>Location data (for delivery optimization)</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">2. How We Use Your Information</h2>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-2xl font-semibold text-gray-900 mb-4">Order Fulfillment</h3>
                            <ul class="space-y-2">
                                <li>Process and deliver your orders</li>
                                <li>Handle payments securely</li>
                                <li>Manage customer support</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="text-2xl font-semibold text-gray-900 mb-4">Improvements</h3>
                            <ul class="space-y-2">
                                <li>Personalize recommendations</li>
                                <li>Improve app features</li>
                                <li>Send promotional offers (opt-out available)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">3. Information Sharing</h2>
                    <div class="space-y-4">
                        <p>We do <strong>not</strong> sell your personal data. We share with:</p>
                        <ul class="list-disc list-inside space-y-2 ml-4">
                            <li>Delivery partners (name, address, phone)</li>
                            <li>Payment processors (card details - encrypted)</li>
                            <li>Service providers (analytics, hosting)</li>
                        </ul>
                        <p class="font-semibold text-lg">Legal requirements: We comply with law enforcement requests.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">4. Your Rights</h2>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-xl font-semibold mb-4">Access & Update</h3>
                            <p>View/edit your data in app settings anytime.</p>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold mb-4">Delete Account</h3>
                            <p>Contact support@mrbakers.com to delete account.</p>
                        </div>
                        <div class="md:col-span-2">
                            <h3 class="text-xl font-semibold mb-4">Do Not Track</h3>
                            <p>We honor browser DNT signals.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">5. Cookies & Tracking</h2>
                    <p class="text-lg leading-relaxed mb-4">We use essential cookies for functionality and analytics
                        cookies
                        for improvement. Manage preferences in app settings.</p>
                    <div class="bg-cream-50 p-6 rounded-2xl border-l-4 border-bakery-gold">
                        <h3 class="font-bold text-lg mb-2">Cookie Types:</h3>
                        <ul class="grid md:grid-cols-2 gap-4 text-sm">
                            <li><strong>Essential:</strong> Shopping cart, login</li>
                            <li><strong>Analytics:</strong> Usage patterns</li>
                            <li><strong>Marketing:</strong> Personalized ads (opt-out)</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">6. Children's Privacy</h2>
                    <p class="text-lg">Mr Bakers does not knowingly collect data from children under 13. Contact us if
                        you
                        believe we have.</p>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">7. Data Security</h2>
                    <p class="text-lg">We use industry-standard encryption (SSL/TLS), secure servers, and regular
                        security
                        audits to protect your data.</p>
                </section>

                <section>
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">8. Changes to Policy</h2>
                    <p class="text-lg">We may update this policy. Significant changes posted 30 days in advance with app
                        notifications.</p>
                </section>

                <section class="text-center pt-12 border-t">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
                    <div class="flex flex-col md:flex-row gap-8 justify-center items-center mb-8">
                        <div class="text-center">
                            <p class="text-xl font-semibold text-bakery-brown">support@mrbakers.com</p>
                            <p class="text-lg text-gray-600">Privacy inquiries</p>
                        </div>
                        <div class="text-center">
                            <p class="text-xl font-semibold text-bakery-brown">+91 98765 43210</p>
                            <p class="text-lg text-gray-600">Customer support</p>
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
