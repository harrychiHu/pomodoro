<template lang="pug">
v-container.text-center.bgH#home
  v-row
    v-col.colLeft
      img(src="../assets/tomato.png")
      v-col.btnPlay(cols="12")
        v-btn.mx-16.b-btn(icon color="green" v-if="status !== 1" @click="startTimer")
          img(src='../assets/play.png')
          //- v-icon mdi-play
        v-btn.mx-16.b-btn(icon color="blue" v-else @click="pauseTimer")
          img(src='../assets/pause.png')
          //- v-icon mdi-pause
        v-btn.mx-16.b-btn(icon color="red" v-if="current.length > 0" @click="finishTimer(true)")
          img(src='../assets/skip-next.png')
          //- v-icon mdi-skip-next
    v-col.colRight
      v-col.tomatoList(cols="12")
        h1 {{ currentText }}
        h1 {{ timeText }}
      v-col.precautions(cols="12")
        h1 番茄鐘注意事項
          ul.precautionsList
            li 1. 別急著開始計時，先備妥計畫、做好計畫！
            li 2. 番茄鐘不可分割、不可暫停
            li 3. 休息很重要，番茄鐘不要「連走」

</template>

<style>
.bgH{
  background: #EFE7DA;
  display: flex;
  justify-content: space-around;
}
.colLeft{
  background: #EFE7DA;
  /* position: absolute;
  top: 10%;
  left: 50%;
  z-index: 1;
    transform: translate(-50%); */
}
.colRight{
  background: #EFE7DA;
  position: relative;

}
.tomatoList{
  color: #0E4749;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: white;
  border-radius: 10px
}

.precautions{
  color: #0E4749;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 10px
}

.precautionsList{
  text-align: left;
  font-size: 2rem;
  list-style: none;
}

.precautionsList li{
  margin: 2rem 0;
  border-bottom: 5px solid white;
}

.btnPlay{
  position: absolute;
  top: 65%;
  left: 30%;
  transform: translate(-50%,-50%);
}

.b-btn img{
  width: 150px;
}

</style>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'

const list = useListStore()
const { current, items, timeleft } = storeToRefs(list)
const { countdown, start, finish } = list

const settings = useSettingsStore()
const { selectedAlarmFile } = storeToRefs(settings)

const currentText = computed(() => {
  return current.value.length > 0 ? current.value : items.value.length > 0 ? '點擊開始' : '沒有事項'
})

const timeText = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})

let timer
// 0 = 停止
// 1 = 倒數中
// 2 = 暫停
const status = ref(0)

const pauseTimer = () => {
  status.value = 2
  clearInterval(timer)
}

const finishTimer = (skip) => {
  clearInterval(timer)
  status.value = 0
  finish()
  if (!skip) {
    const audio = new Audio()
    audio.src = selectedAlarmFile.value
    audio.play()
  }
  if (items.value.length > 0) {
    startTimer()
  }
}

const startTimer = () => {
  if (status.value === 0 && items.value.length > 0) {
    start()
  }
  if (current.value.length > 0) {
    status.value = 1
    timer = setInterval(() => {
      countdown()
      if (timeleft.value === 0) {
        finishTimer(false)
      }
    }, 1000)
  }
}

</script>
