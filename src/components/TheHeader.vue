<template lang="pug">
v-app-bar(color="primary")
  v-app-bar-title 番茄鐘
  v-spacer
  v-btn(icon="mdi-home" variant="tonal" to="/" class="mr-2")
  v-btn(icon="mdi-format-list-bulleted" variant="tonal" to="/list" class="mr-2")
  v-btn(icon="mdi-cog" variant="tonal" to="/settings" class="mr-2")
  v-btn(:icon="!notify ? 'mdi-bell' : 'mdi-bell-off'" variant="tonal" @click="toggleNotify")
</template>

<script setup>
import useSettingsStore from '@/stores/settings';
import { storeToRefs } from 'pinia';

const settings = useSettingsStore();
const { notify } = storeToRefs(settings);
const { toggleNotify } = settings;
</script>
