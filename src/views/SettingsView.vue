<template lang="pug">
v-container.bgS
  v-container.imgMusic
    v-row#settings
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
            tr(v-for="alarm in alarms")
              td {{ alarm.name }}
              td
                audio(controls :src="alarm.file")
              td
                v-radio(v-model="selectedAlarm" :value="alarm.id")
</template>

<style>
  .bgS{
    background: #EFE7DA;
    color: #0E4749;
    height: 100vh;
  }
  .imgMusic{
    height: 100%;
    background: url("../assets/tomato_3.png") no-repeat 50% -100%;
  }
</style>

<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const settings = useSettingsStore()
const { selectedAlarm, alarms } = storeToRefs(settings)
</script>
