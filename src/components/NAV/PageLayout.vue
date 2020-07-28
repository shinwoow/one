<template>
  <div class="home">
    <el-container direction="vertical">
      <page-header></page-header>
      <el-container>
        <el-main class="page-main">
          <router-view></router-view>
        </el-main>
        <page-aside></page-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import PageHeader from "@/components/NAV/PageHeader.vue";
import PageAside from "@/components/NAV/PageAside.vue";

export default {
  name: "Home",
  components: {
    PageHeader,
    PageAside
  }
};
</script>
<style lang="scss">
.home {
  .page-main {
    .page-main-card {
      width: 80%;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
