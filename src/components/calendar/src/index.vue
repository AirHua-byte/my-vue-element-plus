<template>
  <FullCalendar ref="calendar" :options="calendarOptions" />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default defineComponent({
  components: {
    FullCalendar
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    let calendarOptions = ref<any>(null)
    let calendar = ref<any>(null)
    calendarOptions = {
      plugins: [ dayGridPlugin, interactionPlugin ],
      initialView: 'dayGridMonth',
      selectable: props.options.selectable,
      locale: props.options.locale,
      headerToolbar: props.options.headerToolbar,
      dateClick: props.options.dateClick,
      events: props.options.events,
      eventContent: props.options.eventContent
    }

    console.log(calendar);
    return {
      calendarOptions,
      calendar
    }
  }
})
</script>

<style lang="scss" scoped>

</style>