<script setup lang="ts">
import mockLight from "~/assets/model/trafficlight.mp4";
</script>

<template>
  <!-- play video -->
  <video type="video/mp4" muted autoplay loop class="mx-auto">
    <source :src="mockLight" type="video/mp4">
  </video>
</template>

<style scoped lang="scss"></style>
