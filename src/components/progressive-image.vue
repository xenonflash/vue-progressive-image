<template>
  <div class="wrapper" :style="`width: ${width}; height: ${height}`" :class="{'preview': !loaded}">
    <img
      ref="img"
      :src="preview"
      :data-src="large"
    />
  </div>
</template>
<script>
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

export default {
  name: "progressive-image",
  data() {
    return {
      loaded: false
    };
  },
  props: {
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
      default: "http://p55u3vy2u.bkt.clouddn.com/mp/kankan/p1461851991.webp"
    }
  },
  computed: {},
  beforeMount() {
    document.addEventListener(
      "scroll",
      debounce(this.handleLoad.bind(this), 300)
    );
  },
  mounted() {
    setTimeout(this.handleLoad.bind(this), 300);
  },
  methods: {
    handleLoad() {
      if (this.isInView() && !this.loaded) {
        requestAnimationFrame(() => {
          this.loadLargeImage().then(res => {
            this.loaded = true;
            document.removeEventListener("scroll", this.handleLoad.bind(this));
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


