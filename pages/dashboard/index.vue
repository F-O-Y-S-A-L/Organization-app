<template>
  <div
    class="min-h-screen bg-[#070b12] font-sans relative overflow-x-hidden flex"
  >
    <!-- Ambient blobs -->
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        class="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-indigo-700/20 blur-[100px] animate-pulse"
      ></div>
      <div
        class="absolute bottom-[10%] -right-20 w-[380px] h-[380px] rounded-full bg-violet-600/15 blur-[90px] animate-pulse [animation-delay:2s]"
      ></div>
      <div
        class="absolute top-[45%] left-[38%] w-[260px] h-[260px] rounded-full bg-cyan-500/10 blur-[80px] animate-pulse [animation-delay:4s]"
      ></div>
    </div>

    <!-- ── Sidebar ── -->
    <aside
      class="hidden md:flex flex-col fixed top-16 left-0 h-[calc(100vh-4rem)] w-56 lg:w-64 z-30 bg-[#070b12]/95 border-r border-white/[0.07] backdrop-blur-xl"
    >
      <!-- Sidebar top -->
      <div class="px-4 py-6">
        <p
          class="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-3 mb-3"
        >
          Menu
        </p>
        <nav class="space-y-1">
          <NuxtLink
            to="/dashboard/setting"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all group"
          >
            <span
              class="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-all shrink-0"
            >
              <i class="pi pi-cog text-xs"></i>
            </span>
            Settings
          </NuxtLink>
          <NuxtLink
            to="/dashboard/organizations"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all group"
          >
            <span
              class="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-all shrink-0"
            >
              <i class="pi pi-building text-xs"></i>
            </span>
            My Organization
          </NuxtLink>
          <NuxtLink
            to="/dashboard/projects"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.07] transition-all group"
          >
            <span
              class="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-all shrink-0"
            >
              <i class="pi pi-briefcase text-xs"></i>
            </span>
            My Projects
          </NuxtLink>
        </nav>
      </div>

      <!-- Sidebar bottom: user info -->
      <div class="mt-auto px-4 py-4 border-t border-white/[0.07]">
        <div
          class="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.04] border border-white/[0.07]"
        >
          <div class="p-0.5 rounded-full ring-2 ring-indigo-500/40 shrink-0">
            <img
              :src="dashboardStore.photoUrl"
              class="w-8 h-8 rounded-full object-cover"
              alt="Avatar"
            />
          </div>
          <div class="min-w-0">
            <p class="text-xs font-bold text-gray-200 truncate">
              {{ dashboardStore.userData.name }}
            </p>
            <p class="text-[10px] text-gray-500 truncate">
              {{ dashboardStore.userData.email }}
            </p>
          </div>
        </div>
      </div>
    </aside>

    <!-- ── Main ── -->
    <div
      class="relative z-10 flex-1 md:ml-56 lg:ml-64 flex flex-col min-h-screen"
    >
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
          v-if="dashboardStore.showNotifiDashboard"
          class="fixed top-20 right-4 z-[9999] flex items-center gap-3 bg-gray-900/95 border border-indigo-500/40 backdrop-blur-xl text-indigo-100 px-5 py-4 rounded-2xl shadow-2xl max-w-sm"
        >
          <div
            class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0"
          >
            <i class="pi pi-bell text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{
            dashboardStore.NotifiMessageDashbaord
          }}</span>
        </div>
      </transition>

      <main class="flex-1 px-4 md:px-8 py-8 space-y-6">
        <!-- ── Hero / Welcome Banner ── -->
        <div
          class="relative bg-gradient-to-br from-indigo-600/20 to-violet-600/10 border border-indigo-500/20 rounded-2xl p-6 md:p-8 overflow-hidden"
        >
          <!-- decorative circle -->
          <div
            class="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none"
          ></div>
          <div class="flex flex-col md:flex-row md:items-center gap-4 relative">
            <div class="flex-1">
              <p
                class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-1"
              >
                Welcome back
              </p>
              <h1
                class="text-2xl md:text-3xl font-extrabold text-white tracking-tight"
              >
                Hello, {{ dashboardStore.userData.name?.toUpperCase() }}! 👋
              </h1>
              <p
                v-if="dashboardStore.userData.role === 'superadmin'"
                class="text-gray-400 mt-2 text-sm max-w-sm"
              >
                Welcome, Superadmin — you have full access and control over the
                system.
              </p>
              <p v-else class="text-gray-400 mt-2 text-sm max-w-sm">
                Welcome back — explore your dashboard and stay productive!
              </p>
            </div>
            <div
              class="p-1 rounded-full ring-4 ring-indigo-500/30 shrink-0 self-start md:self-center"
            >
              <img
                :src="dashboardStore.photoUrl"
                class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                alt="Avatar"
              />
            </div>
          </div>
        </div>

        <!-- ── Two columns ── -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Profile Image Update -->
          <div
            class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm"
          >
            <h2
              class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-5"
            >
              Profile Photo
            </h2>
            <div class="flex items-center gap-5">
              <!-- Avatar + camera btn -->
              <div class="relative shrink-0">
                <div class="p-1 rounded-full ring-4 ring-indigo-500/25">
                  <img
                    :src="previewUrl || dashboardStore.photoUrl"
                    class="w-20 h-20 rounded-full object-cover"
                    alt="Preview"
                  />
                </div>
                <label
                  for="file-upload"
                  class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 border-2 border-[#070b12] flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform"
                >
                  <i class="pi pi-camera text-white text-xs"></i>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  class="hidden"
                  @change="onFileChange"
                />
              </div>

              <div class="flex flex-col gap-2">
                <p class="text-sm font-semibold text-gray-200">
                  {{ dashboardStore.userData.name }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ dashboardStore.userData.email }}
                </p>
                <button
                  @click="dashboardStore.updateUserInfo()"
                  class="flex items-center gap-2 mt-1 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all w-fit"
                >
                  <i class="pi pi-upload text-xs"></i> Upload Photo
                </button>
              </div>
            </div>
          </div>

          <!-- Profile Info Update -->
          <div
            class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm"
          >
            <h2
              class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-5"
            >
              Profile Information
            </h2>
            <div class="space-y-4">
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
                    v-model="dashboardStore.userData.name"
                    type="text"
                    class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                  />
                </div>
              </div>
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
                    v-model="dashboardStore.userData.email"
                    type="email"
                    class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                  />
                </div>
              </div>
              <button
                @click="dashboardStore.updateUserInfo()"
                class="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all"
              >
                <i class="pi pi-save text-xs"></i> Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDashboardStore } from "@/stores/dashboard";

const dashboardStore = useDashboardStore();
const previewUrl = ref(null);

onMounted(() => dashboardStore.getData());

function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  dashboardStore.setPhoto(file);
  previewUrl.value = URL.createObjectURL(file);
}
</script>
