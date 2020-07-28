<template>
  <el-aside width="200px" class="el-aside">
    <div class="aside-menu">
      <!-- <el-collapse>
        <el-collapse-item></el-collapse-item>
      </el-collapse>-->
      <div class="menu-cell" v-for="item in dateList" :key="item.id">{{item.title}}</div>
      <div class="menu-cell" v-for="item in dateList" :key="item.id">{{item.title}}</div>
      <div class="menu-cell" v-for="item in dateList" :key="item.id">{{item.title}}</div>
    </div>
  </el-aside>
</template>
<script lang="ts">
export default {
  name: "PageAside",
  components: {},
  data() {
    return {
      dateList: [
        { id: 0, title: "2020年1月" },
        { id: 1, title: "2020年2月" },
        { id: 2, title: "2020年3月" },
        { id: 3, title: "2020年4月" },
        { id: 3, title: "2020年4月" },
        { id: 3, title: "2020年4月" },
        { id: 3, title: "2020年4月" },
        { id: 3, title: "2020年4月" },
        { id: 3, title: "2020年4月" },
        { id: 3, title: "2020年4月" }
      ]
    };
  }
};
</script>
<style lang="scss">
.el-aside {
  height: calc(100vh - 38px);
  overflow: hidden;
  .aside-menu {
    padding: 20px;
    height: calc(100% - 138px);
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.15);
    font-size: 14px;
    color: rgba($color: #000000, $alpha: .85);
    &::-webkit-scrollbar {
      display: none;
    }
    overflow: auto;
    .menu-cell {
      padding: 8px 0;
      cursor: pointer;
      &:hover {
        color: salmon;
      }
    }
  }
}
</style>
