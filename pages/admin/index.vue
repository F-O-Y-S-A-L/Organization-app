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
    </div>

    <!-- Mobile toggle button -->
    <button
      @click="openSideBarAdmin()"
      class="xl:hidden fixed top-20 left-4 z-30 w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.1] transition-all"
    >
      <i class="pi pi-bars text-base"></i>
    </button>

    <!-- ── Desktop Sidebar ── -->
    <aside
      class="hidden xl:flex flex-col fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 z-30 bg-[#070b12]/95 border-r border-white/[0.07] backdrop-blur-xl"
    >
      <!-- Title -->
      <div class="px-5 py-6 border-b border-white/[0.07]">
        <div class="flex items-center gap-2.5">
          <div
            class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0"
          >
            <i class="pi pi-shield text-white text-xs"></i>
          </div>
          <h2
            class="text-sm font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent"
          >
            Admin Dashboard
          </h2>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 space-y-1">
        <button
          @click="active = 'metrics'"
          :class="[
            'flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
            active === 'metrics'
              ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
              : 'text-gray-400 hover:text-white hover:bg-white/[0.07] border border-transparent',
          ]"
        >
          <span
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
              active === 'metrics'
                ? 'bg-indigo-500/25 border border-indigo-500/30 text-indigo-400'
                : 'bg-white/[0.05] border border-white/[0.07] text-gray-500',
            ]"
            ><i class="pi pi-chart-bar text-xs"></i
          ></span>
          View Metrics
        </button>

        <button
          @click="active = 'users'"
          :class="[
            'flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
            active === 'users'
              ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
              : 'text-gray-400 hover:text-white hover:bg-white/[0.07] border border-transparent',
          ]"
        >
          <span
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
              active === 'users'
                ? 'bg-indigo-500/25 border border-indigo-500/30 text-indigo-400'
                : 'bg-white/[0.05] border border-white/[0.07] text-gray-500',
            ]"
            ><i class="pi pi-users text-xs"></i
          ></span>
          Manage Users
        </button>

        <button
          @click="active = 'orgs'"
          :class="[
            'flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-xs font-medium transition-all',
            active === 'orgs'
              ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
              : 'text-gray-400 hover:text-white hover:bg-white/[0.07] border border-transparent',
          ]"
        >
          <span
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
              active === 'orgs'
                ? 'bg-indigo-500/25 border border-indigo-500/30 text-indigo-400'
                : 'bg-white/[0.05] border border-white/[0.07] text-gray-500',
            ]"
            ><i class="pi pi-building text-xs"></i
          ></span>
          Manage Organizations
        </button>

        <button
          @click="active = 'activity'"
          :class="[
            'flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
            active === 'activity'
              ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
              : 'text-gray-400 hover:text-white hover:bg-white/[0.07] border border-transparent',
          ]"
        >
          <span
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
              active === 'activity'
                ? 'bg-indigo-500/25 border border-indigo-500/30 text-indigo-400'
                : 'bg-white/[0.05] border border-white/[0.07] text-gray-500',
            ]"
            ><i class="pi pi-history text-xs"></i
          ></span>
          Activity
        </button>
      </nav>
    </aside>

    <!-- ── Mobile Sidebar ── -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="-translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-250 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-full opacity-0"
    >
      <aside
        v-if="showSideBarAdmin"
        class="fixed top-0 left-0 w-64 h-full z-50 bg-[#0a0f1a] border-r border-white/[0.08] flex flex-col"
      >
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]"
        >
          <div class="flex items-center gap-2.5">
            <div
              class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0"
            >
              <i class="pi pi-shield text-white text-xs"></i>
            </div>
            <h2
              class="text-sm font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent"
            >
              Admin Dashboard
            </h2>
          </div>
          <button
            @click="closeSideBarAdmin()"
            class="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/30 flex items-center justify-center transition-all text-xs"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>

        <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <button
            @click="
              active = 'metrics';
              closeSideBarAdmin();
            "
            :class="[
              'flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
              active === 'metrics'
                ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.07] border border-transparent',
            ]"
          >
            <span
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                active === 'metrics'
                  ? 'bg-indigo-500/25 border border-indigo-500/30 text-indigo-400'
                  : 'bg-white/[0.05] border border-white/[0.07] text-gray-500',
              ]"
              ><i class="pi pi-chart-bar text-xs"></i
            ></span>
            View Metrics
          </button>

          <button
            @click="
              active = 'users';
              closeSideBarAdmin();
            "
            :class="[
              'flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
              active === 'users'
                ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.07] border border-transparent',
            ]"
          >
            <span
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                active === 'users'
                  ? 'bg-indigo-500/25 border border-indigo-500/30 text-indigo-400'
                  : 'bg-white/[0.05] border border-white/[0.07] text-gray-500',
              ]"
              ><i class="pi pi-users text-xs"></i
            ></span>
            Manage Users
          </button>

          <button
            @click="
              active = 'orgs';
              closeSideBarAdmin();
            "
            :class="[
              'flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
              active === 'orgs'
                ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.07] border border-transparent',
            ]"
          >
            <span
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                active === 'orgs'
                  ? 'bg-indigo-500/25 border border-indigo-500/30 text-indigo-400'
                  : 'bg-white/[0.05] border border-white/[0.07] text-gray-500',
              ]"
              ><i class="pi pi-building text-xs"></i
            ></span>
            Manage Organizations
          </button>

          <button
            @click="
              active = 'activity';
              closeSideBarAdmin();
            "
            :class="[
              'flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
              active === 'activity'
                ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.07] border border-transparent',
            ]"
          >
            <span
              :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                active === 'activity'
                  ? 'bg-indigo-500/25 border border-indigo-500/30 text-indigo-400'
                  : 'bg-white/[0.05] border border-white/[0.07] text-gray-500',
              ]"
              ><i class="pi pi-history text-xs"></i
            ></span>
            Activity
          </button>
        </nav>
      </aside>
    </transition>

    <!-- Backdrop -->
    <div
      v-if="showSideBarAdmin"
      @click="closeSideBarAdmin()"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
    ></div>

    <!-- ── Main Content ── -->
    <main
      class="relative z-10 flex-1 xl:ml-60 pt-6 px-4 md:px-6 pb-20 mt-10 xl:mt-0"
    >
      <ViewMetrics v-if="active === 'metrics'" />
      <ManageUser v-else-if="active === 'users'" />
      <ManageOrg v-else-if="active === 'orgs'" />
      <ManageActivity v-else />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const active = ref("metrics");
const showSideBarAdmin = ref(false);

function openSideBarAdmin() {
  showSideBarAdmin.value = true;
}
function closeSideBarAdmin() {
  showSideBarAdmin.value = false;
}
</script>
