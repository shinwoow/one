<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
html, body{
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #d1c2d3;
}
</style>
