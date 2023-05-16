// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    ssr: true,
    css: [
        '~/assets/styles/main.css',
        'vuetify/lib/styles/main.sass'
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
})
