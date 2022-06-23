module.exports ={
  content:['./src/**/*.{html,ts,js}'],
  darkMode: 'media', //off = class, on = media
  theme:{
    extend:{
      colors:{
        d:{
          1: 'var(--c-fl-brand-d-1)',
          2: 'var(--c-fl-brand-d-2)',
          3: 'var(--c-fl-brand-d-3)',
        },
        c: 'var(--c-fl-brand-c)',
        l:{
          1: 'var(--c-fl-brand-l-1)',
          2: 'var(--c-fl-brand-l-2)',
          3: 'var(--c-fl-brand-l-3)',
        },
        alert:{
          error: 'var(--c-fl-alert-error)',
          success: 'var(--c-fl-alert-success)',
          info: 'var(--c-fl-alert-info)',
          warning: 'var(--c-fl-alert-warning)',
        },
      },
    },
    screens:{
      sm: '320px',
      // => @media (min-width: 640px) { ... }
      md: '672px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1312px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1584px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins:[],
}
