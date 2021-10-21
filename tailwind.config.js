module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts'],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        container: {
          gray: {
            1: 'var(--c-container-gray-01)',
            2: 'var(--c-container-gray-02)',
            3: 'var(--c-container-gray-03)'
          },
          alert: {
            error: 'var(--c-container-alert-error)',
            success: 'var(--c-container-alert-success)',
            info: 'var(--c-container-alert-info)',
            warning: 'var(--c-container-alert-warning)'
          },
          blue: {
            1: 'var(--c-container-blue-01)',
            2: 'var(--c-container-blue-02)',
            3: 'var(--c-container-blue-03)',
            4: 'var(--c-container-blue-04)',
            5: 'var(--c-container-blue-05)',
            6: 'var(--c-container-blue-06)'
          }
        },
        outline: {
          gray: {
            1: 'var(--c-outline-gray-01)',
            2: 'var(--c-outline-gray-02)',
            3: 'var(--c-outline-gray-03)',
            4: 'var(--c-outline-gray-04)'
          },
          alert: {
            error: 'var(--c-outline-alert-error)',
            success: 'var(--c-outline-alert-success)',
            info: 'var(--c-outline-alert-info)',
            warning: 'var(--c-outline-alert-warning)'
          },
          blue: {
            1: 'var(--c-outline-blue-01)',
            2: 'var(--c-outline-blue-02)',
            3: 'var(--c-outline-blue-03)',
            4: 'var(--c-outline-blue-04)'
          }
        },
        ui: 'var(--c-ui-background)',
        white: 'var(--white)',
        black: 'var(--black)',

      },
      opacity: ['disabled'],
      outline: {
        gray_70: '2px solid #525252',
        gray_30: '2px solid #C6C6C6'
      }
    },
    fontFamily: {
      'rubik': ['Rubik'],
      'inter': ['Inter']
    },
    screens: {
      'sm': '320px',
      'md': '672px',
      'lg': '1056px',
      'xl': '1312px',
      '2xl': '1584px',
    },
  },
  variants: {
    extend:{
      textAlign: ['hover', 'focus'],
      pointerEvents: ['hover', 'focus']
    }
  },

  plugins: [],
};
