<template>
  <!-- Header -->
  <header class="fixed top-0 left-0 right-0 z-40 h-16">
    <!-- Glass background -->
    <div
      class="absolute inset-0 bg-[#070b12]/80 backdrop-blur-xl border-b border-white/[0.07]"
    ></div>
    <!-- Subtle top accent line -->
    <div
      class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
    ></div>

    <div
      class="relative max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between"
    >
      <!-- Left: Hamburger + Logo -->
      <div class="flex items-center gap-3">
        <!-- Mobile hamburger -->
        <button
          @click="openNav()"
          class="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.1] transition-all"
        >
          <i class="pi pi-bars text-base"></i>
        </button>

        <!-- Logo -->
        <NuxtLink
          :to="authStore.jwt ? '/dashboard' : '/'"
          class="flex items-center gap-2.5 group"
        >
          <div
            class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all"
          >
            <i class="pi pi-bolt text-white text-xs"></i>
          </div>
          <span
            class="text-base font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent tracking-tight"
          >
            MyApp
          </span>
        </NuxtLink>
      </div>

      <!-- Mobile right: bell + avatar -->
      <div v-if="authStore.jwt" class="flex items-center gap-2 md:hidden">
        <NuxtLink
          to="/notifications"
          class="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.1] transition-all"
        >
          <i class="pi pi-bell text-base"></i>
          <span
            v-if="notificationStore.unreadCounts > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-0.5 shadow-lg shadow-red-500/40"
          >
            {{ notificationStore.unreadCounts }}
          </span>
        </NuxtLink>
        <button
          @click="openProfileNav()"
          class="p-0.5 rounded-full ring-2 ring-indigo-500/40 hover:ring-indigo-400/70 transition-all"
        >
          <img
            :src="dashboardStore.photoUrl"
            class="w-8 h-8 rounded-full object-cover"
            alt="Avatar"
          />
        </button>
      </div>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1">
        <!-- Bell -->
        <NuxtLink
          v-if="authStore.jwt"
          to="/notifications"
          class="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all mr-1"
        >
          <i class="pi pi-bell text-base"></i>
          <span
            v-if="notificationStore.unreadCounts > 0"
            class="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold min-w-[17px] h-[17px] flex items-center justify-center rounded-full px-0.5 shadow-lg shadow-red-500/40"
          >
            {{ notificationStore.unreadCounts }}
          </span>
        </NuxtLink>

        <!-- Nav links -->
        <NuxtLink
          v-if="authStore.jwt"
          to="/organization"
          class="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          Organizations
        </NuxtLink>
        <NuxtLink
          v-if="authStore.jwt && dashboardStore.userData.role === 'superadmin'"
          to="/admin"
          class="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          Admin
        </NuxtLink>

        <!-- Divider -->
        <div v-if="authStore.jwt" class="w-px h-5 bg-white/[0.1] mx-1"></div>

        <!-- Login / Logout -->
        <NuxtLink
          v-if="!authStore.isAuthenticated"
          to="/auth/login"
          class="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/30 hover:-translate-y-0.5 hover:shadow-indigo-500/40 transition-all"
        >
          Login
        </NuxtLink>
        <button
          v-else
          @click="authStore.logout()"
          class="px-4 py-2 rounded-xl text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-gray-300 hover:text-white transition-all"
        >
          Logout
        </button>

        <!-- Avatar -->
        <NuxtLink
          v-if="authStore.jwt"
          to="/dashboard"
          class="ml-1 p-0.5 rounded-full ring-2 ring-indigo-500/40 hover:ring-indigo-400/70 transition-all"
        >
          <img
            :src="dashboardStore.photoUrl"
            class="w-8 h-8 rounded-full object-cover"
            alt="Avatar"
          />
        </NuxtLink>
      </nav>
    </div>
  </header>

  <!-- Spacer so content doesn't hide under fixed header -->
  <div class="h-16"></div>

  <!-- ── Mobile Left Nav ── -->
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="-translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition-all duration-250 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="-translate-x-full opacity-0"
  >
    <nav
      v-if="showNav"
      class="fixed top-0 left-0 w-72 h-full z-50 bg-[#0a0f1a] border-r border-white/[0.08] flex flex-col"
    >
      <!-- Nav header -->
      <div
        class="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]"
      >
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div
            class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"
          >
            <i class="pi pi-bolt text-white text-xs"></i>
          </div>
          <span
            class="text-base font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent"
            >MyApp</span
          >
        </NuxtLink>
        <button
          @click="closeNav()"
          class="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/30 flex items-center justify-center transition-all text-xs"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>

      <!-- Nav links -->
      <div class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NuxtLink
          v-if="authStore.jwt"
          to="/organization"
          @click="closeNav()"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          <i class="pi pi-building text-indigo-400"></i> Organizations
        </NuxtLink>
        <NuxtLink
          v-if="authStore.jwt"
          to="/dashboard/organizations"
          @click="closeNav()"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          <i class="pi pi-sitemap text-indigo-400"></i> My Organizations
        </NuxtLink>
        <NuxtLink
          v-if="authStore.jwt"
          to="/dashboard/projects"
          @click="closeNav()"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          <i class="pi pi-briefcase text-indigo-400"></i> My Projects
        </NuxtLink>
      </div>

      <!-- Bottom: login/logout -->
      <div class="px-3 py-4 border-t border-white/[0.07]">
        <NuxtLink
          v-if="!authStore.isAuthenticated"
          to="/auth/login"
          @click="closeNav()"
          class="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 transition-all"
        >
          <i class="pi pi-sign-in"></i> Login
        </NuxtLink>
        <button
          v-else
          @click="authStore.logout()"
          class="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-white/[0.06] border border-white/10 text-gray-300 hover:text-red-400 hover:border-red-500/20 transition-all"
        >
          <i class="pi pi-sign-out"></i> Logout
        </button>
      </div>
    </nav>
  </transition>
  <div
    v-if="showNav"
    @click="closeNav()"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
  ></div>

  <!-- ── Mobile Right Profile Drawer ── -->
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition-all duration-250 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      v-if="showProfileNav"
      class="fixed top-0 right-0 w-72 h-full z-50 bg-[#0a0f1a] border-l border-white/[0.08] flex flex-col"
    >
      <!-- Profile header -->
      <div
        class="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]"
      >
        <div class="flex items-center gap-3">
          <div class="p-0.5 rounded-full ring-2 ring-indigo-500/40">
            <img
              :src="dashboardStore.photoUrl"
              class="w-10 h-10 rounded-full object-cover"
              alt="Avatar"
            />
          </div>
          <div class="min-w-0">
            <p class="text-sm font-bold text-gray-100 truncate">
              {{ dashboardStore.userData.name }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{ dashboardStore.userData.email }}
            </p>
          </div>
        </div>
        <button
          @click="closeProfileNav()"
          class="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/30 flex items-center justify-center transition-all text-xs shrink-0"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>

      <!-- Profile nav links -->
      <nav class="flex-1 px-3 py-4 space-y-1">
        <NuxtLink
          to="/dashboard"
          @click="closeProfileNav()"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          <i class="pi pi-user text-indigo-400"></i> Profile
        </NuxtLink>
        <NuxtLink
          v-if="authStore.jwt && dashboardStore.userData.role === 'superadmin'"
          to="/admin"
          @click="closeProfileNav()"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          <i class="pi pi-building-columns text-indigo-400"></i> Admin
        </NuxtLink>
        <NuxtLink
          to="/dashboard/setting"
          @click="closeProfileNav()"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all"
        >
          <i class="pi pi-cog text-indigo-400"></i> Settings
        </NuxtLink>
      </nav>

      <!-- Logout -->
      <div class="px-3 py-4 border-t border-white/[0.07]">
        <button
          @click="authStore.logout()"
          class="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-white/[0.06] border border-white/10 text-gray-300 hover:text-red-400 hover:border-red-500/20 transition-all"
        >
          <i class="pi pi-sign-out"></i> Logout
        </button>
      </div>
    </div>
  </transition>
  <div
    v-if="showProfileNav"
    @click="closeProfileNav()"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
  ></div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";
import { useNotificationStore } from "@/stores/notification";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
const notificationStore = useNotificationStore();

const token = authStore.jwt;

onMounted(async () => {
  if (token) {
    await dashboardStore.getData();
    await notificationStore.unreadNotifiCount();
  }
});

const showNav = ref(false);
const showProfileNav = ref(false);

function openNav() {
  showNav.value = true;
}
function closeNav() {
  showNav.value = false;
}
function openProfileNav() {
  showProfileNav.value = true;
}
function closeProfileNav() {
  showProfileNav.value = false;
}
</script>
