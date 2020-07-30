<template>
  <div class="home" @click="handleSubmit">
    <el-card class="page-main-card" data-audio="0" shadow="hover">
      <template slot="header">
        <el-button type="danger" icon="el-icon-edit" size="small"
          >写完了</el-button
        >
      </template>
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
      @click="handleClick"
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

    function stopGuitar() {
      guitar.stop();
    }

    const context = new (window.AudioContext || window.webkitAudioContext)();

    const buffer = new Buffer(context, this.sounds);
    buffer.getBuffer();
    function playGuitar() {
      let index = parseInt(this.dataset.audio) + 0;
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
      message: `audio文件加载中...
      \n\r
      HAPPY DANCE！！！`
    });
    console.timeEnd("1");
  },
  methods: {
    handleClick(e) {
      console.log(e.target);
    },
    handleSubmit() {
      console.log("???");
      this.$api.notes.uploadNote({ params: "???" }).then(res => {
        console.log(res);
      });
      console.log("ok");
    }
  }
};
</script>
<style lang="scss">
$purple: #6477b9;

.page-main {
  height: 100%;
  .page-main-card {
    width: 70%;
    position: relative;
    left: 60%;
    transform: translateX(-50%);
    transition: 0.3s cubic-bezier(0.93, 1.86, 1, 1.62) transform;
    animation: linear-border 1s ease infinite;
    box-sizing: border-box;
    border: 0;

    &::before,
    &::after {
      box-sizing: inherit;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform-origin: center; // Ensure scaling is done from the center (expands outwards)
      border-image: -webkit-linear-gradient(#61649f, #9fa39a, #ffa60f) 1 10 1; /* 控制边框颜色渐变 */
      border-image: -moz-linear-gradient(#61649f, #9fa39a, #ffa60f) 1 10 1;
      border-image: linear-gradient(#61649f, #9fa39a, #ffa60f) 1 10 1; /* 标准的必须写在最后 */
    }
    // scale3d(<scale-horizontal>, <scale-vertical>, <scale-depth>);
    &::before {
      border-top: 2px solid;
      border-bottom: 2px solid;
      // border-image: -webkit-linear-gradient(#61649f, #9fa39a, #ffa60f) 1 10 1; /*
      transform: scale3d(0, 1, 1); // Shrink only width
    }

    &::after {
      border-right: 2px solid;
      border-left: 2px solid;
      transform: scale3d(1, 0, 1); // Shrink only height
    }

    &:hover::before,
    &:hover::after {
      transform: scale3d(1, 1, 1); // Show full-size
      transition: transform 0.5s;
    }

    &:hover {
      transform: translateX(-52%);
      // background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
    }
  }
  .page-main-note {
    margin-top: 20px;
  }
}
</style>
