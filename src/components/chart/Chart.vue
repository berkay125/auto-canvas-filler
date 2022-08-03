<template>

<canvas ref="myCanvas" :width="w" :height="h"></canvas>

</template>



<script lang="ts">
import { defineComponent } from "vue";
import Chart from "./Chart";

export default defineComponent(Chart);


</script>


<style>
@import "Chart.scss";
</style>