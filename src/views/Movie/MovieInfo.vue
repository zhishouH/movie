<template>
  <div class="movie">
    <div class="movie__poster">
      <img :src="item.poster">
    </div>
    <div class="movie__content">
      <!-- 影片名称 -->
      <div class="movie__content__name-type"><span>{{item.filmType.name}}</span>{{item.name}}</div>
      <!-- 观众评分 -->
      <div
        class="movie__content__grade"
        v-if="item.grade"
      >观众评分: <span>{{item.grade}}</span></div>
      <div
        class="movie__content__grade"
        v-else
      >观众评分: <span>暂无</span></div>
      <!-- 主演 -->
      <div class="movie__content__actors">
        主演：{{actorsCom}}
      </div>
      <!-- 地方与时间 -->
      <div class="movie__content__nation-runtime">
        {{nationCom}} | {{item.runtime}}分钟
      </div>
    </div>
    <div
      class="movie__collect"
      @click.stop="handleCollect(item.filmId)"
    >收藏</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['item'],
  computed: {
    actorsCom () {
      const actorslist = this.item.actors.map(item => item.name)
      return actorslist.join('、')
    },
    nationCom () {
      const nationlist = this.item.nation.split(',')
      return nationlist[0]
    },
    ...mapState(['collect'])
  },
  mounted () {
  },
  methods: {
    handleCollect (data) {
      const collects = new Set(this.collect)
      if (collects.has(data)) {
        this.$toast.fail({ message: '已在收藏中！', duration: 500 })
      } else {
        this.$store.commit('setCollect', data)
        this.$toast.success({ message: '收藏成功！', duration: 500 })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.movie {
  width: 100%;
  height: 200px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  &__poster {
    width: 120px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    width: 420px;
    height: 200px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    color: #999;

    &__name-type {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 28px;
      color: #333;

      span {
        background-color: #d2d6dc;
        color: #fff;
        font-size: 24px;
        border-radius: 8px;
        padding: 4px 8px;
        margin-right: 10px;
      }
    }

    &__grade {
      width: 100%;
      height: 45px;
      line-height: 45px;

      span {
        color: #ffb232;
      }
    }

    &__actors {
      width: 100%;
      height: 45px;
      line-height: 45px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__nation-runtime {
      width: 100%;
      height: 45px;
      line-height: 45px;
    }
  }

  &__collect {
    width: 100px;
    height: 50px;
    line-height: 50px;
    color: #ff5f16;
    border: 2px solid #ff5f16;
    font-size: 26px;
    text-align: center;
  }
}
</style>
