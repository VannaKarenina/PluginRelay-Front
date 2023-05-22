import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token: any) {
            this.token = token
            // You can also save the token in a cookie or local storage for persistence
        },
        clearToken() {
            this.token = null
            // Clear the token from the cookie or local storage
        },
    },
})

