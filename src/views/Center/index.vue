<template>
  <div class="center">
    <div class="center__centent">
      <div class="user__info">
        <div class="user__info__avatar">
          <img src="../../assets/avatar.jpg">
        </div>
        <div class="user__info__name">
          {{username}}
        </div>
        <div class="user__info__set">
          <span
            class="iconfont icon-gengduo"
            @click="handleSet"
          ></span>
        </div>
      </div>
      <div
        class="user__collect"
        @click="goToCollect"
      >
        <span class="iconfont icon-shoucang"></span>
        我的收藏
      </div>
      <div
        class="user__comment"
        @click="goToComment"
      >
        <span class="iconfont icon-pinglun"></span>
        我的评论
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  methods: {
    goToCollect () {
      this.$router.push('/collect')
    },
    goToComment () {
      this.$router.push('/comment')
    },
    handleSet () {
      this.$toast.fail('暂无设置！')
    }
  },
  beforeMount () {
    this.$store.commit('showTabbarMutations', true)
  },
  mounted () {
    this.username = sessionStorage.username
  }
}
</script>

<style lang="scss" scoped>
.center {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../../assets/header-bg.png) no-repeat 0 -50px;
  background-size: 750px 400px;

  &__centent {
    position: absolute;
    top: 250px;
    width: 100%;
    height: 80%;
    background-color: #fff;
    border-radius: 32px 32px 0 0;

    .user__info {
      position: relative;
      width: 100%;
      height: 100px;
      margin-top: 40px;
      padding-bottom: 10px;
      border-bottom: 4px dashed #ddd;

      &__avatar {
        position: absolute;
        top: 0;
        left: 20px;
        width: 100px;
        height: 100px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      &__name {
        position: absolute;
        top: 0;
        left: 150px;
        width: 300px;
        height: 100px;
        line-height: 100px;
        font-size: 36px;
      }

      &__set {
        position: absolute;
        top: 0;
        right: 20px;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;

        span {
          font-size: 40px;
        }
      }
    }

    .user__collect {
      box-sizing: border-box;
      height: 80px;
      line-height: 80px;
      margin: 20px 20px;
      padding-left: 20px;
      border-bottom: 2px solid #eee;

      span {
        font-size: 40px;
        color: #501192;
        vertical-align: middle;
      }
    }

    .user__comment {
      box-sizing: border-box;
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
      margin: 0 20px;
      border-bottom: 2px solid #eee;

      span {
        font-size: 40px;
        color: #ee7c3d;
        vertical-align: middle;
      }
    }
  }
}
</style>
