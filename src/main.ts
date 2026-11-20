/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Styles
import 'unfonts.css'
import 'virtual:uno.css'
import './styles/main.scss'
import LoadingScreen from './pages/LoadingScreen.vue'
import TitleScreen from './pages/TitleScreen.vue'
import Test from './pages/Test.vue'
import BattleScreen from './pages/BattleScreen.vue'
import TeamSelector from './pages/TeamSelector.vue'
import CodexScreen from './pages/CodexScreen.vue'

const app = createApp(App)

registerPlugins(app)

app.component('Test', Test)
app.component('LoadingScreen', LoadingScreen)
app.component('TitleScreen', TitleScreen)
app.component('BattleScreen', BattleScreen)
app.component('TeamSelector', TeamSelector)
app.component('CodexScreen', CodexScreen)

app.mixin({
  mounted() {
    this.$emit?.('screen-mounted');
  }
})

app.mount('#app')
