<nav id="main-nav" class="fixed top-0 inset-x-0 z-[100] transition-all duration-500 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="glass rounded-[2rem] px-8 py-3 flex justify-between items-center border border-white/20 shadow-xl shadow-black/5">
            <div class="flex items-center">
                <a href="/" class="hover:no-underline flex items-center">
                    <img src="{{ asset('images/logo.png') }}" alt="Mr Bakers Logo" class="h-16 w-auto object-contain">
                </a>
            </div>
            <div class="hidden md:flex gap-8 items-center">
                <a href="/"
                    class="text-sm font-semibold tracking-wide uppercase {{ $current === 'landing' ? 'text-bakery-orange font-bold' : 'text-gray-500 hover:text-bakery-orange hover:scale-105' }} transition-all">Home</a>
                <a href="/privacy"
                    class="text-sm font-semibold tracking-wide uppercase {{ $current === 'privacy' ? 'text-bakery-orange font-bold' : 'text-gray-500 hover:text-bakery-orange hover:scale-105' }} transition-all">Privacy</a>
                <a href="/terms"
                    class="text-sm font-semibold tracking-wide uppercase {{ $current === 'terms' ? 'text-bakery-orange font-bold' : 'text-gray-500 hover:text-bakery-orange hover:scale-105' }} transition-all">Terms</a>
                <div class="w-px h-6 bg-gray-200 mx-2"></div>
                <a href="https://play.google.com/store/apps/details?id=com.mrbakers.bakery" target="_blank" class="bg-bakery-orange text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-bakery-orange/20 hover:-translate-y-0.5 hover:shadow-xl transition-all">
                    Download App
                </a>
            </div>
            <!-- Mobile menu button -->
            <div class="md:hidden">
                <button onclick="toggleMobileMenu()" class="text-gray-700 hover:text-bakery-orange focus:outline-none p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
        <!-- Mobile menu -->
        <div id="mobile-menu" class="md:hidden hidden mt-4 glass rounded-[2.5rem] p-8 border border-white/20 shadow-2xl space-y-6">
            <a href="/"
                class="block text-lg font-bold {{ $current === 'landing' ? 'text-bakery-orange' : 'text-gray-700' }}">Home</a>
            <a href="/privacy"
                class="block text-lg font-bold {{ $current === 'privacy' ? 'text-bakery-orange' : 'text-gray-700' }}">Privacy Policy</a>
            <a href="/terms"
                class="block text-lg font-bold {{ $current === 'terms' ? 'text-bakery-orange' : 'text-gray-700' }}">Terms</a>
            <a href="/mrbakers-admin" class="block text-lg font-bold text-gray-700 border-t pt-6">Admin Login</a>
        </div>
    </div>
</nav>

<script>
    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    }

    // Scroll effect for nav
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('bg-white/10', 'backdrop-blur-md', 'py-4');
            nav.classList.remove('py-6');
        } else {
            nav.classList.remove('bg-white/10', 'backdrop-blur-md', 'py-4');
            nav.classList.add('py-6');
        }
    });
</script>
