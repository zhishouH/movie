<template>
  <div class="search">
    <HeaderTitle
      title="搜索"
      style="border: 1px solid #eee;"
    ></HeaderTitle>
    <div class="search__bar">
      <div class="search__bar--input">
        <span class="iconfont icon-sousuo"></span>
        <input
          type="text"
          placeholder="请输入影片名称..."
          v-model="inputText"
        >
      </div>
      <div
        class="search__bar--btn"
        @click="handleSearch"
      >搜索</div>
    </div>
    <div
      v-if="textShow"
      class="text-style"
    >搜一搜吧！</div>
    <div
      v-for="(item,index) in result"
      :key="index"
      class="search__result"
      @click="goToDetail(item.filmId)"
    >
      {{item.name}}
    </div>
  </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle/index.vue'
import { SearchAPI } from '@/api/data/search'
export default {
  components: { HeaderTitle },
  data () {
    return {
      movieList: [],
      inputText: '',
      result: [],
      textShow: true
    }
  },
  methods: {
    handleSearch () {
      if (this.inputText) {
        const movieName = this.movieList.filter((item) => item.name.indexOf(this.inputText) > -1)
        this.inputText = ''
        this.result = movieName
        if (this.result.length === 0) {
          this.$toast.fail({
            message: '没有找到影片，换个关键字去试试！',
            duration: 1000
          })
        } else {
          this.textShow = false
        }
      } else {
        this.$toast.fail({
          message: '请输入！',
          duration: 500
        })
      }
    },
    goToDetail (id) {
      this.$router.push(`/detail/${id}`)
      this.$store.commit('setDetailFrom', 'search')
    }
  },
  mounted () {
    SearchAPI().then(res => {
      this.movieList = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.search {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-top: 80px;

  &__bar {
    width: 100%;
    height: 120px;
    background-color: #fff;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;

    &--input {
      width: 600px;
      height: 80px;
      line-height: 80px;
      background-color: #f4f4f4;
      border-radius: 8px;
      display: flex;
      flex-flow: row nowrap;

      span {
        font-size: 60px;
        padding: 0 10px;
      }

      input {
        border: none;
        margin: 0;
        padding: 0;
        width: 500px;
        background-color: #f4f4f4;
      }
    }

    &--btn {
      width: 100px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 32px;
    }
  }

  &__result {
    box-sizing: border-box;
    margin: 0 20px;
    height: 100px;
    line-height: 100px;
    background-color: #fff;
    border-bottom: 2px solid #eee;
  }

  .text-style {
    line-height: 50px;
    text-align: center;
  }
}
</style>
