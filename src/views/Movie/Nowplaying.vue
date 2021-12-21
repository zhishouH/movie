<template>
  <van-list
    v-model="loading"
    :finished="finished"
    @load="onLoad"
    offset=0
    class="list"
  >
    <van-cell
      v-for="item in list"
      :key="item.filmId"
      class="cell"
    >
      <MovieInfo
        :item="item"
        @click.native="goToDetail(item.filmId)"
      ></MovieInfo>
    </van-cell>
  </van-list>
</template>

<script>
import { NowplayingAPI } from '@/api/data/nowplaying'
import MovieInfo from '@/views/Movie/MovieInfo.vue'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  components: { MovieInfo },
  methods: {
    onLoad () {
      NowplayingAPI(this.current).then(res => {
        this.list = [...this.list, ...res.data]
        this.total = res.headers['x-total-count']
        this.loading = false
        this.current++
        if (this.list.length >= this.total) {
          this.finished = true
        }
      })
    },
    goToDetail (id) {
      this.$router.push(`/detail/${id}`)
      this.$store.commit('setDetailFrom', 'nowplaying')
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding-bottom: 100px;

  .cell {
    width: 95%;
    margin: 0 auto;
    padding: 20px;
    border-bottom: 2px solid #eee;
  }
}
</style>
