<template>
  <div id="app">
    <router-view class="content"/>
  </div>
</template>

<script>


</script>

<style lang="less">
@import "./assets/style/common";


// global setting for the fonts
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f6f6f6;
  min-height: 100vh;
  padding-bottom: 50px;
}
</style>

