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
      <div
        class="absolute top-[45%] left-[38%] w-[260px] h-[260px] rounded-full bg-cyan-500/10 blur-[80px] animate-pulse [animation-delay:4s]"
      ></div>
    </div>

    <div class="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 py-10 pb-20">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-10">
        <div
          class="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 text-white text-xl shrink-0"
        >
          <i class="pi pi-briefcase"></i>
        </div>
        <div>
          <h1
            class="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent leading-tight"
          >
            My Projects
          </h1>
          <p class="text-sm text-gray-500 mt-0.5">
            Track and manage your project work
          </p>
        </div>
      </div>

      <!-- Stats Banner -->
      <div
        class="relative bg-gradient-to-br from-indigo-600/20 to-violet-600/10 border border-indigo-500/20 rounded-2xl px-6 py-8 mb-8 overflow-hidden"
      >
        <div
          class="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none"
        ></div>
        <div class="flex flex-col md:flex-row md:items-center gap-4 relative">
          <div class="flex-1">
            <p
              class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-1"
            >
              Overview
            </p>
            <h2 class="text-xl font-extrabold text-white">
              Organization Projects
            </h2>
            <p class="text-gray-400 text-sm mt-1 max-w-md">
              A collaborative space where team members manage projects and track
              progress.
            </p>
          </div>
          <!-- Stat pill -->
          <div
            class="flex items-center gap-3 bg-white/[0.06] border border-white/10 rounded-2xl px-6 py-4 shrink-0"
          >
            <div
              class="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/25 flex items-center justify-center text-indigo-400"
            >
              <i class="pi pi-briefcase"></i>
            </div>
            <div>
              <p class="text-2xl font-extrabold text-white leading-none">
                {{ projectStore.projectCounts }}
              </p>
              <p class="text-xs text-gray-500 mt-0.5">Projects</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10"
      >
        <div
          v-for="(project, index) in projectStore.projects"
          :key="project._id"
          class="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-900/30 hover:-translate-y-1 transition-all duration-300"
          :style="`animation: fadeUp 0.45s ease both; animation-delay: ${index * 0.07}s`"
        >
          <!-- Top accent -->
          <div
            class="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
          ></div>
          <!-- Hover glow -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-violet-600/0 group-hover:from-indigo-600/5 group-hover:to-violet-600/5 transition-all duration-500 rounded-2xl pointer-events-none"
          ></div>

          <!-- Clickable content area -->
          <NuxtLink
            :to="`/organization/tasks/${project._id}`"
            class="block p-5 pb-3"
          >
            <div class="flex items-start gap-3 mb-3">
              <div
                class="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5"
              >
                <i class="pi pi-briefcase text-sm"></i>
              </div>
              <h2
                class="font-bold text-gray-100 text-base leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2"
              >
                {{ project.name }}
              </h2>
            </div>

            <p class="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
              {{ project.description }}
            </p>

            <div class="h-px bg-white/[0.06] mb-3"></div>

            <!-- Creator -->
            <div class="flex items-center gap-2 mb-2">
              <img
                :src="project.createdBy?.photo"
                class="w-7 h-7 rounded-full border border-indigo-500/30 object-cover shrink-0"
              />
              <div class="min-w-0">
                <p
                  class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest"
                >
                  Created by
                </p>
                <p class="text-gray-500 text-xs truncate">
                  {{ project.createdBy?.email }}
                </p>
              </div>
            </div>

            <p class="flex items-center gap-1.5 text-[11px] text-gray-600 mt-2">
              <i class="pi pi-clock"></i>
              {{
                new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }}
            </p>
          </NuxtLink>

          <!-- Action buttons -->
          <div class="flex gap-2 px-5 pb-5 pt-2">
            <button
              @click="
                projectStore.openUpdate(
                  project._id,
                  project.name,
                  project.description,
                )
              "
              class="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/50 text-amber-300 py-2 rounded-xl transition-all"
            >
              <i class="pi pi-pencil text-xs"></i> Update
            </button>
            <button
              @click="projectStore.deleteProject(project._id, project.orgId)"
              class="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/50 text-red-400 py-2 rounded-xl transition-all"
            >
              <i class="pi pi-trash text-xs"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Update Modal ── -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="projectStore.showUpdate"
        class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        @click.self="projectStore.cancelUpdate()"
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
              Update Project
            </h2>
            <button
              @click="projectStore.cancelUpdate()"
              class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
          <div class="px-6 pb-4 flex flex-col gap-4">
            <div>
              <label
                class="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5"
                >Project Name</label
              >
              <div class="relative">
                <i
                  class="pi pi-briefcase absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                ></i>
                <input
                  v-model="projectStore.projectName"
                  type="text"
                  placeholder="Project Name"
                  class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                />
              </div>
            </div>
            <div>
              <label
                class="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5"
                >Description</label
              >
              <div class="relative">
                <i
                  class="pi pi-align-left absolute left-4 top-4 text-indigo-400 text-sm pointer-events-none"
                ></i>
                <textarea
                  v-model="projectStore.projectDes"
                  placeholder="Project Description"
                  rows="3"
                  class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>
          <div
            class="flex justify-end gap-2 px-6 py-4 border-t border-white/[0.06]"
          >
            <button
              @click="projectStore.cancelUpdate()"
              class="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] border border-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              @click="projectStore.updateProject()"
              class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all"
            >
              <i class="pi pi-check text-xs"></i> Save
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProjectStore } from "@/stores/project";

const config = useRuntimeConfig();
const projectStore = useProjectStore();

onMounted(async () => await projectStore.userByPorject());
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
