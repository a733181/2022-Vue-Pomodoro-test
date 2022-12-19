<template lang="pug">
v-row
  v-col(cols="12")
    h1 {{ currentText }}
    h2 {{ timeText }}
  v-col(cols="12")
    v-btn(icon="mdi-play" variant="text" v-if="status !== 1 " @click="startTimer")
    v-btn(icon="mdi-pause" variant="text" v-else @click="pauseTimer")
    v-btn(icon="mdi-skip-next" variant="text" v-if="currentItem.length > 0" @click="finishedTimer('skip')")
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import useListStore from '@/stores/list';
import useSettingsStore from '@/stores/settings';

const list = useListStore();
const { currentItem, items, timeleft } = storeToRefs(list);
const { start, countDown, finish } = list;

const settings = useSettingsStore();
const { selectedAlarmFile, notify } = storeToRefs(settings);

// 0停止,1倒數,2暫停
const status = ref(0);

let timer = 0;

const startTimer = () => {
  if (status.value === 0 && items.value.length > 0) {
    start();
  }
  if (currentItem.value.length > 0) {
    status.value = 1;
    timer = setInterval(() => {
      countDown();
      if (timeleft.value === 0) {
        finishedTimer();
      }
    }, 1000);
  }
};

const pauseTimer = () => {
  status.value = 2;
  clearInterval(timer);
};

const finishedTimer = (skip) => {
  clearInterval(timer);
  status.value = 0;
  if (!skip) {
    const audio = new Audio();
    audio.src = selectedAlarmFile.value;
    audio.play();
  }
  if (notify.value) {
    new Notification('事項完成', {
      body: currentText.value,
      icon: 'https://cdn-icons-png.flaticon.com/512/2693/2693146.png',
    });
  }
  finish();
  startTimer();
};

const currentText = computed(() => {
  return currentItem.value.length > 0
    ? currentItem.value
    : items.value.length > 0
    ? '點時開始'
    : '沒有待辦事項';
});

const timeText = computed(() => {
  const min = Math.floor(timeleft.value / 60)
    .toString()
    .padStart(2, 0);
  const sec = (timeleft.value % 60).toString().padStart(2, 0);

  return min + ':' + sec;
});
</script>
