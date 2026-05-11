<template>
  <div class="min-h-screen bg-[#070b12] font-sans relative overflow-x-hidden">
    <!-- Ambient blobs -->
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        class="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-indigo-700/20 blur-[100px] animate-pulse"
      ></div>
      <div
        class="absolute bottom-[10%] -right-20 w-[380px] h-[380px] rounded-full bg-violet-600/15 blur-[90px] animate-pulse [animation-delay:2s]"
      ></div>
    </div>

    <div class="relative z-10 max-w-2xl mx-auto px-4 md:px-6 py-10 pb-20">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-10">
        <div
          class="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 text-white text-xl shrink-0"
        >
          <i class="pi pi-bell"></i>
        </div>
        <div>
          <h1
            class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent"
          >
            Notifications
          </h1>
          <p class="text-sm text-gray-500 mt-0.5">Your realtime updates</p>
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="notificationStore.userNotifications.length === 0"
        class="flex flex-col items-center justify-center gap-4 py-24 text-center"
      >
        <div
          class="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-3xl"
        >
          <i class="pi pi-bell"></i>
        </div>
        <p class="text-lg font-bold text-gray-300">No notifications yet</p>
        <p class="text-sm text-gray-600">You're all caught up!</p>
      </div>

      <!-- Notification list -->
      <div class="space-y-3">
        <div
          v-for="(notification, index) in notificationStore.userNotifications"
          :key="notification._id || index"
          class="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 hover:border-indigo-500/25 hover:shadow-xl hover:shadow-indigo-900/20 transition-all duration-300 flex items-start gap-4"
          :style="`animation: fadeUp 0.4s ease both; animation-delay: ${index * 0.05}s`"
        >
          <!-- Top accent -->
          <div
            class="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
          ></div>

          <!-- Index badge -->
          <div
            class="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 text-xs font-bold shrink-0 mt-0.5"
          >
            {{ index + 1 }}
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <p class="text-gray-100 text-sm font-semibold mb-2 leading-snug">
              {{ notification.message }}
            </p>

            <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
              <span
                class="flex items-center gap-1 text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg font-medium"
              >
                <i class="pi pi-bolt text-[10px]"></i>
                {{ notification.action }}
              </span>
            </div>

            <div
              class="flex flex-wrap items-center gap-3 text-xs text-gray-500"
            >
              <span class="flex items-center gap-1.5">
                <i class="pi pi-user text-indigo-400/70"></i>
                {{ notification.userId?.email }}
              </span>
              <span class="text-white/10">|</span>
              <span class="flex items-center gap-1.5">
                <i class="pi pi-building text-indigo-400/70"></i>
                {{ notification.targetId }}
              </span>
            </div>

            <p class="text-[11px] text-gray-600 mt-2 flex items-center gap-1">
              <i class="pi pi-clock"></i>
              {{ new Date(notification.createdAt).toLocaleString() }}
            </p>
          </div>

          <!-- Delete button -->
          <button
            @click="notificationStore.userNotifiDelete(notification._id)"
            class="w-8 h-8 rounded-xl bg-white/[0.04] hover:bg-red-500/15 border border-white/[0.07] hover:border-red-500/30 text-gray-600 hover:text-red-400 flex items-center justify-center transition-all shrink-0 text-xs"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useNotificationStore } from "@/stores/notification";
import { useDashboardStore } from "@/stores/dashboard";

const notificationStore = useNotificationStore();
const dashboardStore = useDashboardStore();

onMounted(async () => {
  await notificationStore.userOnlyNotification();
  await dashboardStore.getData();
  await notificationStore.markAsRead();
});
</script>

<style>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
