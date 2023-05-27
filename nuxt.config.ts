// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    ssr: true,
    css: [
        '~/assets/styles/main.css',
        'vuetify/lib/styles/main.sass',
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
    nitro: {
        compressPublicAssets: true,
    },
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate'],
            }
        ],
        '@pinia-plugin-persistedstate/nuxt',
    ],
    imports: {
        dirs: ['stores'],
    },
})
