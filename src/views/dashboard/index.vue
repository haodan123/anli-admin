<template>
   <div class="dashboard-editor-container">
      <PanelGroup></PanelGroup>
   </div>
</template>

<script setup>
import PanelGroup from "./components/PanelGroup.vue"

</script>

<style scoped lang="less">
   .dashboard-editor-container {
      padding: 32px;
      background-color: #f2f7ff;
      position: relative;
      height: 100%;
   }
</style>