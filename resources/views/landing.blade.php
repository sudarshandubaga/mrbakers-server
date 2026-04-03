<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mr Bakers - Artisanal Bakery | Fresh Bakes Delivered</title>
    <meta name="description"
        content="Savor the finest artisanal breads, decadent cakes, and delicate pastries from Mr Bakers. Freshly baked daily and delivered straight to your door.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
        rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/index.tsx'])
    <style>
        body {
            font-family: 'Outfit', sans-serif;
        }

        h1,
        h2,
        h3 {
            font-family: 'Playfair Display', serif;
        }

        .hero-gradient {
            background: linear-gradient(135deg, rgba(255, 140, 66, 0.1) 0%, rgba(218, 165, 32, 0.1) 100%);
        }

        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }

        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>

<body class="bg-cream-50 text-gray-900 overflow-x-hidden">
    <x-nav current="landing" />

    <!-- Hero Section -->
    <header class="relative min-h-[90vh] flex items-center overflow-hidden pt-24">
        <div
            class="absolute inset-x-0 top-0 h-full w-full opacity-10 bg-[url('/images/landing/cake.png')] bg-cover bg-center">
        </div>
        <div
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-2 gap-12 items-center py-20 pb-16">
            <div class="space-y-8 animate-fade-in">
                <div
                    class="inline-flex items-center space-x-2 bg-bakery-orange/10 px-4 py-2 rounded-full border border-bakery-orange/20">
                    <span class="flex h-2 w-2 rounded-full bg-bakery-orange animate-pulse"></span>
                    <span class="text-sm font-semibold text-bakery-orange uppercase tracking-wider">Premium Cakes & Fast
                        Food</span>
                </div>
                <h1 class="text-6xl md:text-8xl font-bold leading-tight">
                    Sweet <span class="text-gradient">Moments</span> <br>
                    Savory Bites
                </h1>
                <p class="text-xl text-gray-600 max-w-xl leading-relaxed">
                    From artisanal cakes for your special celebrations to gourmet pizzas and sandwiches for your daily
                    cravings. Experience perfection delivered to your door.
                </p>
                <div class="flex flex-wrap gap-4 pt-4">
                    <a href="https://play.google.com/store/apps/details?id=com.mrbakers.bakery" target="_blank"
                        class="bg-bakery-orange hover:bg-bakery-orange/90 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-bakery-orange/20 transition-all hover:-translate-y-1">
                        Download Mr Bakers App
                    </a>
                </div>
                <div class="flex items-center space-x-6 pt-8">
                    <div class="flex -space-x-4">
                        <img class="w-12 h-12 rounded-full border-4 border-white" src="https://i.pravatar.cc/150?u=1"
                            alt="">
                        <img class="w-12 h-12 rounded-full border-4 border-white" src="https://i.pravatar.cc/150?u=2"
                            alt="">
                        <img class="w-12 h-12 rounded-full border-4 border-white" src="https://i.pravatar.cc/150?u=3"
                            alt="">
                    </div>
                    <div class="text-sm">
                        <p class="font-bold">2,500+ Happy Customers</p>
                        <p class="text-gray-500">★★★★★ 4.9/5 Average Rating</p>
                    </div>
                </div>
            </div>
            <div class="relative lg:block">
                <div
                    class="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] transform rotate-2 hover:rotate-0 transition-transform duration-700">
                    <img src="/images/landing/cake.png" alt="Premium Celebration Cake"
                        class="w-full object-cover aspect-[4/5]">
                </div>
                <!-- Decorative elements -->
                <div class="absolute -top-10 -right-10 w-40 h-40 bg-bakery-gold/20 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-10 -left-10 w-60 h-60 bg-bakery-orange/20 rounded-full blur-3xl"></div>
                <div class="absolute -right-6 top-1/2 -translate-y-1/2 glass p-6 rounded-3xl shadow-xl animate-float">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-12 h-12 bg-bakery-orange rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                            🥐
                        </div>
                        <div>
                            <p class="font-bold text-sm">Flash Sale</p>
                            <p class="text-xs text-gray-500">20% off Croissants</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Signature Categories -->
    <section class="py-32 bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-12">
                <!-- Cake Category -->
                <div class="group relative rounded-[3rem] overflow-hidden shadow-2xl h-[400px] reveal">
                    <img src="/images/landing/cake.png" alt="Celebration Cakes"
                        class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
                        <h3 class="text-white text-4xl font-bold mb-4">Celebration <span
                                class="text-bakery-orange">Cakes</span></h3>
                        <p class="text-white/80 text-lg max-w-sm mb-6">Exquisite, hand-crafted cakes for every occasion.
                            From berries to gold leaf, we make your moments sweet.</p>
                        <a href="https://play.google.com/store/apps/details?id=com.mrbakers.bakery" target="_blank"
                            class="text-bakery-orange font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                            Order on App <span>→</span>
                        </a>
                    </div>
                </div>
                <!-- Fast Food Category -->
                <div class="group relative rounded-[3rem] overflow-hidden shadow-2xl h-[400px] reveal"
                    style="transition-delay: 200ms;">
                    <img src="/images/landing/fastfood.png" alt="Fast Food"
                        class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
                        <h3 class="text-white text-4xl font-bold mb-4">Gourmet <span class="text-bakery-gold">Fast
                                Food</span></h3>
                        <p class="text-white/80 text-lg max-w-sm mb-6">Crispy pizzas and layered sandwiches. Fresh
                            ingredients, bold flavors, and served hot at your doorstep.</p>
                        <a href="https://play.google.com/store/apps/details?id=com.mrbakers.bakery" target="_blank"
                            class="text-bakery-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                            Order on App <span>→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Grid -->
    <section class="py-32 bg-white relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20 reveal">
                <h2 class="text-4xl md:text-6xl font-bold mb-6">Why Choose <span class="text-bakery-orange">Mr
                        Bakers</span>?</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">We combine traditional methods with modern
                    convenience to bring you the best bakery experience.</p>
            </div>
            <div class="grid md:grid-cols-3 gap-12">
                <div
                    class="group p-10 rounded-[3rem] bg-cream-50 hover:bg-white border-2 border-transparent hover:border-bakery-orange/20 transition-all duration-500 reveal">
                    <div
                        class="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        🌾</div>
                    <h3 class="text-2xl font-bold mb-4">Premium Grains</h3>
                    <p class="text-gray-600 leading-relaxed text-lg">We use only organic, stone-ground flour and the
                        finest ingredients sourced directly from small farmers.</p>
                </div>
                <div class="group p-10 rounded-[3rem] bg-cream-50 hover:bg-white border-2 border-transparent hover:border-bakery-gold/20 transition-all duration-500 reveal"
                    style="transition-delay: 100ms;">
                    <div
                        class="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        ⚡</div>
                    <h3 class="text-2xl font-bold mb-4">Swift Delivery</h3>
                    <p class="text-gray-600 leading-relaxed text-lg">Fresh from the oven to your doorstep in under 60
                        minutes. Guaranteed warmth and freshness in every bite.</p>
                </div>
                <div class="group p-10 rounded-[3rem] bg-cream-50 hover:bg-white border-2 border-transparent hover:border-bakery-brown/20 transition-all duration-500 reveal"
                    style="transition-delay: 200ms;">
                    <div
                        class="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        🎨</div>
                    <h3 class="text-2xl font-bold mb-4">Custom Creations</h3>
                    <p class="text-gray-600 leading-relaxed text-lg">Planning a celebration? Our master bakers create
                        bespoke cakes tailored to your unique taste and theme.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Our Process Section -->
    <section id="our-process" class="py-32 bg-cream-50 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-20 items-center">
                <div class="relative reveal">
                    <div class="rounded-[3rem] overflow-hidden shadow-2xl relative">
                        <img src="/images/landing/process.png" alt="Baker kneading dough"
                            class="w-full object-cover aspect-video">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
                            <p class="text-white text-2xl font-bold italic">"Patience is the secret ingredient in every
                                loaf we bake."</p>
                        </div>
                    </div>
                </div>
                <div class="space-y-8 reveal" style="transition-delay: 200ms;">
                    <h2 class="text-5xl font-bold leading-tight">The <span class="text-bakery-orange">Art</span> of Slow
                        Fermentation</h2>
                    <p class="text-xl text-gray-600 leading-relaxed">
                        At Mr Bakers, we don't rush perfection. Our sourdough undergoes a 48-hour slow fermentation
                        process, resulting in a deeper flavor profile and better digestibility.
                    </p>
                    <ul class="space-y-6">
                        <li class="flex items-start gap-4">
                            <span
                                class="w-8 h-8 bg-bakery-gold rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">1</span>
                            <div>
                                <p class="font-bold text-lg">Hand-Picked Ingredients</p>
                                <p class="text-gray-500">Every grain, nut, and fruit is inspected for premium quality.
                                </p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <span
                                class="w-8 h-8 bg-bakery-gold rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">2</span>
                            <div>
                                <p class="font-bold text-lg">Masterful Craftsmanship</p>
                                <p class="text-gray-500">Our bakers follow traditional techniques passed down through
                                    generations.</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4">
                            <span
                                class="w-8 h-8 bg-bakery-gold rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">3</span>
                            <div>
                                <p class="font-bold text-lg">Wood-Fired Perfection</p>
                                <p class="text-gray-500">Baked at high temperatures to achieve the perfect
                                    caramelization.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>



    <!-- App Showcase Section -->
    <section id="download" class="py-32 bg-[#1A1A1A] text-white overflow-hidden relative">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-bakery-orange/10 rounded-full blur-[120px]"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-20 items-center">
                <div class="space-y-10 reveal">
                    <h2 class="text-6xl font-bold leading-tight">Freshness is <br> Just a <span
                            class="text-bakery-orange">Tap</span> Away</h2>
                    <p class="text-2xl text-gray-400 leading-relaxed">
                        Download the Mr Bakers app today and enjoy exclusive access to new launches, customized
                        ordering, and real-time delivery tracking.
                    </p>
                    <div class="flex flex-wrap gap-6">
                        <a href="https://play.google.com/store/apps/details?id=com.mrbakers.bakery" target="_blank"
                            class="group bg-white text-black px-10 py-6 rounded-3xl flex items-center gap-6 transition-all hover:scale-105">
                            <div class="text-4xl text-black">🤖</div>
                            <div>
                                <p class="text-xs uppercase font-bold text-gray-400">Our App is Available on</p>
                                <p class="text-xl font-bold">Google Play Store</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="relative reveal" style="transition-delay: 200ms;">
                    <!-- Phone Mockup -->
                    <div
                        class="relative mx-auto w-[300px] h-[600px] bg-[#0F0F0F] rounded-[3.5rem] border-[12px] border-[#222222] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden">
                        <div
                            class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#222222] rounded-b-[1.5rem] z-20">
                        </div>
                        <!-- App Content Mock -->
                        <div class="p-6 pt-12 space-y-6 h-full overflow-hidden">
                            <div class="flex justify-between items-center text-xs opacity-60">
                                <span>9:41</span>
                                <div class="flex gap-1">📶 🔋</div>
                            </div>
                            <div class="space-y-1">
                                <p class="text-xs opacity-50">Good Morning,</p>
                                <p class="font-bold text-lg">Alex Smith 👋</p>
                            </div>
                            <div class="bg-bakery-orange/10 p-4 rounded-2xl border border-bakery-orange/20">
                                <p class="font-bold text-sm">Special Offer! 🔥</p>
                                <p class="text-[10px] opacity-70">Order now and get 30% discount on all Pastries.</p>
                            </div>
                            <div class="grid grid-cols-2 gap-3">
                                <div class="bg-gray-800 p-3 rounded-2xl aspect-square flex flex-col justify-between">
                                    <span class="text-2xl">🍰</span>
                                    <span class="text-[10px] font-bold">Cakes</span>
                                </div>
                                <div class="bg-gray-800 p-3 rounded-2xl aspect-square flex flex-col justify-between">
                                    <span class="text-2xl">🥖</span>
                                    <span class="text-[10px] font-bold">Breads</span>
                                </div>
                            </div>
                            <div
                                class="bg-gray-800/50 p-4 rounded-2xl h-32 flex flex-col justify-center items-center gap-2">
                                <div class="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <div class="w-2/3 h-full bg-bakery-gold"></div>
                                </div>
                                <p class="text-[10px] opacity-60">Order #882 is on its way...</p>
                            </div>
                        </div>
                    </div>
                    <!-- Decorative back elements -->
                    <div
                        class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-bakery-orange/20 rounded-full blur-[80px]">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-20 reveal">
                <h2 class="text-5xl font-bold mb-6 italic">What our patrons say</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-10 rounded-[3rem] bg-cream-50 space-y-6 reveal">
                    <div class="text-bakery-gold text-2xl">★★★★★</div>
                    <p class="text-xl leading-relaxed italic text-gray-700">"The best sourdough I've found in years.
                        Remarkable crust and depth of flavor."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-gray-300"></div>
                        <div>
                            <p class="font-bold">Eleanor Rigby</p>
                            <p class="text-sm text-gray-500">Food Journalist</p>
                        </div>
                    </div>
                </div>
                <div class="p-10 rounded-[3rem] bg-cream-50 space-y-6 reveal" style="transition-delay: 100ms;">
                    <div class="text-bakery-gold text-2xl">★★★★★</div>
                    <p class="text-xl leading-relaxed italic text-gray-700">"Ordered a birthday cake via the app.
                        Beautifully decorated and absolutely delicious!"</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-gray-300"></div>
                        <div>
                            <p class="font-bold">James Cooper</p>
                            <p class="text-sm text-gray-500">Local Resident</p>
                        </div>
                    </div>
                </div>
                <div class="p-10 rounded-[3rem] bg-cream-50 space-y-6 reveal" style="transition-delay: 200ms;">
                    <div class="text-bakery-gold text-2xl">★★★★★</div>
                    <p class="text-xl leading-relaxed italic text-gray-700">"Authentic taste and superb service. The
                        delivery is always on time."</p>
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-gray-300"></div>
                        <div>
                            <p class="font-bold">Maria Garcia</p>
                            <p class="text-sm text-gray-500">Home Cook</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-cream-50 py-20 border-t border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-12 mb-20">
                <div class="col-span-2 space-y-8">
                    <img src="{{ asset('images/logo.png') }}" alt="Mr Bakers Logo" class="h-20 w-auto opacity-90">
                    <p class="text-gray-500 max-w-sm text-lg">Bringing the timeless craft of artisanal baking to your
                        doorstep with modern speed and care.</p>
                    <div class="flex gap-4">
                        <a href="#"
                            class="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-lg text-gray-700 hover:bg-bakery-orange hover:text-white transition-all duration-300 group">
                            <svg class="w-6 h-6 group-hover:scale-110 transition-transform fill-current"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href="#"
                            class="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-lg text-gray-700 hover:bg-bakery-orange hover:text-white transition-all duration-300 group">
                            <svg class="w-5 h-5 group-hover:scale-110 transition-transform fill-current"
                                viewBox="0 0 24 24">
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#"
                            class="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-lg text-gray-700 hover:bg-bakery-orange hover:text-white transition-all duration-300 group">
                            <svg class="w-6 h-6 group-hover:scale-110 transition-transform fill-current"
                                viewBox="0 0 24 24">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="space-y-6">
                    <p class="font-bold text-lg uppercase tracking-widest text-[10px]">Links</p>
                    <ul class="space-y-4 text-gray-500">
                        <li><a href="#" class="hover:text-bakery-orange">About Us</a></li>
                        <li><a href="/privacy" class="hover:text-bakery-orange">Privacy Policy</a></li>
                        <li><a href="/terms" class="hover:text-bakery-orange">Terms & Conditions</a></li>
                        <li><a href="/delete-account" class="hover:text-bakery-orange">Delete Account</a></li>
                    </ul>
                </div>
                <div class="space-y-6">
                    <p class="font-bold text-lg uppercase tracking-widest text-[10px]">Contact</p>
                    <ul class="space-y-4 text-gray-500">
                        <li>contact@mrbakersjodhpur.in</li>
                        <li>+91 92146 88000</li>
                        <li>Pal Rd, Kheme ka Kuan,<br>Subhash Nagar, Jodhpur, Raj.</li>
                    </ul>
                </div>
            </div>
            <div class="pt-12 border-t border-gray-200 text-center text-gray-400 text-sm">
                <p>&copy; {{ date('Y') }} Mr Bakers Artisanal Bakery. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Reveal elements on scroll
        const revealElements = document.querySelectorAll('.reveal');
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        };
        const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));

    </script>
</body>

</html>