<template>
  <div class="min-h-screen bg-[#070b12] font-sans relative overflow-x-hidden">
    <!-- Ambient blobs -->
    <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        class="absolute -top-32 -left-24 w-[600px] h-[600px] rounded-full bg-indigo-700/20 blur-[120px] animate-pulse"
      ></div>
      <div
        class="absolute top-[30%] -right-20 w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[100px] animate-pulse [animation-delay:2s]"
      ></div>
      <div
        class="absolute bottom-0 left-[30%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px] animate-pulse [animation-delay:4s]"
      ></div>
    </div>

    <!-- ── Hero ── -->
    <section class="relative z-10 min-h-[90vh] flex items-center">
      <div class="max-w-5xl mx-auto px-6 py-28 text-center">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"
          ></span>
          Now in beta — free to use
        </div>

        <!-- Heading -->
        <h1
          class="text-5xl md:text-[105px] font-extrabold tracking-tight leading-[1.05] mb-6"
        >
          <span
            class="bg-gradient-to-r from-white via-indigo-200 to-violet-300 bg-clip-text text-transparent"
          >
            Manage teams,<br />ship faster.
          </span>
        </h1>

        <p
          class="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Organize your organizations, projects, and tasks — all in one seamless
          workspace.
        </p>

        <!-- CTAs -->
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <NuxtLink
            to="auth/signup"
            class="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all text-sm"
          >
            Get Started Free
            <i class="pi pi-arrow-right text-xs"></i>
          </NuxtLink>
          <NuxtLink
            to="auth/login"
            class="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-gray-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm"
          >
            Sign In
          </NuxtLink>
        </div>

        <!-- Floating stat pills -->
        <div class="flex flex-wrap items-center justify-center gap-4 mt-14">
          <div
            class="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-full px-4 py-2 text-xs text-gray-400"
          >
            <i class="pi pi-users text-indigo-400"></i> Team collaboration
          </div>
          <div
            class="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-full px-4 py-2 text-xs text-gray-400"
          >
            <i class="pi pi-bolt text-violet-400"></i> Realtime updates
          </div>
          <div
            class="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-full px-4 py-2 text-xs text-gray-400"
          >
            <i class="pi pi-shield text-cyan-400"></i> Secure & reliable
          </div>
        </div>
      </div>
    </section>

    <!-- ── Features ── -->
    <section class="relative z-10 py-24 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-14">
          <p
            class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-3"
          >
            What you get
          </p>
          <h2
            class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent"
          >
            Everything your team needs
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Organizations -->
          <div
            class="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-900/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div
              class="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
            ></div>
            <div
              class="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 text-xl mb-5"
            >
              <i class="pi pi-building"></i>
            </div>
            <h3
              class="text-base font-bold text-gray-100 mb-2 group-hover:text-indigo-300 transition-colors"
            >
              Organizations
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              Create and manage collaborative workspaces for your teams with
              full access control.
            </p>
          </div>

          <!-- Projects -->
          <div
            class="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-900/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div
              class="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
            ></div>
            <div
              class="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center text-violet-400 text-xl mb-5"
            >
              <i class="pi pi-briefcase"></i>
            </div>
            <h3
              class="text-base font-bold text-gray-100 mb-2 group-hover:text-violet-300 transition-colors"
            >
              Projects
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              Organize projects, set deadlines, and track progress across your
              entire organization.
            </p>
          </div>

          <!-- Tasks -->
          <div
            class="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-900/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div
              class="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            ></div>
            <div
              class="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 text-xl mb-5"
            >
              <i class="pi pi-list-check"></i>
            </div>
            <h3
              class="text-base font-bold text-gray-100 mb-2 group-hover:text-cyan-300 transition-colors"
            >
              Tasks
            </h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              Assign tasks, collaborate in real time, and keep everyone aligned
              with Kanban boards.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="relative z-10 py-24 px-6">
      <div class="max-w-3xl mx-auto">
        <div
          class="relative bg-gradient-to-br from-indigo-600/20 to-violet-600/10 border border-indigo-500/20 rounded-3xl px-8 py-16 text-center overflow-hidden"
        >
          <!-- Glow -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-violet-600/5 pointer-events-none rounded-3xl"
          ></div>
          <div
            class="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/20 blur-3xl pointer-events-none"
          ></div>

          <p
            class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-4"
          >
            Get started today
          </p>
          <h2
            class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent mb-4"
          >
            Ready to boost your productivity?
          </h2>
          <p class="text-gray-400 text-base mb-10 max-w-md mx-auto">
            Sign up for free and start managing your teams in minutes. No credit
            card required.
          </p>
          <NuxtLink
            to="auth/signup"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-10 py-4 rounded-xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all text-sm"
          >
            Create Free Account
            <i class="pi pi-arrow-right text-xs"></i>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer
      class="relative z-10 border-t border-white/[0.06] py-8 px-6 text-center"
    >
      <p class="text-gray-600 text-xs">© 2025 MyApp. All rights reserved.</p>
    </footer>
  </div>
</template>
