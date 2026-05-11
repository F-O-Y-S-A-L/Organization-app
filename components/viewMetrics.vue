<template>
  <div
    class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm"
  >
    <div class="flex items-center gap-3 mb-6">
      <div
        class="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0"
      >
        <i class="pi pi-server text-sm"></i>
      </div>
      <h2 class="text-base font-bold text-gray-100">System Metrics</h2>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <!-- Total Users -->
      <div
        class="group bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/30 rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
      >
        <div
          class="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-3"
        >
          <i class="pi pi-users text-xs"></i>
        </div>
        <p class="text-2xl font-extrabold text-white mb-1">
          {{ userStore.userCounts }}
        </p>
        <p
          class="text-[11px] text-gray-500 font-medium uppercase tracking-wider"
        >
          Total Users
        </p>
      </div>

      <!-- Total Organizations -->
      <div
        class="group bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/30 rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
      >
        <div
          class="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400 mx-auto mb-3"
        >
          <i class="pi pi-building text-xs"></i>
        </div>
        <p class="text-2xl font-extrabold text-white mb-1">
          {{ orgStore.orgCount }}
        </p>
        <p
          class="text-[11px] text-gray-500 font-medium uppercase tracking-wider"
        >
          Organizations
        </p>
      </div>

      <!-- CPU Usage -->
      <div
        class="group bg-white/[0.03] border border-white/[0.07] hover:border-cyan-500/30 rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
      >
        <div
          class="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto mb-3"
        >
          <i class="pi pi-server text-xs"></i>
        </div>
        <p class="text-2xl font-extrabold text-white mb-1">{{}}%</p>
        <p
          class="text-[11px] text-gray-500 font-medium uppercase tracking-wider"
        >
          CPU Usage
        </p>
      </div>

      <!-- Memory Usage -->
      <div
        class="group bg-white/[0.03] border border-white/[0.07] hover:border-emerald-500/30 rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
      >
        <div
          class="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-3"
        >
          <i class="pi pi-box text-xs"></i>
        </div>
        <p class="text-2xl font-extrabold text-white mb-1">{{}}%</p>
        <p
          class="text-[11px] text-gray-500 font-medium uppercase tracking-wider"
        >
          Memory Usage
        </p>
      </div>

      <!-- Active Projects -->
      <div
        class="group bg-white/[0.03] border border-white/[0.07] hover:border-amber-500/30 rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
      >
        <div
          class="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-3"
        >
          <i class="pi pi-briefcase text-xs"></i>
        </div>
        <p class="text-2xl font-extrabold text-white mb-1">
          {{ projectStore.projectCounts }}
        </p>
        <p
          class="text-[11px] text-gray-500 font-medium uppercase tracking-wider"
        >
          Active Projects
        </p>
      </div>

      <!-- Activity Log -->
      <div
        class="group bg-white/[0.03] border border-white/[0.07] hover:border-red-500/30 rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
      >
        <div
          class="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 mx-auto mb-3"
        >
          <i class="pi pi-history text-xs"></i>
        </div>
        <p class="text-2xl font-extrabold text-red-400 mb-1">
          {{ activityStore.activityLogCount }}
        </p>
        <p
          class="text-[11px] text-gray-500 font-medium uppercase tracking-wider"
        >
          Activity Log
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { organizationStore } from "@/stores/organization";
import { useProjectStore } from "@/stores/project";
import { useActivityLogStore } from "@/stores/activityLog";
import { onMounted } from "vue";

const userStore = useUserStore();
const activityStore = useActivityLogStore();
const orgStore = organizationStore();
const projectStore = useProjectStore();

onMounted(async () => {
  await userStore.getAllUsers();
  await orgStore.allOrgCard();
  await projectStore.Allproject();
  await activityStore.allActivityLog();
});
</script>
