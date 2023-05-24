import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
    const store = useAuthStore();

    if(!store.isAuthenticated) {
        return navigateTo('/');
    }

})
