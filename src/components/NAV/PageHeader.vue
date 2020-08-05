<template>
  <el-header class="page-header" height="38px">
    <div class="header-left">
      <div class="header-title">随笔</div>
      <div class="header-title">技术文档</div>
      <div class="header-title">日记</div>
    </div>
  </el-header>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style lang="scss">
.page-header {
  width: 100%;
  background: linear-gradient(
    to right,
    #eeb8c3 0%,
    #d276a3 20%,
    #ec7696 40%,
    #619ac3 60%,
    #7e1671 80%,
    #fff 100%
  );
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  .header-left {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .header-title {
      transition: ease-in 0.3s;
      color: rgba($color: #000000, $alpha: 0.85);
      position: relative;
      display: inline-block;
      padding: 0px 10px;
      cursor: pointer;
      &:hover {
        top: -4px;
        color: rgba($color: #fff, $alpha: 1);
      }
    }
  }
}
</style>
