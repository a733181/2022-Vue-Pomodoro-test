/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "@/plugins/pinia";
import router from "@/plugins/router";

export function registerPlugins(app) {
  loadFonts();
  app.use(pinia);
  app.use(router);
  app.use(vuetify);
}
