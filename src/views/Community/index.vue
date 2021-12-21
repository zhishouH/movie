<template>
  <div class="community">
    <HeaderTitle
      title="社区"
      style="border: 1px solid #eee;"
    ></HeaderTitle>
    <div class="community__content">
      <li
        v-for="(item,index) in commentsList"
        :key="index"
        class="community__content__comments"
      >
        <div class="user">
          <div class="name">
            {{item.username}}
          </div>
          <div class="time">
            {{item.time | timeFilter}}
          </div>
        </div>
        <div class="moviename">
          《{{item.moviename}}》
        </div>
        <div
          class="poster"
          v-if="item.poster"
        >
          <img
            :src="handlePoster(item.poster)"
            @click="handlePosterImg(item.poster)"
          >
        </div>
        <div class="content">
          {{item.content}}
        </div>

      </li>
    </div>
    <div
      class="community__add"
      @click="goToAdd"
    >+</div>
  </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle/index.vue'
import { GetCommentsAPI } from '@/api/data/getcomments'
import { ImagePreview } from 'vant'
export default {
  components: { HeaderTitle, [ImagePreview.Component.name]: ImagePreview.Component },
  data () {
    return {
      commentsList: [],
      iconfont: 'iconfont',
      iconup: 'icon-arrow-up-bold',
      icondown: 'icon-arrow-down-bold'
    }
  },
  filters: {
    timeFilter (time) {
      const date = new Date(time)
      return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() + 1) + ':' + (date.getSeconds() + 1)
    }
  },
  methods: {
    handlePoster (poster) {
      return `http://localhost:3000${poster}`
    },
    handlePosterImg (poster) {
      const image = `http://localhost:3000${poster}`
      ImagePreview({
        images: [image],
        closeable: true
      })
    },

    goToAdd () {
      this.$router.push('/commentadd')
    }
  },
  mounted () {
    GetCommentsAPI().then(res => {
      this.commentsList = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.community {
  background-color: #fff;

  &__content {
    padding: 10px 0 100px;
    margin: 80px 20px;
    display: flex;
    flex-flow: column-reverse nowrap;

    &__comments {
      box-sizing: border-box;
      margin: 20px 0;
      padding: 20px;
      background-color: #f4f4f4;
      border-radius: 16px;
      border-bottom: 4px dashed #eee;

      .user {
        width: 100%;
        height: 60px;
        line-height: 60px;
        overflow: hidden;

        .name {
          float: left;
        }

        .time {
          float: right;
        }
      }

      .moviename {
        height: 60px;
        line-height: 60px;
      }

      .poster {
        width: 100%;
        height: 400px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }

      .content {
        line-height: 50px;
      }

      .more {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;

        span {
          font-size: 30px;
        }
      }
    }
  }

  &__add {
    position: fixed;
    bottom: 140px;
    right: 20px;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 80px;
    color: #fff;
    background-color: #ff5f16;
    border-radius: 50%;
  }
}
</style>
