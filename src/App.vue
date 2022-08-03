<template>
  <Chart :chart="chart" w="200" h="200"/>
</template>





<script>
import Chart from './components/chart/Chart.vue'
import {ref} from "vue";
export default {
  components:{
    Chart
  },
  setup(){
    const chart = ref([{
      type: 'line',
      list: [25,76,45,86,25,31,85,30],
      color: '#FF0000'
    },{
      type: 'bar',
      list: [31,72,34,53,10],
      color: '#FF0000'
    },{
      type: 'line',
      list: [64,23,54,12,100,12],
      color: '#FF0000'
    }])

    return {chart}
  }
}
</script>

<style>

body{
  background-color: white !important;
  display: block;
}
</style>