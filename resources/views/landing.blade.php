<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mr Bakers - Fresh Bakery Delivered | Download Our App</title>
    <meta name="description"
        content="Discover fresh cakes, breads and pastries from Mr Bakers. Order now via our mobile app on Google Play Store. Fast delivery!">
    @vite(['resources/css/app.css', 'resources/js/index.tsx'])
</head>

<body class="bg-cream-50">
    <x-nav current="landing" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-bakery-orange to-bakery-gold py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Fresh Bakes<br>Delivered to<br><span class="text-cream-50">Your Door</span>
            </h2>
            <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto opacity-90">
                Experience the best cakes, pastries & breads from Mr Bakers. Order easily through our app!
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-md mx-auto">
                <a href="https://play.google.com/store/apps/details?id=com.mrbakers.bakery" target="_blank"
                    class="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-white/30">
                    <div class="flex items-center gap-3">
                        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6.455 19L2 22.5V4l20 12-5.545 3.5L12 17l-5.545 2z" />
                        </svg>
                        <span>Download on Google Play</span>
                        <svg class="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </a>
            </div>
            <div class="mt-16 flex justify-center">
                <img src="/storage/app/public/products/6936a0e72f01c.png" alt="Fresh Bakery Cake"
                    class="w-96 h-96 object-cover rounded-3xl shadow-2xl animate-float hover:rotate-3 hover:scale-105 transition-all duration-500">
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20">
                <h3 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Mr Bakers App?</h3>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">Everything you love about bakery, now in your pocket.
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div
                    class="text-center p-8 rounded-3xl bg-cream-50 hover:bg-cream-100 transition-all duration-300 group">
                    <div
                        class="w-20 h-20 bg-bakery-gold rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0h-3.5M4 7h3.5m0 0l3 3 3-3m-9 0V3a2 2 0 012-2h2a2 2 0 012 2v4" />
                        </svg>
                    </div>
                    <h4 class="text-2xl font-bold text-gray-900 mb-4">Fresh Daily</h4>
                    <p class="text-lg text-gray-600">Baked fresh every morning with premium ingredients.</p>
                </div>
                <div
                    class="text-center p-8 rounded-3xl bg-cream-50 hover:bg-cream-100 transition-all duration-300 group">
                    <div
                        class="w-20 h-20 bg-bakery-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12" />
                        </svg>
                    </div>
                    <h4 class="text-2xl font-bold text-gray-900 mb-4">Fast Delivery</h4>
                    <p class="text-lg text-gray-600">Get your order delivered in under 60 minutes.</p>
                </div>
                <div
                    class="text-center p-8 rounded-3xl bg-cream-50 hover:bg-cream-100 transition-all duration-300 group">
                    <div
                        class="w-20 h-20 bg-bakery-brown rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h4 class="text-2xl font-bold text-gray-900 mb-4">Quality Guaranteed</h4>
                    <p class="text-lg text-gray-600">100% satisfaction or your money back.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- App Preview Section -->
    <section class="py-24 bg-gradient-to-b from-cream-50 to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20">
                <h3 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Download the App Now</h3>
            </div>
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <figure class="w-full max-w-md mx-auto shadow-2xl rounded-3xl animate-bounce-slow relative group">
                        <!-- Enhanced phone mockup with bakery theme -->
                        <div
                            class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-[3rem] p-6 pt-12 pb-8 shadow-2xl relative overflow-hidden">
                            <!-- Screen gradient bg -->
                            <div
                                class="absolute inset-0 bg-gradient-to-b from-cream-50/20 to-transparent rounded-[2.25rem] backdrop-blur-sm">
                            </div>
                            <!-- App icon shelf -->
                            <div
                                class="absolute top-4 left-4 w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center">
                                <span class="text-2xl">🍰</span>
                            </div>
                            <!-- Cake preview inside app -->
                            <div
                                class="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-bakery-gold to-bakery-orange rounded-2xl shadow-xl flex items-center justify-center animate-pulse">
                                <img src="/storage/app/public/products/6936a142c5803.png" alt="Cake in app"
                                    class="w-20 h-20 object-cover rounded-xl shadow-lg">
                            </div>
                            <!-- Status bar mock -->
                            <div
                                class="flex items-center justify-between absolute top-3 left-6 right-6 text-xs text-white/80">
                                <span>9:41</span>
                                <div class="w-12 h-6 bg-black/30 rounded-full"></div>
                                <span>100%</span>
                            </div>
                            <!-- Nav bar mock -->
                            <div
                                class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-8 text-white/80 text-sm">
                                <span>🏠</span><span>🔍</span><span>🛒</span><span>👤</span>
                            </div>
                        </div>
                        <!-- Phone frame overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_35px_60px_-15px_rgba(218,165,32,0.3)] transition-all duration-500">
                        </div>
                        <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-8 bg-slate-300 rounded-b-3xl">
                        </div>
                        <div class="absolute top-1/2 left-0 w-2 h-24 bg-slate-300 rounded-r-3xl -translate-y-1/2">
                        </div>
                        <div class="absolute bottom-1/2 right-0 w-2 h-24 bg-slate-300 rounded-l-3xl translate-y-1/2">
                        </div>
                    </figure>
                </div>
                <div class="text-center lg:text-left">
                    <h4 class="text-3xl font-bold text-gray-900 mb-8">Available on Android</h4>
                    <p class="text-xl text-gray-600 mb-12">Join thousands of happy customers ordering fresh bakes
                        daily.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                        <a href="https://play.google.com/store/apps/details?id=com.mrbakers.bakery" target="_blank"
                            class="bg-bakery-brown hover:bg-bakery-brown/90 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex items-center justify-center max-w-sm">
                            <svg class="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.455 19L2 22.5V4l20 12-5.545 3.5L12 17l-5.545 2z" />
                            </svg>
                            Get it on<br class="sm:hidden"><span class="sm:inline">Google Play</span>
                        </a>
                    </div>
                    <p class="mt-8 text-sm text-gray-500">Coming soon to iOS App Store</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Products -->
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20">
                <h3 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Bakes</h3>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-16">Our most popular cakes and pastries</p>
            </div>
            <div id="featured-products" class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <!-- Dynamic products will be inserted here -->
            </div>
        </div>
    </section>

    <!-- CTA Footer -->
    <section class="bg-bakery-brown py-16">
        <div class="max-w-4xl mx-auto text-center px-4">
            <h3 class="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Order Fresh Bakes?</h3>
            <p class="text-xl text-cream-100 mb-12">Download Mr Bakers app and get 20% off your first order!</p>
            <a href="https://play.google.com/store/apps/details?id=com.mrbakers.bakery" target="_blank"
                class="inline-flex items-center gap-3 bg-white text-bakery-brown px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300">
                Download Now
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </a>
        </div>
    </section>

    <footer class="bg-gray-900 py-12">
        <div class="max-w-7xl mx-auto px-4 text-center text-white">
            <p>&copy; 2024 Mr Bakers. All rights reserved. Freshly baked with ❤️</p>
        </div>
    </footer>

    {{-- All animations now handled by Tailwind --}}

    <script>
        // Dynamic featured products from API
        fetch('/api/home')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('featured-products');
                container.innerHTML =
                    '<div class="col-span-full text-center text-gray-500 py-12 animate-spin">🍰 Loading fresh bakes...</div>';
                if (data.products_by_categories && data.products_by_categories.length > 0) {
                    data.products_by_categories.slice(0, 4).forEach(category => {
                        if (category.items && category.items.length > 0) {
                            category.items.slice(0, 2).forEach(product => {
                                const productDiv = document.createElement('div');
                                productDiv.className =
                                    'bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer overflow-hidden';
                                productDiv.innerHTML = `
                                    <div class="relative overflow-hidden rounded-2xl mb-4 h-48">
                                        <img src="/storage/app/public/${product.image || 'products/default.jpg'}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 group-hover:brightness-110">
                                        <div class="absolute top-3 right-3 bg-bakery-gold/90 text-white px-2 py-1 rounded-full text-xs font-bold">New</div>
                                    </div>
                                    <h4 class="font-bold text-xl mb-2 line-clamp-2 text-gray-900">${product.name}</h4>
                                    <p class="text-2xl font-bold text-bakery-brown mb-2">$${product.price.toFixed(2)}</p>
                                    <div class="flex items-center text-yellow-400">
                                        ${Array(5).fill('★').map((star, i) => `<span class="${i < 4 ? 'text-yellow-400' : 'text-gray-300'} text-sm">★</span>`).join('')}
                                        <span class="ml-2 text-sm text-gray-500 font-medium">(12)</span>
                                    </div>
                                `;
                                container.appendChild(productDiv);
                            });
                        }
                    });
                } else {
                    container.innerHTML =
                        '<div class="col-span-full text-center py-12"><p class="text-2xl animate-bounce">🍰 More delicious treats coming soon!</p></div>';
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                document.getElementById('featured-products').innerHTML =
                    '<div class="col-span-full text-center py-12 text-gray-500">🌐 Check your connection and refresh!</div>';
            });
    </script>
    </xai:function_call name="execute_command">
    <parameter name="command">npm run build
