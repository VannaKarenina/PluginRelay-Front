// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
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
})
