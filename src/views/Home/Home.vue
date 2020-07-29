<template>
  <div class="home" @click="handleClick">
    <el-card class="page-main-card" data-audio="0" shadow="hover">
      <el-input
        type="textarea"
        placeholder="写点什么..."
        :rows="2"
        v-model="noteText"
      ></el-input>
    </el-card>

    <el-card
      class="page-main-card page-main-note"
      shadow="hover"
      v-for="item in noteList"
      :key="item.id"
      :data-audio="item.id + 1"
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
        { id: 1, date: "2010.1.2", note: "what" },
        { id: 2, date: "2010.1.2", note: "what" },
        { id: 3, date: "2010.1.2", note: "what" }
      ],
      sounds: [
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G4.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A4.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C5.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D5.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/E5.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G5.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A5.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C6.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D6.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D%236.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/E6.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G6.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A6.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C7.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D7.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G4.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A4.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C5.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D5.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_E5.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G5.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A5.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C6.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D6.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D%236.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_E6.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G6.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A6.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C7.mp3",
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D7.mp3"
      ]
    };
  },
  created() {
    console.time("1");
  },
  mounted() {
    let _this = this;
    class Guitar {
      constructor(context, buffer) {
        this.context = context;
        this.buffer = buffer;
      }

      setup() {
        this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);

        this.gainNode.gain.setValueAtTime(0.8, this.context.currentTime);
      }

      play() {
        this.setup();
        this.source.start(this.context.currentTime);
      }

      stop() {
        var ct = this.context.currentTime + 0.5;
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, ct);
        this.source.stop(ct);
      }
    }

    class Buffer {
      constructor(context, urls) {
        this.context = context;
        this.urls = urls;
        this.buffer = [];
      }

      loadSound(url, index) {
        let request = new XMLHttpRequest();
        request.open("get", url, true);
        request.responseType = "arraybuffer";
        let thisBuffer = this;
        request.onload = function() {
          // Safari doesn't support promise based syntax
          thisBuffer.context.decodeAudioData(request.response, function(
            buffer
          ) {
            thisBuffer.buffer[index] = buffer;
          });
        };
        request.send();
      }

      getBuffer() {
        this.urls.forEach((url, index) => {
          this.loadSound(url, index);
        });
      }

      getSound(index) {
        return this.buffer[index];
      }
    }
    let guitar = null;
    let preset = 0;
    let loaded = false;

    function stopGuitar() {
      guitar.stop();
    }

    let context = new (window.AudioContext || window.webkitAudioContext)();

    let buffer = new Buffer(context, this.sounds);
    buffer.getBuffer();
    function playGuitar() {
      let index = parseInt(this.dataset.audio) + preset;
      index = index % (_this.sounds.length - 1);
      guitar = new Guitar(context, buffer.getSound(index));
      guitar.play();
    }
    let audioCard = document.querySelectorAll(".page-main-card");
    audioCard.forEach(button => {
      button.addEventListener("mouseenter", playGuitar.bind(button));
      button.addEventListener("mouseleave", stopGuitar);
    });
    this.$message({
      type: "success",
      message: "HAPPY DANCE！！！"
    });
    console.timeEnd("1");
  },
  methods: {
    handleClick(e) {
      console.log(e.target);
    }
  }
};
</script>
<style lang="scss">
.page-main {
  height: 100%;
  .page-main-card {
    width: 70%;
    position: relative;
    left: 60%;
    transform: translateX(-50%);
    transition: 0.3s ease transform;
    animation: linear-border 1s ease infinite;
    // background会覆盖el-card的样式
    // background: linear-gradient(0, #108b96 2px, #108b96 2px) no-repeat,
    //   linear-gradient(-90deg, #108b96 2px, #108b96 2px) no-repeat,
    //   linear-gradient(-180deg, #108b96 2px, #108b96 2px) no-repeat,
    //   linear-gradient(-270deg, #108b96 2px, #108b96 2px) no-repeat;
    // background-size: 0 2px, 2px 0, 0 2px, 2px 0;
    // background-position: left top, right top, right bottom, left bottom;
    &:hover {
      transform: translateX(-52%);
      // background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
    }
    // @keyframes linear-border {
    //   background: ;
    // }
  }
  .page-main-note {
    margin-top: 20px;
  }
}
</style>
