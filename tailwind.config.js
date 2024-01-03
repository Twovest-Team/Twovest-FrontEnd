/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    borderRadius: {
      DEFAULT: '5px',
      full: '999px'
    },
    extend: {
      colors: {
        primary_main: '#05CE86',
        primary_dark: '#0BA06B',
        primary_light: '#D8F2E9',
        secondary: '#9E9E9E'
        error_main: '#E9414B',
        error_dark: '#C93B43',
        error_light: '#F7D6CF',
        warning_main: '#EB910A',
        warning_dark: '#CD7F09',
        warning_light: '#FBE9CE',
        info_main: '#0275D8',
        info_dark: '#08589C',
        info_light: '#CCE3F7',
        dark: '#000000',
        grey: '#CDCDCD',
        grey_opacity_50: '#CDCDCD80',
        white_opacity_50: '#FFFFFF80'
      },
      screens: {
        'xs': '330px'
      }
     
    },
  },

  plugins: [],
};
