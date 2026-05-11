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
          <i class="pi pi-cog"></i>
        </div>
        <div>
          <h1
            class="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent"
          >
            Settings
          </h1>
          <p class="text-sm text-gray-500 mt-0.5">
            Manage your account preferences
          </p>
        </div>
      </div>

      <div class="space-y-5">
        <!-- Profile Settings -->
        <div
          class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm"
        >
          <h2
            class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-5"
          >
            Profile Settings
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
                  type="text"
                  placeholder="Enter your name"
                  class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                />
              </div>
            </div>
            <div>
              <label
                class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5"
                >Email</label
              >
              <div class="relative">
                <i
                  class="pi pi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                ></i>
                <input
                  type="email"
                  placeholder="Enter your email"
                  class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                />
              </div>
            </div>
            <div>
              <label
                class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5"
                >Avatar</label
              >
              <label
                class="flex items-center gap-3 w-full bg-white/[0.06] border border-white/10 border-dashed rounded-xl py-3 px-4 cursor-pointer hover:border-indigo-500/40 hover:bg-white/[0.08] transition-all group"
              >
                <i
                  class="pi pi-camera text-indigo-400 group-hover:text-indigo-300 transition-colors"
                ></i>
                <span
                  class="text-sm text-gray-600 group-hover:text-gray-400 transition-colors"
                  >Choose a photo...</span
                >
                <input type="file" class="hidden" />
              </label>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div
          class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm"
        >
          <h2
            class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-5"
          >
            Account Settings
          </h2>
          <div class="space-y-4">
            <div>
              <label
                class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5"
                >Change Password</label
              >
              <div class="relative">
                <i
                  class="pi pi-lock absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                ></i>
                <input
                  type="password"
                  placeholder="New password"
                  class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
                />
              </div>
            </div>
            <label class="flex items-center gap-3 cursor-pointer group">
              <div class="relative">
                <input
                  type="checkbox"
                  id="notifications"
                  class="sr-only peer"
                />
                <div
                  class="w-10 h-5 bg-white/10 border border-white/15 rounded-full peer-checked:bg-indigo-600 peer-checked:border-indigo-500 transition-all"
                ></div>
                <div
                  class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-gray-400 peer-checked:bg-white peer-checked:translate-x-5 transition-all"
                ></div>
              </div>
              <span
                class="text-sm text-gray-400 group-hover:text-gray-200 transition-colors"
                >Enable Notifications</span
              >
            </label>
          </div>
        </div>

        <!-- Preferences -->
        <div
          class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-sm"
        >
          <h2
            class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-5"
          >
            Preferences
          </h2>
          <div class="space-y-4">
            <div>
              <label
                class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5"
                >Language</label
              >
              <div class="relative">
                <i
                  class="pi pi-globe absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                ></i>
                <select
                  class="w-full appearance-none bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-10 text-gray-100 text-sm outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all cursor-pointer"
                >
                  <option class="bg-[#0d1420]">English</option>
                  <option class="bg-[#0d1420]">বাংলা</option>
                  <option class="bg-[#0d1420]">Arabic</option>
                </select>
                <i
                  class="pi pi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none"
                ></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-2">
          <button
            class="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] border border-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            class="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all"
          >
            <i class="pi pi-save text-xs"></i> Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
