<template lang="pug">
v-row
  v-col(cols="12")
    h1.text-center 設定
  v-col(cols="12")
    v-table
      thead
        tr
          th 名稱
          th 試聽
          th 選擇
      tbody
        tr(v-for="voice in alarms" :key="voice.id")
          td {{ voice.name }}
          td
            audio(:src="voice.file" controls)
          td
            v-radio-group(v-model="selectedAlarm")
              v-radio(:value="voice.id")
</template>

<script setup>
import useSettingsStore from '@/stores/settings';
// 解構
import { storeToRefs } from 'pinia';

const settings = useSettingsStore();
const { alarms, selectedAlarm } = storeToRefs(settings);
</script>
