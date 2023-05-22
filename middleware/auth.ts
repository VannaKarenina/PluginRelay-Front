import { useAuthStore } from '@/store/auth'

export default function ({ req, redirect }: { req: any, redirect: any } ) {
    const authStore = useAuthStore()

    // Check if the token exists in the cookie or local storage
    if (process.server) {
        const token = req.headers.cookie?.split('; ').find((row: any) => row.startsWith('token='))
        if (token) {
            const parsedToken = token.split('=')[1]
            authStore.setToken(parsedToken)
        }
    }

    // If the user is not authenticated, redirect to the login page
    if (!authStore.isAuthenticated) {
        return redirect('/')
    }
}
