<template>
  <div
    class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 md:p-6 backdrop-blur-sm"
  >
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0"
        >
          <i class="pi pi-users text-sm"></i>
        </div>
        <h2 class="text-base font-bold text-gray-100">Manage Users</h2>
      </div>
      <div class="relative w-full md:w-72">
        <i
          class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
        ></i>
        <input
          type="search"
          v-model="userStore.searchQuery"
          placeholder="Search user..."
          class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
        />
      </div>
    </div>

    <!-- ── Desktop Table ── -->
    <div
      class="hidden lg:block overflow-x-auto max-h-[40rem] xl:max-h-[46rem] rounded-xl border border-white/[0.07]"
    >
      <table class="min-w-full text-sm">
        <thead class="sticky top-0 z-10">
          <tr class="bg-white/[0.06] border-b border-white/[0.07]">
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Name
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Email
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Status
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Organizations
            </th>
            <th
              class="px-4 py-3 text-left text-[10px] font-bold text-indigo-400 uppercase tracking-widest"
            >
              Joined
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
            v-for="(user, index) in userStore.filteredUsers"
            :key="user._id"
            class="hover:bg-white/[0.03] transition-colors"
          >
            <!-- Name -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <div
                  class="p-0.5 rounded-full ring-2 ring-indigo-500/25 shrink-0"
                >
                  <img
                    :src="`${config.public.apiUrl}/img/user/${user.photo}`"
                    class="w-9 h-9 rounded-full object-cover"
                  />
                </div>
                <span class="text-gray-200 font-medium text-sm"
                  >{{ index + 1 }}. {{ user.name }}</span
                >
              </div>
            </td>
            <!-- Email -->
            <td class="px-4 py-3 text-gray-400 text-sm">{{ user.email }}</td>
            <!-- Status -->
            <td class="px-4 py-3">
              <span
                :class="
                  user.isVerified
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                    : 'bg-red-500/15 text-red-400 border-red-500/25'
                "
                class="text-[11px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider"
              >
                {{ user.isVerified ? "Active" : "Inactive" }}
              </span>
            </td>
            <!-- Organizations -->
            <td class="px-4 py-3">
              <ul class="max-h-28 overflow-y-auto space-y-1">
                <li v-for="org in user.organizations" :key="org.orgId">
                  <button
                    @click="userStore.openUpdateCard(org.orgId)"
                    class="w-full text-left text-[11px] font-medium bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 text-indigo-300 px-3 py-1.5 rounded-lg transition-all truncate max-w-[200px]"
                  >
                    {{ org.orgId }}
                  </button>
                </li>
              </ul>
            </td>
            <!-- Joined -->
            <td class="px-4 py-3 text-gray-500 text-xs">
              <ul class="space-y-1">
                <li v-for="date in user.organizations" :key="date.id">
                  {{
                    new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  }}
                </li>
              </ul>
            </td>
            <!-- Actions -->
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button
                  @click="userStore.viewUser(user._id)"
                  class="flex items-center gap-1 text-[11px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/50 text-indigo-300 px-3 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-eye text-[10px]"></i> View
                </button>
                <button
                  @click="userStore.openUserCard(user._id)"
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

    <!-- ── Mobile Cards ── -->
    <div class="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div
        v-for="(user, index) in userStore.filteredUsers"
        :key="user._id"
        class="group bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/25 rounded-xl p-4 transition-all"
      >
        <div class="flex items-center gap-3 mb-3">
          <div class="p-0.5 rounded-full ring-2 ring-indigo-500/25 shrink-0">
            <img
              :src="`${config.public.apiUrl}/img/user/${user.photo}`"
              class="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div class="min-w-0">
            <p class="text-gray-100 font-semibold text-sm truncate">
              {{ index + 1 }}. {{ user.name }}
            </p>
            <p class="text-gray-500 text-xs truncate">{{ user.email }}</p>
          </div>
          <span
            :class="
              user.isVerified
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
                : 'bg-red-500/15 text-red-400 border-red-500/25'
            "
            class="text-[10px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider ml-auto shrink-0"
          >
            {{ user.isVerified ? "Active" : "Inactive" }}
          </span>
        </div>

        <p class="text-[11px] text-gray-600 mb-2 flex items-center gap-1">
          <i class="pi pi-clock"></i>
          {{
            new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }}
        </p>

        <ul class="max-h-24 overflow-y-auto space-y-1 mb-3">
          <li v-for="org in user.organizations" :key="org.orgId">
            <button
              @click="userStore.openUpdateCard(org.orgId)"
              class="w-full text-left text-[11px] font-medium bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-lg transition-all truncate"
            >
              {{ org.orgId }}
            </button>
          </li>
        </ul>

        <div class="flex gap-2">
          <button
            @click="userStore.viewUser(user._id)"
            class="flex-1 flex items-center justify-center gap-1 text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/50 text-indigo-300 py-2 rounded-xl transition-all"
          >
            <i class="pi pi-eye text-xs"></i> View
          </button>
          <button
            @click="userStore.openUserCard(user._id)"
            class="flex-1 flex items-center justify-center gap-1 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 py-2 rounded-xl transition-all"
          >
            <i class="pi pi-trash text-xs"></i> Delete
          </button>
        </div>
      </div>
    </div>

    <!-- ── Update Org Modal ── -->
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
                class="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/25 flex items-center justify-center text-indigo-400 text-lg shrink-0"
              >
                <i class="pi pi-building"></i>
              </div>
              <h2 class="flex-1 text-lg font-extrabold text-gray-100">
                Manage Organization
              </h2>
              <button
                @click="userStore.cancelUpdateCard()"
                class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs"
              >
                <i class="pi pi-times"></i>
              </button>
            </div>
            <div class="px-6 pb-4 flex flex-col gap-4">
              <div>
                <label
                  class="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5"
                  >Email</label
                >
                <div class="relative">
                  <i
                    class="pi pi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                  ></i>
                  <input
                    v-model="userStore.sendEmail"
                    type="email"
                    placeholder="Member email"
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
                    v-model="userStore.sendRole"
                    class="w-full appearance-none bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-10 text-gray-100 text-sm outline-none focus:border-indigo-500/60 transition-all cursor-pointer"
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
              <p class="text-xs text-gray-600 font-mono px-1">
                {{ userStore.currentOrgId }}
              </p>
              <button
                @click="userStore.deleteOrg()"
                class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 text-sm font-semibold transition-all"
              >
                <i class="pi pi-trash text-xs"></i> Delete Organization
              </button>
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
                @click="userStore.updateOrg()"
                class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all"
              >
                <i class="pi pi-check text-xs"></i> Save
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- ── User Info Modal ── -->
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
          v-if="userStore.showUserCard"
          class="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          @click.self="userStore.showUserCard = false"
        >
          <div
            class="bg-[#0d1420] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-scaleIn"
          >
            <div class="flex items-center gap-3 px-6 pt-6 pb-4">
              <div
                class="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/25 flex items-center justify-center text-indigo-400 text-lg shrink-0"
              >
                <i class="pi pi-user"></i>
              </div>
              <h2 class="flex-1 text-lg font-extrabold text-gray-100">
                User Details
              </h2>
              <button
                @click="userStore.showUserCard = false"
                class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs"
              >
                <i class="pi pi-times"></i>
              </button>
            </div>
            <div class="px-6 pb-6 flex items-start gap-5">
              <div class="p-1 rounded-2xl ring-4 ring-indigo-500/20 shrink-0">
                <img
                  :src="`${config.public.apiUrl}/img/user/${userStore.userData.photo}`"
                  class="w-24 h-24 rounded-xl object-cover"
                />
              </div>
              <div class="space-y-2 min-w-0 flex-1">
                <div>
                  <p
                    class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
                  >
                    Name
                  </p>
                  <p class="text-gray-100 font-semibold text-sm">
                    {{ userStore.userData.name }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
                  >
                    Email
                  </p>
                  <p class="text-gray-300 text-sm truncate">
                    {{ userStore.userData.email }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
                  >
                    Role
                  </p>
                  <p class="text-gray-300 text-sm">
                    {{ userStore.userData.role }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
                  >
                    Organizations
                  </p>
                  <p class="text-gray-300 text-sm">
                    {{ userStore.userData.organizations?.length }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

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
          v-if="userStore.showUserDelete"
          class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          @click.self="userStore.showUserDelete = false"
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
                Delete User
              </h2>
              <button
                @click="userStore.showUserDelete = false"
                class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs"
              >
                <i class="pi pi-times"></i>
              </button>
            </div>
            <div class="px-6 pb-6">
              <p class="text-gray-400 text-sm mb-5">
                Are you sure you want to delete this user? This action cannot be
                undone.
              </p>
              <button
                @click="userStore.deleteUser()"
                class="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-sm font-bold shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all"
              >
                <i class="pi pi-trash text-xs"></i> Yes, Delete User
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
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useDashboardStore } from "@/stores/dashboard";

const userStore = useUserStore();
const dashboardStore = useDashboardStore();
const config = useRuntimeConfig();

onMounted(async () => {
  await userStore.getAllUsers();
  await dashboardStore.getData();
});
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
