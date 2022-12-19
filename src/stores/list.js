import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

const setTime = parseInt(import.meta.env.VITE_TIME);
const setTimeBreak = parseInt(import.meta.env.VITE_TIME_BREAK);

const useListStore = defineStore({
  id: 'list',
  state() {
    return {
      items: [],
      finishedItems: [],
      currentItem: '',
      id: 1,
      break: false,
      timeleft: setTime,
    };
  },
  // 這裡放所有修改 state 的 function
  actions: {
    addItem(value) {
      // 用 this. 指向 state
      this.items.push({
        id: this.id++,
        value,
        edit: false,
        model: value,
      });
    },
    editItem(id) {
      const index = this.findIndexById(id);
      this.items[index].edit = true;
    },
    deleteItem(id) {
      const index = this.findIndexById(id);
      this.items.splice(index, 1);
    },
    undoEditItem(id) {
      const index = this.findIndexById(id);
      this.items[index].model = this.items[index].value;
      this.items[index].edit = false;
    },
    confirmEditItem(id) {
      const index = this.findIndexById(id);
      this.items[index].value = this.items[index].model;
      this.items[index].edit = false;
    },
    findIndexById(id) {
      return this.items.findIndex((obj) => obj.id === id);
    },
    start() {
      this.currentItem = this.break ? '休息一下' : this.items.shift().value;
    },
    countDown() {
      this.timeleft--;
    },
    finish() {
      if (!this.break) {
        this.finishedItems.push({
          value: this.currentItem,
          id: this.id++,
        });
      }
      this.currentItem = '';
      if (this.items.length > 0) {
        this.break = !this.break;
      }
      this.timeleft = this.break ? setTimeBreak : setTime;
    },
    deleteFinishedItem(id) {
      const index = this.finishedItems.findIndex((obj) => obj.id === id);
      this.finishedItems.splice(index, 1);
    },
  },
  persist: {
    key: 'pomodoro-list',
  },
});

export default useListStore;
