/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

// PWA
import { registerSW } from 'virtual:pwa-register';

const app = createApp(App);

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

registerPlugins(app);
app.mount('#app');
