<template>
  <div
    class="min-h-screen bg-[#070b12] font-sans relative overflow-hidden flex items-center justify-center px-4"
  >
    <!-- Ambient blobs -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <div
        class="absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full bg-indigo-700/20 blur-[120px] animate-pulse"
      ></div>
      <div
        class="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[100px] animate-pulse [animation-delay:2s]"
      ></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <div
        class="h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent mb-px"
      ></div>

      <div
        class="bg-white/[0.04] border border-white/[0.09] rounded-3xl p-10 backdrop-blur-sm shadow-2xl text-center"
      >
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div
            class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-2xl"
          >
            <i class="pi pi-envelope"></i>
          </div>
        </div>

        <h2
          class="text-2xl font-extrabold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent mb-4"
        >
          Check Your Email
        </h2>

        <p class="text-gray-400 text-sm leading-relaxed mb-8">
          We have sent a verification link to your email. Please check your
          inbox and click the link to verify your account.
        </p>

        <div
          class="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
          ></span>
          Verification email sent
        </div>
      </div>
    </div>
  </div>
</template>
