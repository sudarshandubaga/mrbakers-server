<nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-2">
            <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-bakery-brown hover:no-underline md:text-3xl">
                    <img src="images/logo.png" alt="" class="h-16">
                </a>
            </div>
            <div class="md:flex gap-3 items-center space-x-6">
                <a href="/"
                    class="text-sm font-medium {{ $current === 'landing' ? 'text-bakery-brown font-semibold' : 'text-gray-700 hover:text-bakery-brown' }}">Home</a>
                <a href="/privacy"
                    class="text-sm font-medium {{ $current === 'privacy' ? 'text-bakery-brown font-semibold' : 'text-gray-700 hover:text-bakery-brown' }}">Privacy
                    Policy</a>
                <a href="/terms"
                    class="text-sm font-medium {{ $current === 'terms' ? 'text-bakery-brown font-semibold' : 'text-gray-700 hover:text-bakery-brown' }}">Terms</a>
            </div>
            <!-- Mobile menu button -->
            <div class="md:hidden">
                <button onclick="toggleMobileMenu()" class="text-gray-700 hover:text-bakery-brown focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        <!-- Mobile menu -->
        <div id="mobile-menu" class="md:hidden hidden pb-4 bg-white border-t">
            <a href="/"
                class="block px-4 py-2 text-sm {{ $current === 'landing' ? 'text-bakery-brown font-semibold' : 'text-gray-700 hover:text-bakery-brown' }}">Home</a>
            <a href="/privacy"
                class="block px-4 py-2 text-sm {{ $current === 'privacy' ? 'text-bakery-brown font-semibold' : 'text-gray-700 hover:text-bakery-brown' }}">Privacy
                Policy</a>
            <a href="/terms"
                class="block px-4 py-2 text-sm {{ $current === 'terms' ? 'text-bakery-brown font-semibold' : 'text-gray-700 hover:text-bakery-brown' }}">Terms</a>
            <a href="/mrbakers-admin" class="block px-4 py-2 text-sm text-gray-700 hover:text-bakery-brown">Admin
                Login</a>
        </div>
    </div>
</nav>

<script>
    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    }
</script>
