<template>
  <footer
    class="relative border-t border-white/[0.06] bg-[#070b12]/95 backdrop-blur-xl"
  >
    <!-- Top accent line -->
    <div
      class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
    ></div>

    <div
      class="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3"
    >
      <!-- Left: logo + copyright -->
      <div class="flex items-center gap-2.5">
        <div
          class="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0"
        >
          <i class="pi pi-bolt text-white text-[10px]"></i>
        </div>
        <p class="text-xs text-gray-600">
          &copy; 2026 MyApp. All rights reserved.
        </p>
      </div>

      <!-- Right: nav links -->
      <nav class="flex items-center gap-1">
        <NuxtLink
          to="/footer/about"
          class="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-200 hover:bg-white/[0.06] rounded-lg transition-all"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/footer/privacy"
          class="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-200 hover:bg-white/[0.06] rounded-lg transition-all"
        >
          Privacy
        </NuxtLink>
        <NuxtLink
          to="/footer/contact"
          class="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-200 hover:bg-white/[0.06] rounded-lg transition-all"
        >
          Contact
        </NuxtLink>
      </nav>
    </div>
  </footer>
</template>
