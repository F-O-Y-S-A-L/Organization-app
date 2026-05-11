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

    <div class="relative z-10 max-w-[1300px] mx-auto px-4 md:px-8 py-10 pb-20">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-10">
        <div
          class="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 text-white text-xl shrink-0"
        >
          <i class="pi pi-list-check"></i>
        </div>
        <div>
          <h1
            class="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent leading-tight"
          >
            Tasks
          </h1>
          <p class="text-sm text-gray-500 mt-0.5">
            Track and manage your project tasks
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
          v-if="taskStore.showNotifiTask || commentStore.showNotifiCom"
          class="fixed top-20 right-4 z-[9999] flex items-center gap-3 bg-gray-900/95 border border-indigo-500/40 backdrop-blur-xl text-indigo-100 px-5 py-4 rounded-2xl shadow-2xl max-w-sm"
        >
          <div
            class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0"
          >
            <i class="pi pi-bell text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{
            taskStore.NotifiMessageTask || commentStore.NotifiMessageCom
          }}</span>
        </div>
      </transition>

      <!-- Create Task Form -->
      <div
        class="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-8 backdrop-blur-sm"
      >
        <h2
          class="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-4"
        >
          Create New Task
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- Title -->
          <div class="relative">
            <i
              class="pi pi-bookmark absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
            ></i>
            <input
              v-model="taskStore.taskForm.newTaskTitle"
              type="text"
              placeholder="Task title..."
              class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all"
            />
          </div>
          <!-- Status -->
          <div class="relative">
            <i
              class="pi pi-flag absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
            ></i>
            <select
              v-model="taskStore.taskForm.newTaskStatus"
              class="w-full appearance-none bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-10 text-gray-100 text-sm outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all cursor-pointer"
            >
              <option class="bg-[#0d1420]" value="Todo">Todo</option>
              <option class="bg-[#0d1420]" value="In-Progress">
                In-Progress
              </option>
              <option class="bg-[#0d1420]" value="Done">Done</option>
            </select>
            <i
              class="pi pi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none"
            ></i>
          </div>
          <!-- Description -->
          <div class="relative md:col-span-2">
            <i
              class="pi pi-align-left absolute left-4 top-4 text-indigo-400 text-sm pointer-events-none"
            ></i>
            <textarea
              v-model="taskStore.taskForm.newTaskDescription"
              placeholder="Task description..."
              rows="2"
              class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all resize-none"
            ></textarea>
          </div>
          <!-- Due Date -->
          <div class="relative">
            <i
              class="pi pi-calendar absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
            ></i>
            <input
              type="date"
              :value="
                taskStore.taskForm.newTaskDueDate
                  ? new Date(taskStore.taskForm.newTaskDueDate)
                      .toISOString()
                      .split('T')[0]
                  : ''
              "
              @change="taskStore.taskForm.newTaskDueDate = $event.target.value"
              class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-400 text-sm outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all [color-scheme:dark]"
            />
          </div>
          <!-- Submit -->
          <div class="flex items-center">
            <button
              @click="taskStore.createTask(projectId)"
              class="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-200 hover:-translate-y-0.5 text-sm"
            >
              <i class="pi pi-plus"></i> Add Task
            </button>
          </div>
        </div>
      </div>

      <Loader v-if="taskStore.isLoading" />

      <!-- Kanban Board -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- ── Todo Column ── -->
        <div
          class="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden"
        >
          <!-- Column header -->
          <div
            class="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06]"
          >
            <span
              class="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50"
            ></span>
            <h3
              class="font-bold text-gray-200 text-sm uppercase tracking-wider"
            >
              Todo
            </h3>
            <span
              class="ml-auto text-xs font-bold text-yellow-400/70 bg-yellow-400/10 px-2 py-0.5 rounded-full"
            >
              {{ taskStore.newTasks.filter((t) => t.status === "Todo").length }}
            </span>
          </div>
          <!-- Top accent -->
          <div
            class="h-0.5 bg-gradient-to-r from-yellow-400/60 via-yellow-300/30 to-transparent"
          ></div>

          <div class="p-3 max-h-[560px] overflow-y-auto space-y-3">
            <div
              v-for="task in taskStore.newTasks.filter(
                (t) => t.status === 'Todo',
              )"
              :key="task.id"
              @click="selectedTask = task"
              class="group relative bg-white/[0.04] border border-white/[0.08] hover:border-yellow-400/30 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-yellow-900/20 hover:-translate-y-0.5"
            >
              <div class="flex items-start justify-between gap-2 mb-2">
                <h4
                  class="text-gray-100 text-sm font-semibold leading-snug group-hover:text-yellow-300 transition-colors"
                >
                  {{ task.title }}
                </h4>
                <span
                  class="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-300 font-semibold border border-yellow-400/20"
                  >Todo</span
                >
              </div>
              <p
                class="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2"
              >
                {{ task.description }}
              </p>
              <div class="flex items-center gap-2 mb-2">
                <img
                  :src="task.assignedTo?.photo"
                  class="w-6 h-6 rounded-full border border-indigo-500/30 object-cover"
                />
                <span class="text-gray-500 text-xs truncate">{{
                  task.assignedTo?.email
                }}</span>
              </div>
              <p class="text-[11px] text-gray-600 mb-3 flex items-center gap-1">
                <i class="pi pi-calendar"></i>
                Due:
                {{
                  new Date(task.dueDate).toLocaleDateString("en-US") ||
                  "Not set"
                }}
              </p>
              <div class="flex gap-1.5">
                <button
                  @click.stop="
                    taskStore.openUpdate(
                      task._id,
                      task.title,
                      task.description,
                      task.status,
                      task.dueDate,
                    )
                  "
                  class="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-400/50 text-amber-300 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-pencil"></i> Update
                </button>
                <button
                  @click.stop="taskStore.deleteTask(task._id)"
                  class="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-400/50 text-red-400 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-trash"></i> Delete
                </button>
                <button
                  @click.stop="commentStore.openComment(task._id)"
                  class="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-400/50 text-indigo-300 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-comment"></i> Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ── In-Progress Column ── -->
        <div
          class="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden"
        >
          <div
            class="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06]"
          >
            <span
              class="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50"
            ></span>
            <h3
              class="font-bold text-gray-200 text-sm uppercase tracking-wider"
            >
              In Progress
            </h3>
            <span
              class="ml-auto text-xs font-bold text-blue-400/70 bg-blue-400/10 px-2 py-0.5 rounded-full"
            >
              {{
                taskStore.newTasks.filter((t) => t.status === "In-Progress")
                  .length
              }}
            </span>
          </div>
          <div
            class="h-0.5 bg-gradient-to-r from-blue-400/60 via-blue-300/30 to-transparent"
          ></div>

          <div class="p-3 max-h-[560px] overflow-y-auto space-y-3">
            <div
              v-for="task in taskStore.newTasks.filter(
                (t) => t.status === 'In-Progress',
              )"
              :key="task.id"
              @click="selectedTask = task"
              class="group relative bg-white/[0.04] border border-white/[0.08] hover:border-blue-400/30 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5"
            >
              <div class="flex items-start justify-between gap-2 mb-2">
                <h4
                  class="text-gray-100 text-sm font-semibold leading-snug group-hover:text-blue-300 transition-colors"
                >
                  {{ task.title }}
                </h4>
                <span
                  class="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-blue-400/15 text-blue-300 font-semibold border border-blue-400/20"
                  >In-Progress</span
                >
              </div>
              <p
                class="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2"
              >
                {{ task.description }}
              </p>
              <div class="flex items-center gap-2 mb-2">
                <img
                  :src="task.assignedTo?.photo"
                  class="w-6 h-6 rounded-full border border-indigo-500/30 object-cover"
                />
                <span class="text-gray-500 text-xs truncate">{{
                  task.assignedTo?.email
                }}</span>
              </div>
              <p class="text-[11px] text-gray-600 mb-3 flex items-center gap-1">
                <i class="pi pi-calendar"></i>
                Due:
                {{
                  new Date(task.dueDate).toLocaleDateString("en-US") ||
                  "Not set"
                }}
              </p>
              <div class="flex gap-1.5">
                <button
                  @click.stop="
                    taskStore.openUpdate(
                      task._id,
                      task.title,
                      task.description,
                      task.status,
                      task.dueDate,
                    )
                  "
                  class="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-400/50 text-amber-300 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-pencil"></i> Update
                </button>
                <button
                  @click.stop="taskStore.deleteTask(task._id)"
                  class="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-400/50 text-red-400 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-trash"></i> Delete
                </button>
                <button
                  @click.stop="commentStore.openComment(task._id)"
                  class="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-400/50 text-indigo-300 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-comment"></i> Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Done Column ── -->
        <div
          class="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden"
        >
          <div
            class="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06]"
          >
            <span
              class="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50"
            ></span>
            <h3
              class="font-bold text-gray-200 text-sm uppercase tracking-wider"
            >
              Done
            </h3>
            <span
              class="ml-auto text-xs font-bold text-emerald-400/70 bg-emerald-400/10 px-2 py-0.5 rounded-full"
            >
              {{ taskStore.newTasks.filter((t) => t.status === "Done").length }}
            </span>
          </div>
          <div
            class="h-0.5 bg-gradient-to-r from-emerald-400/60 via-emerald-300/30 to-transparent"
          ></div>

          <div class="p-3 max-h-[560px] overflow-y-auto space-y-3">
            <div
              v-for="task in taskStore.newTasks.filter(
                (t) => t.status === 'Done',
              )"
              :key="task.id"
              @click="selectedTask = task"
              class="group relative bg-white/[0.04] border border-white/[0.08] hover:border-emerald-400/30 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-0.5"
            >
              <div class="flex items-start justify-between gap-2 mb-2">
                <h4
                  class="text-gray-100 text-sm font-semibold leading-snug group-hover:text-emerald-300 transition-colors line-through decoration-gray-600"
                >
                  {{ task.title }}
                </h4>
                <span
                  class="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 font-semibold border border-emerald-400/20"
                  >Done</span
                >
              </div>
              <p
                class="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2"
              >
                {{ task.description }}
              </p>
              <div class="flex items-center gap-2 mb-2">
                <img
                  :src="task.assignedTo?.photo"
                  class="w-6 h-6 rounded-full border border-indigo-500/30 object-cover"
                />
                <span class="text-gray-500 text-xs truncate">{{
                  task.assignedTo?.email
                }}</span>
              </div>
              <p class="text-[11px] text-gray-600 mb-3 flex items-center gap-1">
                <i class="pi pi-calendar"></i>
                Due:
                {{
                  new Date(task.dueDate).toLocaleDateString("en-US") ||
                  "Not set"
                }}
              </p>
              <div class="flex gap-1.5">
                <button
                  @click.stop="
                    taskStore.openUpdate(
                      task._id,
                      task.title,
                      task.description,
                      task.status,
                      task.dueDate,
                    )
                  "
                  class="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-400/50 text-amber-300 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-pencil"></i> Update
                </button>
                <button
                  @click.stop="taskStore.deleteTask(task._id)"
                  class="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-400/50 text-red-400 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-trash"></i> Delete
                </button>
                <button
                  @click.stop="commentStore.openComment(task._id)"
                  class="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-400/50 text-indigo-300 py-1.5 rounded-lg transition-all"
                >
                  <i class="pi pi-comment"></i> Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Update Task Modal ── -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="taskStore.showUpdate"
        class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        @click.self="taskStore.cancelUpdate"
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
              Update Task
            </h2>
            <button
              @click="taskStore.cancelUpdate"
              class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
          <div class="px-6 pb-4 flex flex-col gap-3">
            <div>
              <label
                class="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5"
                >Title</label
              >
              <div class="relative">
                <i
                  class="pi pi-bookmark absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                ></i>
                <input
                  v-model="taskStore.taskUpdates.title"
                  type="text"
                  placeholder="Task Title"
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
                  v-model="taskStore.taskUpdates.description"
                  placeholder="Task Description"
                  rows="3"
                  class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all resize-none"
                ></textarea>
              </div>
            </div>
            <div>
              <label
                class="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5"
                >Status</label
              >
              <div class="relative">
                <i
                  class="pi pi-flag absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                ></i>
                <select
                  v-model="taskStore.taskUpdates.status"
                  class="w-full appearance-none bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-10 text-gray-100 text-sm outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all cursor-pointer"
                >
                  <option class="bg-[#0d1420]" value="Todo">Todo</option>
                  <option class="bg-[#0d1420]" value="In-Progress">
                    In-Progress
                  </option>
                  <option class="bg-[#0d1420]" value="Done">Done</option>
                </select>
                <i
                  class="pi pi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs pointer-events-none"
                ></i>
              </div>
            </div>
            <div>
              <label
                class="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5"
                >Due Date</label
              >
              <div class="relative">
                <i
                  class="pi pi-calendar absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 text-sm pointer-events-none"
                ></i>
                <input
                  v-model="taskStore.taskUpdates.dueDate"
                  type="date"
                  class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-400 text-sm outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all [color-scheme:dark]"
                />
              </div>
            </div>
          </div>
          <div
            class="flex justify-end gap-2 px-6 py-4 border-t border-white/[0.06]"
          >
            <button
              @click="taskStore.cancelUpdate"
              class="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] border border-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              @click="taskStore.saveUpdate()"
              class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 transition-all"
            >
              <i class="pi pi-check text-xs"></i> Save
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ── Comment Panel ── -->
    <transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="commentStore.showComment"
        class="fixed top-0 right-0 h-full w-full md:w-[400px] z-50 bg-[#0a0f1a] border-l border-white/[0.08] shadow-2xl flex flex-col"
      >
        <!-- Panel header -->
        <div
          class="flex items-start justify-between p-5 border-b border-white/[0.07]"
        >
          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-extrabold text-gray-100 truncate">
              {{ commentStore.selectedTask?.title || "Task Details" }}
            </h2>
            <p class="text-xs text-gray-500 mt-0.5">
              Assigned to:
              <span class="text-indigo-400 font-medium">{{
                commentStore.selectedTask?.assignedTo?.email || "Unassigned"
              }}</span>
            </p>
            <div class="flex items-center gap-1.5 mt-2">
              <i class="pi pi-comment text-indigo-400 text-xs"></i>
              <span
                class="text-xs font-bold text-indigo-400 uppercase tracking-wider"
                >Comments</span
              >
            </div>
          </div>
          <button
            @click="commentStore.closeTask()"
            class="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-gray-500 hover:text-red-400 flex items-center justify-center transition-all text-xs ml-3 shrink-0 mt-1"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>

        <!-- Empty state -->
        <div
          v-if="commentStore.allComment.length === 0"
          class="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6"
        >
          <div
            class="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl"
          >
            <i class="pi pi-comment"></i>
          </div>
          <p class="font-bold text-gray-300 text-lg">No comments yet</p>
          <p class="text-gray-600 text-sm">Start the conversation below</p>
        </div>

        <!-- Comment list -->
        <ul v-else class="flex-1 overflow-y-auto p-4 space-y-3">
          <li
            v-for="com in commentStore.allComment"
            :key="com._id"
            class="relative bg-white/[0.04] border border-white/[0.07] rounded-xl p-4 hover:border-indigo-500/20 transition-all"
          >
            <!-- Comment header -->
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <img
                  :src="com.userId?.photo"
                  class="w-7 h-7 rounded-full border border-indigo-500/30 object-cover"
                />
                <span class="text-sm font-semibold text-gray-200">{{
                  com.userId?.name
                }}</span>
              </div>
              <button
                @click="commentStore.openUpDel(com._id)"
                class="text-gray-500 hover:text-gray-300 px-1.5 py-0.5 rounded-lg hover:bg-white/[0.06] transition-all text-lg font-bold leading-none"
              >
                ···
              </button>

              <!-- Action dropdown -->
              <div
                v-if="commentStore.upComId === com._id"
                class="absolute right-12 top-3 w-36 bg-[#111827] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10"
              >
                <button
                  @click="commentStore.openUpdateCom(com._id, com.message)"
                  class="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/10 transition-all"
                >
                  <i class="pi pi-pencil"></i> Update
                </button>
                <button
                  @click="commentStore.deleteComment(com._id)"
                  class="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <i class="pi pi-trash"></i> Delete
                </button>
              </div>
            </div>

            <p class="text-gray-300 text-sm leading-relaxed">
              {{ com.message }}
            </p>
            <p class="text-[11px] text-gray-600 mt-2 flex items-center gap-1">
              <i class="pi pi-clock"></i>
              {{ new Date(com.createdAt).toLocaleDateString("en-US") }}
            </p>
          </li>
        </ul>

        <!-- Comment input -->
        <div class="p-4 border-t border-white/[0.07]">
          <div class="flex gap-2">
            <textarea
              v-model="commentStore.newComment"
              placeholder="Write a comment..."
              rows="2"
              class="flex-1 bg-white/[0.06] border border-white/10 rounded-xl py-3 px-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all resize-none"
            ></textarea>
            <button
              @click="commentStore.addComment()"
              class="flex items-center justify-center w-12 shrink-0 bg-gradient-to-br from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo-600/30"
            >
              <i class="pi pi-send text-sm"></i>
            </button>
          </div>
        </div>

        <!-- Update Comment Modal (nested) -->
        <transition
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="commentStore.showUpdate"
            class="absolute inset-0 z-20 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div
              class="bg-[#0d1420] border border-white/10 rounded-3xl w-full shadow-2xl overflow-hidden animate-scaleIn"
            >
              <div class="flex items-center gap-3 px-5 pt-5 pb-3">
                <div
                  class="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0"
                >
                  <i class="pi pi-pencil text-sm"></i>
                </div>
                <h2 class="flex-1 text-base font-extrabold text-gray-100">
                  Update Comment
                </h2>
                <button
                  @click="commentStore.cancelUpdateCom"
                  class="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/15 border border-white/10 text-gray-500 hover:text-red-400 flex items-center justify-center text-xs transition-all"
                >
                  <i class="pi pi-times"></i>
                </button>
              </div>
              <div class="px-5 pb-4">
                <textarea
                  v-model="commentStore.updateMessage"
                  placeholder="Edit your comment"
                  rows="4"
                  class="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 px-4 text-gray-100 text-sm placeholder-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 transition-all resize-none"
                ></textarea>
              </div>
              <div
                class="flex justify-end gap-2 px-5 py-3 border-t border-white/[0.06]"
              >
                <button
                  @click="commentStore.cancelUpdateCom"
                  class="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-white/[0.06] border border-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  @click="commentStore.updateComment()"
                  class="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold hover:-translate-y-0.5 transition-all"
                >
                  <i class="pi pi-check text-xs"></i> Save
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
import { useCommentStore } from "@/stores/comment";
import { useDashboardStore } from "@/stores/dashboard";

const config = useRuntimeConfig();
const route = useRoute();
const dashboardStore = useDashboardStore();
const projectId = route.params.projectId;
const taskStore = useTaskStore();
const commentStore = useCommentStore();

onMounted(async () => {
  await taskStore.taskList(projectId);
  await dashboardStore.getData();
  await commentStore.commentList();
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
