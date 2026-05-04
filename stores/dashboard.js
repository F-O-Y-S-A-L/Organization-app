import { defineStore } from "pinia";

export const useDashboardStore = defineStore('user', {
   state: () => ({
      userData: { name: '', email: '', photo: '' },
      NotifiMessageDashbaord: '',
      showNotifiDashboard: false,
      selectedPhoto: null
   }),
   getters: {
      photoUrl: (state) => {
         return state.userData.photo || null
      },
   },
   actions: {
      setPhoto(file) {
         this.selectedPhoto = file
      },

      async getData() {
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/users/me`, {
               credentials: "include",
            });
            this.userData = res.data.User;

            const { $socket } = useNuxtApp();
            if ($socket?.connected && this.userData?._id) {
               $socket.emit("join", this.userData._id);
            } else {
               $socket.once('connect', () => {
                  $socket.emit("join", this.userData._id);
               })
            }
         } catch (error) {
            console.log("Error:", error);
         }
      },
      async updateUserInfo() {
         const formData = new FormData()
         formData.append('name', this.userData.name)
         formData.append('email', this.userData.email)
         if (this.selectedPhoto) {
            formData.append('photo', this.selectedPhoto)
         }
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/users/updateMe`, {
               method: 'PATCH',
               credentials: 'include',
               body: formData
            })
            this.userData = res.data.updatedUser
            this.selectedPhoto = null
         } catch (error) {
            console.log('Error:', error);
            this.showNotifiDashboard = true
            this.NotifiMessageDashbaord = 'Updated settings failed ❌'
            setTimeout(() => {
               this.showNotifiDashboard = false
            }, 2500);
         }
      },
   }
})