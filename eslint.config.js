import vuetify from 'eslint-config-vuetify'

export default [
  vuetify({
    ts: true,
  }),
  {
    files: ['**/*.vue'],
    rules: {
      'vue/script-indent': 'off',
    },
  },
]
