<template>
  <div class="collect">
    <div class="collect__title">
      <span
        class="iconfont icon-arrow-left-bold"
        @click="goToCenter"
      ></span>
      我的收藏
    </div>
    <div
      class="collect__centent"
      v-if="collectList.length>0"
    >
      <li
        v-for="(item,index) in collectList"
        :key="index"
        class="collect__centent__item"
        @click="goToDetail(item.filmId)"
      >
        《{{item.name}}》
      </li>
    </div>
    <div
      v-else
      class="none__collect"
    >还没有收藏，快去看看吧！</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { DetailAPI } from '@/api/data/detail'
export default {
  data () {
    return {
      collectList: []
    }
  },
  computed: { ...mapState(['collect', 'detailFrom']) },
  methods: {
    goToCenter () {
      this.$router.push('/center')
    },
    goToDetail (id) {
      this.$router.push(`/detail/${id}`)
      this.$store.commit('setDetailFrom', 'collect')
    }
  },
  beforeMount () {
    this.$store.commit('hindTabbarMutations', false)
  },
  mounted () {
    if (this.collect.length > 0) {
      for (let i = 0; i < this.collect.length; i++) {
        const id = this.collect[i]
        DetailAPI(id).then(res => {
          this.collectList = [...this.collectList, ...res.data]
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collect {
  width: 100%;
  height: 100%;

  &__title {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    border-bottom: 2px solid #eee;
    padding-left: 20px;

    .iconfont {
      font-size: 32px;
      margin-right: 30px;
      color: black;
    }
  }

  &__centent {
    box-sizing: border-box;
    margin-top: 80px;
    width: 100%;
    padding: 20px;

    &__item {
      height: 80px;
      line-height: 80px;
      border-bottom: 4px dashed #eee;
      list-style: square;
    }
  }

  .none__collect {
    margin-top: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
}
</style>
