/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      width: {
        '550': '550px',
        '222': '90px',
        '551': '650px',
        '552': '550px'
      },
      height: {
        '550': '550px',
        '552': '400px',
        '222': '90px',
        '551': '650px',
        '145': '145px',
        '553': '570px'
      }
    },
  },
  plugins: [],
  prefix: 'tw-',
}
