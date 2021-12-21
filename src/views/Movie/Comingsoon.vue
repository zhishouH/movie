<template>
  <div class="list">
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
  </div>
</template>

<script>
import { ComingsoonAPI } from '@/api/data/comingsoon'
import MovieInfo from '@/views/Movie/MovieInfo.vue'
export default {
  data () {
    return {
      list: []
    }
  },
  components: { MovieInfo },
  methods: {
    goToDetail (id) {
      this.$router.push(`/detail/${id}`)
      this.$store.commit('setDetailFrom', 'comingsoon')
    }
  },
  mounted () {
    ComingsoonAPI().then(res => {
      this.list = res.data
    })
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
