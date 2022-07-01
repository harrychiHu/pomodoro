import { defineStore } from 'pinia'

export const useSettingsStore = defineStore({
  id: 'settings',
  state () {
    return {
      selectedAlarm: 1,
      alarms: [
        { id: 1, name: 'Chu Desu!', file: new URL('../assets/CHUNNYT - Chu Desu!.mp3', import.meta.url).href },
        { id: 2, name: 'Piu Piu Piu', file: new URL('../assets/Piu Piu Piu .mp3', import.meta.url).href }
      ]
    }
  },
  getters: {
    selectedAlarmFile () {
      const idx = this.alarms.findIndex(a => a.id === this.selectedAlarm)
      return this.alarms[idx].file
    }
  }
  // persist: {
  //   key: 'pomodoro-settings',
  //   paths: ['selectedAlarm']
  // }
})
