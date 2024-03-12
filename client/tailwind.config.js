/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html/'],
  theme: {
    screens: {
      xs: { min: '320px', max: '639px' },
      // => @media (min-width: 320px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }
      mdcus: { min: '768px', max: '1023px' },
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lgcus: { min: '1024px', max: '1279px' },
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      main: ['Quicksand', 'sans-serif'],
      logo: ['Grand Hotel', 'cursive'],
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      width: {
        main: '1220px',
      },
      gridTemplateRows: {
        10: 'repeat(10, minmax(0, 1fr))',
        layout: '200px minmax(900px, 1fr) 100px',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
      },
      backgroundColor: {
        main: '#FFA603',
        overlay: 'rgba(0,0,0,0.7)',
      },
      colors: {
        main: '#FFA603',
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%',
        7: '7 7 0%',
        8: '8 8 0%',
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(20px);',
            transform: 'translateY(20px);',
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);',
          },
        },
        'slide-top-sm': {
          '0%': {
            '-webkit-transform': 'translateY(8px);',
            transform: 'translateY(8px);',
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);',
          },
        },
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-top-sm': 'slide-top-sm 0.2s linear both;',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')({ strategy: 'class' })],
};
