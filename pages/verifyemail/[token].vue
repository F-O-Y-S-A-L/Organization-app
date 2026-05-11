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
        class="h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent mb-px"
      ></div>

      <div
        class="bg-white/[0.04] border border-white/[0.09] rounded-3xl p-10 backdrop-blur-sm shadow-2xl text-center"
      >
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div
            class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
          >
            <i class="pi pi-envelope text-white text-2xl"></i>
          </div>
        </div>

        <h2
          class="text-2xl font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent mb-4"
        >
          Email Verification
        </h2>

        <!-- Status message -->
        <p class="text-gray-400 text-sm leading-relaxed">
          {{ authStore.status }}
        </p>

        <!-- Animated dots while waiting -->
        <div v-if="!authStore.status" class="flex justify-center gap-1.5 mt-6">
          <span
            class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0s]"
          ></span>
          <span
            class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.15s]"
          ></span>
          <span
            class="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.3s]"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const route = useRoute();

onMounted(async () => {
  await authStore.verifyEmail(route.params.token);
});
</script>
