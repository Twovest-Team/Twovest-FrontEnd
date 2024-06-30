/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    fontSize: {
      'caption': '13.33px',
      'base': '1rem',
      'h1': ['47.78px', {
        fontWeight: '600'
      }],
      'h2': ['39.18px', {
        fontWeight: '600'
      }],
      'h3': ['33.18px', {
        fontWeight: '600'
      }],
      'h4': ['27.65px', {
        fontWeight: '600'
      }],
      'h5': ['23.04px', {
        fontWeight: '600'
      }],
      'h6': ['19.2px', {
        fontWeight: '600'
      }],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      screens: {
        xl: '1440px'
      },
      center: true,
      padding: {
        DEFAULT: '24px'
      }
    },
    borderRadius: {
      DEFAULT: '5px',
      full: '999px'
    },
    extend: {
      minHeight: {
        screen: 'calc(100vh - 75px)'
      },
      height: {
        screen: 'calc(100vh - 75px)',
        dvh: 'calc(100dvh - 75px)',
        svh: 'calc(100svh - 75px)'
      },
      colors: {
        primary_main: '#05CE86',
        primary_dark: '#0BA06B',
        primary_light: '#D8F2E9',
        secondary: '#757575',
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
        grey_opacity_50: '#F1F1F1',
        white_opacity_50: '#FFFFFF80',
        dark_gray: '#484848'
      },
      screens: {
        'small': { 'raw': '(min-height: 520px)' },
        'average': { 'raw': '(min-height: 690px)' },
        'tall': { 'raw': '(min-height: 780px)' }
      }

    },
  },

  plugins: [],
};
