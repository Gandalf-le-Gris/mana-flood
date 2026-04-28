/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '../styles/layers.css'
import 'vuetify/styles'
import { mtg } from '@/icons/icons'
import { mdi } from 'vuetify/iconsets/mdi'

const theme = {
  dark: true,
  colors: {
    C: '#6a8691',
    W: '#b6a677',
    U: '#186d9a',
    B: '#3b3732',
    R: '#be3523',
    G: '#137047',
    WUBRG: '#af995e',
    'C-light': '#dce4e7',
    'W-light': '#ebe7db',
    'U-light': '#bbd7eb',
    'B-light': '#afa8a8',
    'R-light': '#f2c5b2',
    'G-light': '#d0e0d6',
    'WUBRG-light': '#f2ecd6'
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'theme',
    themes: {
      theme
    }
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mtg,
      mdi
    }
  }
})
