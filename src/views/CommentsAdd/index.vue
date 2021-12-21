<template>
  <div class="commentsadd">
    <div class="commentsadd__title">
      <span
        class="iconfont icon-arrow-left-bold"
        @click="goToCommunity"
      ></span>
      添加评论
    </div>
    <div class="commentsadd__content">
      <input
        type="text"
        placeholder="电影名称"
        v-model="inputText"
      >
      <textarea
        cols="30"
        rows="10"
        placeholder="请输入您的影评"
        v-model="textareaText"
      ></textarea>
      <div
        class="add-btn"
        @click="handleAdd"
      >添 加</div>
    </div>
  </div>
</template>

<script>
import { SetCommentsAPI } from '@/api/data/setcomments'
export default {
  data () {
    return {
      inputText: '',
      textareaText: ''
    }
  },
  methods: {
    goToCommunity () {
      this.$router.push('/community')
    },
    handleAdd () {
      const username = sessionStorage.username
      SetCommentsAPI({
        username: username,
        moviename: this.inputText,
        content: this.textareaText,
        time: Date.now()
      }).then(res => {
        this.$store.commit('setComment', res.data)
        this.$router.push('/community')
      })
      this.inputText = ''
      this.textareaText = ''
    }
  },
  beforeMount () {
    this.$store.commit('hindTabbarMutations', false)
  },
  destroyed () {
    this.$store.commit('showTabbarMutations', true)
  }
}
</script>

<style lang="scss" scoped>
.commentsadd {
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

  &__content {
    padding: 100px 20px 0;

    input {
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      padding-left: 20px;
      margin-bottom: 20px;
      outline: none;
      border: 2px solid #eee;
      border-radius: 8px;
    }

    textarea {
      box-sizing: border-box;
      width: 100%;
      height: 300px;
      padding: 20px 0 0 20px;
      margin-bottom: 20px;
      resize: none;
      outline: none;
      border: 2px solid #eee;
      border-radius: 8px;
    }

    .add-btn {
      width: 100%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 40px;
      border-radius: 8px;
      color: #fff;
      background: url(../../assets/collect.jpg) no-repeat top left;
      background-size: 100% 100%;
    }

    .add-btn:active {
      background: url(../../assets/share.jpg) no-repeat top left;
      background-size: 100% 100%;
    }
  }
}
</style>
