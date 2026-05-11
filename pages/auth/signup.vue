<template>
  <div
    class="min-h-screen bg-[#070b12] font-sans relative overflow-hidden flex items-center justify-center px-4 py-10"
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
        v-if="authStore.showNotifiAuth"
        class="fixed top-20 right-4 z-[9999] flex items-center gap-3 bg-gray-900/95 border border-indigo-500/40 backdrop-blur-xl text-indigo-100 px-5 py-4 rounded-2xl shadow-2xl max-w-sm"
      >
        <div
          class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0"
        >
          <i class="pi pi-bell text-sm"></i>
        </div>
        <span class="text-sm font-medium">{{
          authStore.NotifiMessageAuth
        }}</span>
      </div>
    </transition>

    <!-- Card -->
    <div class="relative z-10 w-full max-w-md">
      <div
        class="h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent mb-px rounded-t-3xl"
      ></div>

      <div
        class="bg-white/[0.04] border border-white/[0.09] rounded-3xl p-8 backdrop-blur-sm shadow-2xl"
      >
        <!-- Logo + heading -->
        <div class="flex flex-col items-center mb-8">
          <div
            class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4"
          >
            <i class="pi pi-bolt text-white text-xl"></i>
          </div>
          <h2
            class="text-2xl font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent"
          >
            Create account
          </h2>
          <p class="text-gray-500 text-sm mt-1">
            Join and start managing your teams
          </p>
        </div>

        <!-- Form -->
        <form
          @submit.prevent="authStore.signup(authStore.form)"
          class="space-y-4"
        >
          <!-- Name -->
          <div>
            <label
              class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5"
              >Full Name</label
            >
            <div class="relative">
              <i
                class="pi pi-user absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
              ></i>
              <input
                v-model="authStore.form.name"
                type="text"
                placeholder="Your name"
                class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label
              class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5"
              >Email</label
            >
            <div class="relative">
              <i
                class="pi pi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
              ></i>
              <input
                v-model="authStore.form.email"
                type="email"
                placeholder="you@example.com"
                class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label
              class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5"
              >Password</label
            >
            <div class="relative">
              <i
                class="pi pi-lock absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
              ></i>
              <input
                v-model="authStore.form.password"
                :type="authStore.showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-12 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
              />
              <button
                type="button"
                @click="authStore.togglePassword()"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-400 transition-colors"
              >
                <i
                  :class="
                    authStore.showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'
                  "
                  class="text-sm"
                ></i>
              </button>
            </div>
          </div>

          <!-- Success / Error -->
          <p
            v-if="authStore.success"
            class="text-emerald-400 text-xs flex items-center gap-1.5"
          >
            <i class="pi pi-check-circle"></i> {{ authStore.success }}
          </p>
          <p
            v-if="authStore.error"
            class="text-red-400 text-xs flex items-center gap-1.5"
          >
            <i class="pi pi-times-circle"></i> {{ authStore.error }}
          </p>

          <!-- Submit -->
          <button
            type="submit"
            class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all text-sm mt-2"
          >
            <span v-if="authStore.process" class="flex items-center gap-2">
              <i class="pi pi-spin pi-spinner text-sm"></i> Loading...
            </span>
            <span v-else class="flex items-center gap-2">
              Sign Up <i class="pi pi-arrow-right text-xs"></i>
            </span>
          </button>
        </form>

        <!-- Links -->
        <div class="mt-6 space-y-2 text-center text-sm text-gray-600">
          <p>
            <NuxtLink
              to="/forgotPassword"
              class="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot Password?
            </NuxtLink>
          </p>
          <p>
            Already have an account?
            <NuxtLink
              to="/auth/login"
              class="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors ml-1"
            >
              Log In
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>
