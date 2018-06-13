<template>
  <div class="wrapper" style="width: 200px; height: 300px">
    <img
      ref="img"
      :src="preview"
      :data-src="large"
      :class="{'preview': !loaded}"
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
      default: "100%"
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
    setTimeout(this.handleLoad.bind(this), 300)
  },
  methods: {
    handleLoad() {
      if (this.isInView() && !this.loaded) {
        this.loadLargeImage().then(res => {
          console.log("loadedLargeImage");
          this.loaded = true;
          document.removeEventListener('scroll', this.handleLoad.bind(this));
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
        let img = this.$refs.img
        img.onload = resolve;
        img.src = img.dataset.src;
      });
    }
  }
};
</script>
<style scoped>
.wrapper{
  display: inline-block
}
img{
  width: 100%;
  height: 100%;
  transition: all 500ms;
  filter: blur(0)
}
.preview {
  filter: blur(10px);
}
</style>


