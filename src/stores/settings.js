import { defineStore } from 'pinia';

const useSettingsStore = defineStore({
  id: 'settings',
  state() {
    return {
      alarms: [
        {
          id: 1,
          name: 'Alarm',
          file: new URL('@/assets/alarm.mp3', import.meta.url).href,
        },
        {
          id: 2,
          name: 'Yay',
          file: new URL('@/assets/yay.mp3', import.meta.url).href,
        },
      ],
      selectedAlarm: 1,
      notify: false,
    };
  },
  actions: {
    // 通知
    async toggleNotify() {
      if (!this.notify && 'Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          this.notify = true;
        }
      } else {
        this.notify = false;
      }
    },
  },
  getters: {
    selectedAlarmFile() {
      const index = this.alarms.findIndex((obj) => obj.id === this.selectedAlarm);
      return this.alarms[index].file;
    },
  },
  persist: {
    key: 'pomodoro-settings',
    paths: ['selectedAlarm', 'notify'],
  },
});

export default useSettingsStore;
