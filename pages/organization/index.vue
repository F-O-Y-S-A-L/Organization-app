<template>
  <div class="min-h-screen bg-[#070b12] font-sans relative overflow-x-hidden">
    <!-- Ambient background blobs -->
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

    <div class="relative z-10 max-w-[1300px] mx-auto px-4 md:px-8 py-10 pb-20">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-10">
        <div
          class="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 text-white text-xl shrink-0"
        >
          <i class="pi pi-building"></i>
        </div>
        <div>
          <h1
            class="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent leading-tight"
          >
            Organizations
          </h1>
          <p class="text-sm text-gray-500 mt-0.5">
            Manage your teams and workspaces
          </p>
        </div>
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
          v-if="orgStore.showNotifiOrg"
          class="fixed top-20 right-4 z-[9999] flex items-center gap-3 bg-gray-900/95 border border-indigo-500/40 backdrop-blur-xl text-indigo-100 px-5 py-4 rounded-2xl shadow-2xl max-w-sm"
        >
          <div
            class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0"
          >
            <i class="pi pi-bell text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{
            orgStore.NotifiMessageOrg
          }}</span>
        </div>
      </transition>

      <!-- Create Organization -->
      <div
        class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-6 backdrop-blur-sm"
      >
        <h2
          class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-4"
        >
          Create New Organization
        </h2>
        <div class="flex flex-col md:flex-row gap-3">
          <div class="relative flex-1">
            <i
              class="pi pi-building absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
            ></i>
            <input
              v-model="orgStore.orgName"
              type="text"
              placeholder="Organization name..."
              class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
            />
          </div>
          <button
            @click="orgStore.createOrganization()"
            class="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap text-sm"
          >
            <i class="pi pi-plus"></i>
            Create
          </button>
        </div>
      </div>

      <!-- Search -->
      <div class="relative w-full md:max-w-sm mb-8">
        <i
          class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
        ></i>
        <input
          type="search"
          v-model="orgStore.searchQuery"
          placeholder="Search organizations..."
          class="w-full bg-white/[0.05] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all"
        />
      </div>

      <Loader v-if="orgStore.isLoading" />

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(org, index) in orgStore.filteredOrganizations"
          :key="org._id"
          class="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 overflow-hidden hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-900/30 hover:-translate-y-1 transition-all duration-300"
          :style="`animation: fadeUp 0.45s ease both; animation-delay: ${index * 0.07}s`"
        >
          <!-- Top accent line -->
          <div
            class="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
          ></div>
          <!-- Hover glow -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-violet-600/0 group-hover:from-indigo-600/5 group-hover:to-violet-600/5 transition-all duration-500 rounded-2xl pointer-events-none"
          ></div>

          <!-- Org Name -->
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0"
            >
              <i class="pi pi-building"></i>
            </div>
            <h3
              class="font-bold text-gray-100 text-base leading-tight truncate"
            >
              {{ org.name }}
            </h3>
          </div>

          <!-- Owner -->
          <div class="flex items-center gap-3 mb-4">
            <img
              :src="org.ownerId?.photo"
              class="w-9 h-9 rounded-full border-2 border-indigo-500/30 object-cover shrink-0"
            />
            <div class="min-w-0">
              <p
                class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
              >
                Owner
              </p>
              <p class="text-gray-400 text-xs truncate">
                {{ org.ownerId?.email }}
              </p>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-px bg-white/[0.06] mb-4"></div>

          <!-- Action Buttons 2x2 -->
          <div class="grid grid-cols-2 gap-2 mb-4">
            <button
              @click="orgStore.openInvite(org._id)"
              class="flex items-center justify-center gap-1.5 text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/50 text-indigo-300 py-2 rounded-xl transition-all"
            >
              <i class="pi pi-user-plus text-xs"></i> Invite
            </button>
            <NuxtLink
              :to="`/organization/projects/${org._id}`"
              class="flex items-center justify-center gap-1.5 text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/50 text-emerald-300 py-2 rounded-xl transition-all"
            >
              <i class="pi pi-th-large text-xs"></i> Manage
            </NuxtLink>
            <button
              @click="orgStore.openUpdate(org._id, org.name)"
              class="flex items-center justify-center gap-1.5 text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/50 text-amber-300 py-2 rounded-xl transition-all"
            >
              <i class="pi pi-pencil text-xs"></i> Update
            </button>
            <button
              @click="orgStore.deleteOrg(org._id)"
              class="flex items-center justify-center gap-1.5 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 py-2 rounded-xl transition-all"
            >
              <i class="pi pi-trash text-xs"></i> Delete
            </button>
          </div>

          <!-- Date -->
          <p class="flex items-center gap-1.5 text-[11px] text-gray-600">
            <i class="pi pi-clock"></i>
            {{
              new Date(org.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- ── Invite Modal ─────────────────────────────────────── -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="orgStore.showInvite"
        class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        @click.self="orgStore.cancelInvite()"
      >
        <div
          class="bg-[#0d1420] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scaleIn"
        >
          <!-- header -->
          <div class="flex items-center gap-3 px-6 pt-6 pb-4">
            <div
              class="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/25 flex items-center justify-center text-indigo-400 text-lg shrink-0"
            >
              <i class="pi pi-user-plus"></i>
            </div>
            <h2 class="flex-1 text-lg font-extrabold text-gray-100">
              Invite Member
            </h2>
            <button
              @click="orgStore.cancelInvite()"
              class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
          <!-- body -->
          <div class="px-6 pb-4 flex flex-col gap-4">
            <div>
              <label
                class="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5"
                >Email Address</label
              >
              <div class="relative">
                <i
                  class="pi pi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                ></i>
                <input
                  v-model="orgStore.inviteEmail"
                  type="email"
                  placeholder="member@example.com"
                  class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                />
              </div>
            </div>
            <div>
              <label
                class="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5"
                >Role</label
              >
              <div class="relative">
                <i
                  class="pi pi-shield absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                ></i>
                <select
                  v-model="orgStore.inviteRole"
                  class="w-full appearance-none bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-10 text-gray-100 text-sm outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all cursor-pointer"
                >
                  <option class="bg-[#0d1420]" value="owner">Owner</option>
                  <option class="bg-[#0d1420]" value="admin">Admin</option>
                  <option class="bg-[#0d1420]" value="member">Member</option>
                </select>
                <i
                  class="pi pi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none"
                ></i>
              </div>
            </div>
          </div>
          <!-- footer -->
          <div
            class="flex justify-end gap-2 px-6 py-4 border-t border-white/[0.06]"
          >
            <button
              @click="orgStore.cancelInvite()"
              class="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] border border-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              @click="orgStore.sendInvite"
              class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all"
            >
              <i class="pi pi-send text-xs"></i> Send Invite
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ── Update Modal ─────────────────────────────────────── -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="orgStore.showUpdate"
        class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        @click.self="orgStore.cancelUpdate()"
      >
        <div
          class="bg-[#0d1420] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scaleIn"
        >
          <!-- header -->
          <div class="flex items-center gap-3 px-6 pt-6 pb-4">
            <div
              class="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 text-lg shrink-0"
            >
              <i class="pi pi-pencil"></i>
            </div>
            <h2 class="flex-1 text-lg font-extrabold text-gray-100">
              Update Organization
            </h2>
            <button
              @click="orgStore.cancelUpdate()"
              class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
          <!-- body -->
          <div class="px-6 pb-4">
            <label
              class="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5"
              >Organization Name</label
            >
            <div class="relative">
              <i
                class="pi pi-building absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
              ></i>
              <input
                v-model="orgStore.updateOrgName"
                type="text"
                placeholder="New organization name"
                class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
              />
            </div>
          </div>
          <!-- footer -->
          <div
            class="flex justify-end gap-2 px-6 py-4 border-t border-white/[0.06]"
          >
            <button
              @click="orgStore.cancelUpdate()"
              class="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] border border-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              @click="orgStore.updateOrg()"
              class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all"
            >
              <i class="pi pi-check text-xs"></i> Update
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { organizationStore } from "@/stores/organization";
import { useDashboardStore } from "@/stores/dashboard";
import { useNotificationStore } from "@/stores/notification";

const notifiStore = useNotificationStore();
const orgStore = organizationStore();
const dashboardStore = useDashboardStore();

onMounted(async () => {
  await orgStore.allOrgCard();
  await dashboardStore.getData();
});
</script>

<style>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.animate-scaleIn {
  animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
</style>
