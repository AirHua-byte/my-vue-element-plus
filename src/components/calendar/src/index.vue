<template>
  <FullCalendar ref="calendar" :options="calendarOptions" />
</template>

<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { EventItem } from './types'

export default defineComponent({
  components: {
    FullCalendar,
  },
  props: {
    selectable: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: String,
      default: 'zh-cn',
    },
    headerToolbar: {
      type: Object,
    },
    dateClick: {
      type: Function,
    },
    events: {
      type: Array as PropType<EventItem[]>,
    },
    eventContent: {
      type: Function,
    },
  },
  setup(props) {
    let calendarOptions = ref<any>(null)
    calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      selectable: props.selectable,
      locale: props.locale,
      headerToolbar: props.headerToolbar,
      dateClick: props.dateClick,
      events: props.events,
      eventContent: props.eventContent,
    }

    return {
      calendarOptions,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>