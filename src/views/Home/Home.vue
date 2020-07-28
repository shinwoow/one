<template>
  <div class="home" @click="handleClick">
    <el-card class="page-main-card" shadow="hover">
      <el-input type="textarea" placeholder="写点什么..." :rows="2" v-model="noteText"></el-input>
    </el-card>

    <el-card
      class="page-main-card page-main-note"
      shadow="hover"
      v-for="item in noteList"
      :key="item.id"
    >
      <div slot="header">{{ item.date }}</div>
      <div>{{ item.note }}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      noteText: "",
      noteList: [
        { id: 0, date: "2010.1.2", note: "what" },
        { id: 0, date: "2010.1.2", note: "what" },
        { id: 0, date: "2010.1.2", note: "what" },
        { id: 0, date: "2010.1.2", note: "what" }
      ]
    };
  },
  created () {
    console.time("1");
  },
  mounted () {
    console.timeEnd("1");
  },
  methods: {
    handleClick (e) {
      console.log(e.target);
    }
  }
};
</script>
<style lang="scss">
.page-main {
  height: 100%;
  .page-main-card {
    width: 80%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    &:focus {
    }
  }
  .page-main-note {
    margin-top: 20px;
  }
}
</style>
