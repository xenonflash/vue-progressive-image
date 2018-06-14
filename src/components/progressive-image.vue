<template>
  <div class="wrapper" :style="`width: ${width}; height: ${height}`" :class="{'preview': !loaded}">
    <img
      ref="img"
      :src="previewImageSrc"
      :data-src="large"
    />
  </div>
</template>
<script>
import debounce from "lodash/debounce";

export default {
  name: "progressive-image",
  data() {
    return {
      loaded: false,
      handlerRef: null, // cache handle reference, when loaded, will remove scroll event listener by this reference
    };
  },
  props: {
    /**
     * 如果是七牛资源可以 通过query命令获取预览图
     */
    useQiniuApi: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "auto"
    },
    large: {
      type: String,
      default: "about:blank"
    },
    preview: {
      type: String,
      default: require('../assets/blur.jpg')
    },
    debounceDelay: {
      type: Number,
      defauflt: 300
    }
  },
  computed: {
    previewImageSrc() {
      if (this.useQiniuApi) {
        return this.large + "?imageView2/3/w/42/h/42"
      } else {
        return this.preview
      }
    },
  },
  beforeMount() {
    this.handler = debounce(this.handleLoad.bind(this), this.debounceDelay)
    document.addEventListener(
      "scroll",
      this.handler
    );
  },
  mounted() {
    setTimeout(this.handleLoad.bind(this), this.debounceDelay);
  },
  methods: {
    handleLoad(callee, e) {
      if (this.isInView() && !this.loaded) {
        requestAnimationFrame(() => {
          this.loaded = true;
          this.loadLargeImage().then(res => {
            document.removeEventListener("scroll", this.handler);
          });
        });
      }
    },
    isInView() {
      if (!this.$el) return false;
      const scrollY = window.scrollY;
      const wH = window.innerHeight;
      const { top, bottom } = this.$el.getBoundingClientRect();
      return top < wH && bottom > 0;
    },
    loadLargeImage() {
      return new Promise((resolve, reject) => {
        let img = this.$refs.img;
        img.onload = resolve;
        img.src = img.dataset.src;
      });
    }
  }
};
</script>
<style scoped>
.wrapper {
  display: inline-block;
  overflow: hidden;
}
/* 给wrapper设定固定blur, 防止 image blur值太大导致影响周围内容 */
.wrapper.preview{
  filter: blur(4px)
}
img {
  width: 100%;
  height: 100%;
  transition: all 700ms;
  filter: blur(0);
}
.preview img{
  filter: blur(30px);
}
</style>


