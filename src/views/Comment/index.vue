<template>
  <div class="comment">
    <div class="comment__title">
      <span
        class="iconfont icon-arrow-left-bold"
        @click="goToCenter"
      ></span>
      我的评论
    </div>
    <div class="comment__centent">
      <li
        v-for="(item,index) in commentList"
        :key="index"
        class="comment__centent__item"
      >
        <div class="comment__centent__item__moviename">
          <span>{{item.moviename}}</span>
          <span>{{item.time | timeFilter}}</span>
        </div>
        <div class="comment__centent__item__moviecontent">{{item.content}}</div>
      </li>
    </div>
    <div
      v-if="commentList.length===0"
      style="text-align: center;"
    >
      还没有评论，快去发表吧！
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      commentList: []
    }
  },
  computed: { ...mapState(['comment']) },
  filters: {
    timeFilter (time) {
      const date = new Date(time)
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() + 1) + ':' + (date.getSeconds() + 1)
    }
  },
  methods: {
    goToCenter () {
      this.$router.push('/center')
    }
  },
  beforeMount () {
    this.$store.commit('hindTabbarMutations', false)
  },
  mounted () {
    this.commentList = this.comment
  }
}
</script>

<style lang="scss" scoped>
.comment {
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
      box-sizing: border-box;
      border-bottom: 4px dashed #eee;

      &__moviename {
        height: 80px;
        line-height: 80px;
        overflow: hidden;

        span:nth-child(1) {
          float: left;
        }

        span:nth-child(2) {
          float: right;
        }
      }

      &__moviecontent {
        line-height: 40px;
      }
    }
  }
}
</style>
