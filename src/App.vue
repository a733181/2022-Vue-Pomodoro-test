<template lang="pug">
V-app
  Header
  v-main
    v-container
      RouterView(v-slot="{ Component }")
        KeepAlive(include="HomeView")
          component(:is="Component")
</template>

<script setup>
import Header from '@/components/TheHeader.vue';
</script>
