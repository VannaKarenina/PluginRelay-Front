export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        login(token: any) {
            this.token = token;

        },
        logout() {
            this.token = null;
        },
    },
    persist: true
});
