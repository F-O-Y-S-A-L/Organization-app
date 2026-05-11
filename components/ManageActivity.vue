<template>
  <div
    class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 md:p-6 backdrop-blur-sm"
  >
    <Loader v-if="activityStore.isLoading" />

    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0"
        >
          <i class="pi pi-history text-sm"></i>
        </div>
        <div>
          <h2 class="text-base font-bold text-gray-100">Activity Logs</h2>
          <p class="text-[11px] text-gray-600 mt-0.5">
            Total:
            <span class="text-indigo-400 font-semibold">{{
              activityStore.activityLogCount
            }}</span>
          </p>
        </div>
      </div>
      <button
        @click="activityStore.allActivityLog()"
        class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-gray-300 hover:text-white text-sm font-semibold transition-all"
      >
        <i class="pi pi-refresh text-xs"></i> Refresh
      </button>
    </div>

    <!-- ── Desktop Table ── -->
    <div
      class="hidden lg:block overflow-x-auto max-h-[44rem] xl:max-h-[50rem] rounded-xl border border-white/[0.07]"
    >
      <table class="min-w-full text-sm">
        <thead class="sticky top-0 z-10">
          <tr class="bg-white/[0.06] border-b border-white/[0.07]">
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              User
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Action
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Target Type
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Target ID
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Organization
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Time
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/[0.05]">
          <tr
            v-for="log in activityStore.activityLog"
            :key="log.id"
            class="hover:bg-white/[0.03] transition-colors"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-1.5 text-gray-300 text-sm">
                <i class="pi pi-user text-indigo-400/70 text-xs"></i>
                {{ log.userId?.email }}
              </div>
            </td>
            <td class="px-4 py-3">
              <span
                class="text-[11px] font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-lg"
              >
                {{ log.action }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-400 text-sm">
              {{ log.targetType }}
            </td>
            <td
              class="px-4 py-3 text-gray-500 text-xs font-mono truncate max-w-[140px]"
            >
              {{ log.targetId }}
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-1.5 text-gray-400 text-sm">
                <i class="pi pi-building text-indigo-400/70 text-xs"></i>
                <span class="truncate max-w-[120px]">{{ log.orgId }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
              <div class="flex items-center gap-1">
                <i class="pi pi-clock text-[10px]"></i>
                {{ new Date(log.createdAt).toLocaleString("en-US") }}
              </div>
            </td>
            <td class="px-4 py-3">
              <button
                @click="activityStore.deleteLog(log._id)"
                class="flex items-center gap-1 text-[11px] font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 px-3 py-1.5 rounded-lg transition-all"
              >
                <i class="pi pi-trash text-[10px]"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ── Mobile Cards ── -->
    <div class="lg:hidden space-y-3">
      <div
        v-for="log in activityStore.activityLog"
        :key="log.id"
        class="bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/20 rounded-xl p-4 transition-all"
      >
        <!-- User + Action -->
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-1.5 text-gray-300 text-sm min-w-0">
            <i class="pi pi-user text-indigo-400/70 text-xs shrink-0"></i>
            <span class="truncate">{{ log.userId?.email }}</span>
          </div>
          <span
            class="shrink-0 text-[11px] font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-lg"
          >
            {{ log.action }}
          </span>
        </div>

        <div class="space-y-1.5 mb-3">
          <p class="text-xs text-gray-500">
            <span
              class="text-gray-600 uppercase tracking-wider text-[10px] font-bold"
              >Target Type</span
            >
            <span class="ml-2 text-gray-300">{{ log.targetType }}</span>
          </p>
          <p class="text-xs text-gray-500">
            <span
              class="text-gray-600 uppercase tracking-wider text-[10px] font-bold"
              >Target ID</span
            >
            <span class="ml-2 text-gray-400 font-mono text-[11px]">{{
              log.targetId
            }}</span>
          </p>
          <p class="text-xs flex items-center gap-1.5">
            <i class="pi pi-building text-indigo-400/70 text-[10px]"></i>
            <span class="text-gray-400 truncate">{{ log.orgId }}</span>
          </p>
          <p class="text-[11px] text-gray-600 flex items-center gap-1">
            <i class="pi pi-clock text-[10px]"></i>
            {{ new Date(log.createdAt).toLocaleString("en-US") }}
          </p>
        </div>

        <div class="flex justify-end">
          <button
            @click="activityStore.deleteLog(log._id)"
            class="flex items-center gap-1.5 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 px-4 py-2 rounded-xl transition-all"
          >
            <i class="pi pi-trash text-xs"></i> Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
import { useActivityLogStore } from "@/stores/activityLog";

const dashboardStore = useDashboardStore();
const activityStore = useActivityLogStore();

onMounted(
  async () => await activityStore.allActivityLog(),
  await dashboardStore.getData(),
);
</script>
