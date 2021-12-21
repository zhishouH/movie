<template>
  <van-swipe
    :autoplay="3000"
    indicator-color="#f66"
    class="swiper"
  >
    <van-swipe-item
      v-for="(image, index) in images"
      :key="index"
      @click="goToDetail(image.actionData)"
    >
      <img :src="image.imgUrl" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { MovieswiperAPI } from '@/api/data/movieswiper'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      images: {}
    }
  },
  computed: { ...mapState(['detailFrom']) },
  methods: {
    goToDetail (data) {
      const id = data.match(/[0-9]*/g)[15]
      this.$router.push(`/detail/${id}`)
      this.$store.commit('setDetailFrom', 'nowplaying')
    }
  },
  mounted () {
    MovieswiperAPI().then(res => {
      this.images = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 420px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
