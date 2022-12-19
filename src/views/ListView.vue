<template lang="pug">
v-row
  v-col(cols="12")
    h1.text-center 待辦事項
    h2.text-center 未完成
  v-col(cols="12")
    v-text-field(label="新增事項"  variant="outlined" :rules="[rules.required,rules.length]" ref="inputField"
    @keydown.enter="onInputSubmit")
      template(#append)
        v-btn(icon="mdi-plus" variant="text" @click="onInputSubmit")
    v-table
      thead
        tr
          th 名稱
          th 操作
      tbody
        tr(v-if="items.length === 0")
          td(colspan="2").text-center 沒有事項
        tr(v-for="item in items" :key="item.id")
          td
            v-text-field(v-if="item.edit" v-model="item.model" :rules="[rules.required,rules.length]" autofocus)
            span(v-else) {{ item.value }}
          td
            span(v-if="item.edit")
              v-btn(icon="mdi-check" variant="text" color="green" @click="confirmEditItem(item.id)")
              v-btn(icon="mdi-undo" variant="text" color="red" @click="undoEditItem(item.id)")
            span(v-else)
              v-btn(icon="mdi-pencil" variant="text" color="green" @click="editItem(item.id)")
              v-btn(icon="mdi-delete" variant="text" color="red" @click="deleteItem(item.id)")
  v-divider(class="my-5")
  v-col(cols="12")
    h2.text-center 已完成
  v-col(cols="12")
    v-table
      thead
        tr
          th 名稱
          th 操作
      tbody
        tr(v-if="finishedItems.length === 0")
          td(colspan="2").text-center 沒有事項
        tr(v-for="item in finishedItems" :key="item.id")
          td {{ item.value }}
          td
            v-btn(icon="mdi-delete" variant="text" color="red" @click="deleteFinishedItem(item.id)")
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import useListStore from '@/stores/list';

const list = useListStore();
const { addItem, editItem, deleteItem, undoEditItem, confirmEditItem, deleteFinishedItem } = list;
const { items, finishedItems } = storeToRefs(list);

const inputField = ref(null);
const editInput = ref([]);

const rules = {
  required(v) {
    return !!v || '欄位必填';
  },
  length(v) {
    return v.length >= 3 || '必須是三個字以上';
  },
};

const onInputSubmit = async () => {
  const valid = await inputField.value.validate();
  if (valid.length > 0) return;
  const { value } = inputField.value;
  addItem(value);
  inputField.value.$el.querySelector('input').blur();
  inputField.value.reset();
};
</script>
