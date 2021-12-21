<template>
  <div class="movie">
    <HeaderTitle
      title="电影"
      v-show="headerTitle"
    ></HeaderTitle>
    <MovieSwiper ref="movieswiper"></MovieSwiper>
    <MovieHeader :class="headerIsFixed?'fixed':''"></MovieHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle/index.vue' // 头部标题
import MovieSwiper from '@/views/Movie/MovieSwiper.vue' // 轮播
import MovieHeader from '@/views/Movie/MovieHeader.vue' // 导航层
export default {
  components: { MovieSwiper, MovieHeader, HeaderTitle },
  data () {
    return {
      headerIsFixed: false,
      headerTitle: false
    }
  },
  methods: {
    handleOnScroll () {
      // 滑动距离 > 轮播图距离 --> 头部导航固定
      const MoveDis = document.documentElement.scrollTop // 滑动距离
      const SwiperHeight = this.$refs.movieswiper.$el.offsetHeight // 轮播图高度
      if (MoveDis >= SwiperHeight) {
        this.headerIsFixed = true
        this.headerTitle = true
      } else {
        this.headerIsFixed = false
        this.headerTitle = false
      }
    }
  },
  mounted () {
    window.onscroll = this.handleOnScroll
  },
  destroyed () {
    window.onscroll = null
  }
}
</script>

<style>
/* .movie {
  width: 100%;
  height: 100%;
} */
</style>
