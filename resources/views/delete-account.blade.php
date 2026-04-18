<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Account - Mr Bakers</title>
    <meta name="description" content="Request account deletion for Mr Bakers app and website">
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
    </style>
</head>

<body class="bg-cream-50 text-gray-900 border-t-8 border-bakery-orange">
    <x-nav current="delete-account" />

    <div class="min-h-screen pt-32 pb-20 px-4">
        <div class="max-w-2xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-12">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-bakery-orange/10 rounded-3xl mb-6">
                    <span class="text-4xl">🗑️</span>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Request Account Deletion</h1>
                <p class="text-lg text-gray-600">We're sorry to see you go. Please confirm below.</p>
            </div>

            <!-- Warning Card -->
            <div class="bg-white rounded-[2.5rem] shadow-xl overflow-hidden mb-12 border border-gray-100">
                <div class="p-8 md:p-12">
                    @if (session('success'))
                        <div class="bg-green-50 border border-green-200 text-green-700 p-8 rounded-3xl text-center">
                            <div class="text-5xl mb-4">✅</div>
                            <h2 class="text-2xl font-bold mb-2">Request Submitted</h2>
                            <p class="text-lg opacity-80">{{ session('success') }}</p>
                            <a href="/"
                                class="mt-8 inline-block bg-green-600 text-white px-8 py-3 rounded-2xl font-bold">Back to
                                Home</a>
                        </div>
                    @else
                        <div
                            class="bg-bakery-orange/5 border border-bakery-orange/20 rounded-3xl p-6 mb-8 flex gap-4 items-start">
                            <span class="text-2xl mt-1">⚠️</span>
                            <div>
                                <h3 class="font-bold text-bakery-orange text-lg">Permanent Action</h3>
                                <p class="text-gray-600">Deleting your account will permanently remove your profile, order
                                    history, and saved addresses. This action cannot be undone.</p>
                            </div>
                        </div>

                        <form action="{{ route('account.delete.request') }}" method="POST" class="space-y-6">
                            @csrf
                            <div>
                                <label for="phone"
                                    class="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Phone
                                    Number</label>
                                <input type="text" id="phone" name="phone" value="{{ old('phone') }}" required
                                    placeholder="Enter your registered phone number"
                                    class="w-full bg-cream-50 border-2 border-transparent focus:border-bakery-orange focus:ring-0 rounded-2xl p-4 text-lg transition-all @error('phone') border-red-500 @enderror">
                                @error('phone')
                                    <p class="mt-2 text-sm text-red-500">{{ $message }}</p>
                                @enderror
                            </div>

                            <div>
                                <label for="reason"
                                    class="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Reason
                                    (Optional)</label>
                                <select id="reason" name="reason"
                                    class="w-full bg-cream-50 border-2 border-transparent focus:border-bakery-orange focus:ring-0 rounded-2xl p-4 text-lg transition-all">
                                    <option value="" disabled selected>Select a reason</option>
                                    <option value="privacy">Privacy concerns</option>
                                    <option value="no_longer_use">I no longer use the app</option>
                                    <option value="too_many_notifications">Too many notifications</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div class="flex items-start gap-3 py-4">
                                <input type="checkbox" id="confirm" name="confirm" required
                                    class="mt-1 w-6 h-6 text-bakery-orange border-gray-300 rounded focus:ring-bakery-orange">
                                <label for="confirm" class="text-gray-600 leading-tight">
                                    I understand that all my data will be permanently deleted and I will no longer have
                                    access to my order history.
                                </label>
                            </div>
                            @error('confirm')
                                <p class="text-sm text-red-500">{{ $message }}</p>
                            @enderror

                            <button type="submit"
                                class="w-full bg-bakery-orange hover:bg-bakery-orange/90 text-white font-bold py-5 rounded-2xl shadow-xl shadow-bakery-orange/20 transition-all hover:-translate-y-1 active:scale-[0.98]">
                                Request Account Deletion
                            </button>
                        </form>
                    @endif
                </div>
            </div>

            <!-- Footer links -->
            <div class="text-center space-y-4">
                <p class="text-gray-500">Need help? Contact us at <a href="mailto:support@mrbakersjodhpur.in"
                        class="text-bakery-orange font-bold underline">support@mrbakersjodhpur.in</a></p>
                <div class="flex justify-center gap-6 text-sm text-gray-400">
                    <a href="/privacy" class="hover:text-bakery-orange">Privacy Policy</a>
                    <a href="/terms" class="hover:text-bakery-orange">Terms & Conditions</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Minimal Footer -->
    <footer class="py-12 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>&copy; {{ date('Y') }} Mr Bakers Artisanal Bakery. All rights reserved.</p>
    </footer>
</body>

</html>