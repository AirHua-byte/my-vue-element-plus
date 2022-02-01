<template>
  <m-calendar
    :options="options"
  ></m-calendar>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    let options = ref<any>(null)
    options = {
      selectable: true,
      locale: 'zh-cn',
      headerToolbar: {
        start: 'title', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: 'today prevYear,prev,next,nextYear'
      },
      dateClick: function(info: any) {
        /* alert('Clicked on: ' + info.dateStr);
        alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        alert('Current view: ' + info.view.type);
        // change the day's background color just for fun
        info.dayEl.style.backgroundColor = 'red'; */
      },
      events: [
        { // this object will be "parsed" into an Event Object
          title: 'The Title', // a property!
          start: '2022-01-31', // a property!
          end: '2022-01-31', // a property! ** see important note below about 'end' **
          editable: true
        }
      ],
      eventContent: () => {
        return 'test'
      }
    }

    return {
      options
    }
  }
})
</script>

<style lang="scss" scoped>

</style>