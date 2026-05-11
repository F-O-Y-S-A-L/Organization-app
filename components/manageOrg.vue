<template>
  <div
    class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 md:p-6 backdrop-blur-sm"
  >
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0"
        >
          <i class="pi pi-building text-sm"></i>
        </div>
        <h2 class="text-base font-bold text-gray-100">All Organizations</h2>
      </div>
      <div class="relative w-full sm:w-72">
        <i
          class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
        ></i>
        <input
          type="search"
          v-model="userStore.searchQuery"
          placeholder="Search organization..."
          class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-xl border border-white/[0.07]">
      <table class="min-w-full text-sm">
        <thead class="sticky top-0 z-10">
          <tr class="bg-white/[0.06] border-b border-white/[0.07]">
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              <i class="pi pi-building mr-1"></i> Organization
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Owner
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
            v-for="org in userStore.filteredOrganizations"
            :key="org._id"
            class="hover:bg-white/[0.03] transition-colors"
          >
            <!-- Org name -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2.5">
                <div
                  class="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0"
                >
                  <i class="pi pi-building text-xs"></i>
                </div>
                <span class="text-gray-100 font-medium text-sm">{{
                  org.name
                }}</span>
              </div>
            </td>
            <!-- Owner -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-1.5 text-gray-400 text-sm">
                <i class="pi pi-user text-indigo-400/70 text-xs"></i>
                {{ org.ownerId?.email }}
              </div>
            </td>
            <!-- Actions -->
            <td class="px-4 py-3">
              <div class="flex flex-wrap gap-2">
                <button
                  @click="userStore.viewOrg(org._id)"
                  class="flex items-center gap-1 text-[11px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/50 text-indigo-300 px-3 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-eye text-[10px]"></i> View
                </button>
                <button
                  @click="userStore.openUpdateCard(org._id, org.name)"
                  class="flex items-center gap-1 text-[11px] font-semibold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/50 text-amber-300 px-3 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-pencil text-[10px]"></i> Edit
                </button>
                <button
                  @click="userStore.openDeleteCardOrg(org._id)"
                  class="flex items-center gap-1 text-[11px] font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 px-3 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-trash text-[10px]"></i> Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ── Delete Confirm Modal ── -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="userStore.showDeleteOrg"
          class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          @click.self="userStore.showDeleteOrg = false"
        >
          <div
            class="bg-[#0d1420] border border-white/10 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-scaleIn"
          >
            <div class="flex items-center gap-3 px-6 pt-6 pb-4">
              <div
                class="w-11 h-11 rounded-2xl bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-400 text-lg shrink-0"
              >
                <i class="pi pi-trash"></i>
              </div>
              <h2 class="flex-1 text-base font-extrabold text-gray-100">
                Delete Organization
              </h2>
              <button
                @click="userStore.showDeleteOrg = false"
                class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs"
              >
                <i class="pi pi-times"></i>
              </button>
            </div>
            <div class="px-6 pb-6">
              <p class="text-gray-400 text-sm mb-5">
                Are you sure you want to delete this organization? This action
                cannot be undone.
              </p>
              <button
                @click="userStore.deleteOrg()"
                class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-bold shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all"
              >
                <i class="pi pi-trash text-xs"></i> Yes, Delete
              </button>
              <p
                v-if="userStore.success"
                class="mt-3 text-emerald-400 text-xs text-center"
              >
                {{ userStore.success }}
              </p>
              <p
                v-if="userStore.error"
                class="mt-3 text-red-400 text-xs text-center"
              >
                {{ userStore.error }}
              </p>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- ── Org Details Modal ── -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="userStore.showOrgDetils && userStore.selectedOrg.org"
          class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          @click.self="userStore.cancelOrg()"
        >
          <div
            class="bg-[#0d1420] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scaleIn"
          >
            <div class="flex items-center gap-3 px-6 pt-6 pb-4">
              <div
                class="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/25 flex items-center justify-center text-indigo-400 text-lg shrink-0"
              >
                <i class="pi pi-building"></i>
              </div>
              <h2 class="flex-1 text-lg font-extrabold text-gray-100">
                Organization Details
              </h2>
              <button
                @click="userStore.cancelOrg()"
                class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs"
              >
                <i class="pi pi-times"></i>
              </button>
            </div>
            <div class="px-6 pb-6 flex items-start gap-5">
              <div class="flex-1 space-y-3 min-w-0">
                <div>
                  <p
                    class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
                  >
                    Name
                  </p>
                  <p class="text-gray-100 font-semibold text-sm">
                    {{ userStore.selectedOrg?.org?.name }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
                  >
                    Admin
                  </p>
                  <p class="text-gray-300 text-sm truncate">
                    {{ userStore.selectedOrg.org.ownerId?.email }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
                  >
                    Members
                  </p>
                  <p class="text-gray-300 text-sm">
                    {{ userStore.selectedOrg.orgCount }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
                  >
                    Role
                  </p>
                  <p class="text-gray-300 text-sm">
                    {{ userStore.selectedOrg.org?.ownerId?.role }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
                  >
                    Created
                  </p>
                  <p class="text-gray-300 text-sm">
                    {{
                      new Date(
                        userStore.selectedOrg.org.createdAt,
                      ).toLocaleString("en-US")
                    }}
                  </p>
                </div>
              </div>
              <div class="p-1 rounded-2xl ring-4 ring-indigo-500/20 shrink-0">
                <img
                  :src="userStore.selectedOrg.org?.ownerId?.photo"
                  class="w-28 h-28 rounded-xl object-cover"
                />
              </div>
            </div>
            <div class="px-6 pb-5">
              <button
                @click="userStore.cancelOrg()"
                class="w-full py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] border border-white/10 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- ── Update / Invite Modal ── -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="userStore.showUpdateOrg"
          class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          @click.self="userStore.cancelUpdateCard()"
        >
          <div
            class="bg-[#0d1420] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scaleIn"
          >
            <div class="flex items-center gap-3 px-6 pt-6 pb-4">
              <div
                class="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 text-lg shrink-0"
              >
                <i class="pi pi-pencil"></i>
              </div>
              <h2 class="flex-1 text-lg font-extrabold text-gray-100">
                Edit Organization
              </h2>
              <button
                @click="userStore.cancelUpdateCard()"
                class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs"
              >
                <i class="pi pi-times"></i>
              </button>
            </div>

            <div class="px-6 pb-4 flex flex-col gap-4">
              <!-- Rename section -->
              <div
                class="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4"
              >
                <p
                  class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3"
                >
                  Rename Organization
                </p>
                <div class="relative mb-3">
                  <i
                    class="pi pi-building absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                  ></i>
                  <input
                    v-model="userStore.updateOrgName"
                    type="text"
                    placeholder="Enter organization name..."
                    class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                  />
                </div>
                <button
                  @click="userStore.updateOrg()"
                  class="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/25 hover:border-amber-400/50 text-amber-300 text-sm font-semibold transition-all"
                >
                  <i class="pi pi-check text-xs"></i> Update Name
                </button>
              </div>

              <!-- Invite section -->
              <div
                class="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4"
              >
                <p
                  class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3"
                >
                  Invite Member
                </p>
                <div class="relative mb-3">
                  <i
                    class="pi pi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                  ></i>
                  <input
                    v-model="userStore.inviteEmail"
                    type="email"
                    placeholder="Member email"
                    class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                  />
                </div>
                <div class="relative">
                  <i
                    class="pi pi-shield absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                  ></i>
                  <select
                    v-model="userStore.inviteRole"
                    class="w-full appearance-none bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-10 text-gray-100 text-sm outline-none focus:border-indigo-500/60 transition-all cursor-pointer"
                  >
                    <option class="bg-[#0d1420]" disabled value="">
                      Select Role
                    </option>
                    <option class="bg-[#0d1420]" value="owner">Owner</option>
                    <option class="bg-[#0d1420]" value="admin">Admin</option>
                    <option class="bg-[#0d1420]" value="member">Member</option>
                  </select>
                  <i
                    class="pi pi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none"
                  ></i>
                </div>
                <p class="text-[10px] text-gray-600 font-mono mt-2 px-1">
                  {{ userStore.currentOrgId }}
                </p>
              </div>
            </div>

            <div
              class="flex justify-end gap-2 px-6 py-4 border-t border-white/[0.06]"
            >
              <button
                @click="userStore.cancelUpdateCard()"
                class="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] border border-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                @click="userStore.sendInvite()"
                class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all"
              >
                <i class="pi pi-send text-xs"></i> Send Invite
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const userStore = useUserStore();
const config = useRuntimeConfig();

onMounted(
  async () => await userStore.allOrgCard(),
  await userStore.getAllUsers(),
);
</script>

<style>
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
