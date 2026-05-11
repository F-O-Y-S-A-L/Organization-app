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

    <!-- Notification Toast -->
    <transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="forgotPass.showNotifiForgetPass"
        class="fixed top-20 right-4 z-[9999] flex items-center gap-3 bg-gray-900/95 border border-indigo-500/40 backdrop-blur-xl text-indigo-100 px-5 py-4 rounded-2xl shadow-2xl max-w-sm"
      >
        <div
          class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0"
        >
          <i class="pi pi-bell text-sm"></i>
        </div>
        <span class="text-sm font-medium">{{
          forgotPass.NotifiMessageForgetPass
        }}</span>
      </div>
    </transition>

    <div class="relative z-10 w-full max-w-md">
      <div
        class="h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent mb-px"
      ></div>

      <!-- ── Enter Email ── -->
      <div
        v-if="forgotPass.forgotPasswordPage === 'EnterEmail'"
        class="bg-white/[0.04] border border-white/[0.09] rounded-3xl p-8 backdrop-blur-sm shadow-2xl"
      >
        <div class="flex flex-col items-center mb-8">
          <div
            class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4"
          >
            <i class="pi pi-key text-white text-xl"></i>
          </div>
          <h2
            class="text-2xl font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent"
          >
            Forgot Password
          </h2>
          <p class="text-gray-500 text-sm mt-1 text-center">
            We'll send you a secure reset link
          </p>
        </div>

        <form class="space-y-4">
          <div>
            <label
              class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5"
              >Email Address</label
            >
            <div class="relative">
              <i
                class="pi pi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
              ></i>
              <input
                v-model="forgotPass.forgotEmail"
                type="email"
                placeholder="you@example.com"
                class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
              />
            </div>
          </div>

          <button
            @click="forgotPass.forgotPassword()"
            type="button"
            class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all text-sm"
          >
            <i class="pi pi-send text-xs"></i> Send Reset Link
          </button>
        </form>

        <p class="text-xs text-gray-600 text-center mt-6">
          We'll send you a secure link to reset your password.
        </p>
      </div>

      <!-- ── Email Sent ── -->
      <div
        v-if="forgotPass.forgotPasswordPage === 'SendEmail'"
        class="bg-white/[0.04] border border-white/[0.09] rounded-3xl p-8 backdrop-blur-sm shadow-2xl text-center"
      >
        <div class="flex flex-col items-center mb-6">
          <div
            class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/25 flex items-center justify-center shadow-lg mb-4"
          >
            <i class="pi pi-envelope text-emerald-400 text-2xl"></i>
          </div>
          <h2
            class="text-2xl font-extrabold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent"
          >
            Check Your Email
          </h2>
        </div>

        <p class="text-gray-400 text-sm leading-relaxed mb-6">
          We've sent a password reset link to your email. Please check your
          inbox and follow the instructions to reset your password.
        </p>

        <!-- Decorative pill -->
        <div
          class="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
          ></span>
          Reset link sent successfully
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userForgotPass } from "@/stores/forgotPass";
const forgotPass = userForgotPass();
</script>
