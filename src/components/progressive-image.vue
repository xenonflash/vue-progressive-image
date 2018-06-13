<template>
  <img :src="preview" :data-src="large" :class="{'preview': !loaded}"/>
</template>
<script>
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

export default {
  name: "progressive-image",
  data() {
    return {
      loaded: false
    };
  },
  props: {
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
    document.addEventListener("scroll", debounce(this.handleLoad.bind(this), 300));
  },
  mounted() {
    this.handleLoad();
  },
  methods: {
    handleLoad() {
      if (this.isInView() && !this.loaded) {
        this.loadLargeImage().then(res => {
          console.log("loadedLargeImage");
          this.loaded = true;
          document.removeEventListener(this.handleLoad.bind(this))
        });
      }
    },
    isInView() {
      if (!this.$el) return false;
      const scrollY = window.scrollY;
      const wH = window.innerHeight;
      const {
        top,
        bottom,
      } = this.$el.getBoundingClientRect();
      return top < wH && bottom > 0;
    },
    loadLargeImage() {
      return new Promise((resolve, reject) => {
        this.$el.onload = resolve;
        this.$el.src = this.$el.dataset.src;
      });
    }
  },
  watch: {}
};
</script>
<style scoped>
img {
  width: 200px;
  height: 400px;
}
.preview{
  filter: blur(10px)
}
</style>


