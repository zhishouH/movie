<template>
  <div class="detail">
    <div
      class="detail__header"
      :class="headerIsShow?'detail__header-bgcolor':''"
    >
      <span
        class="iconfont icon-arrow-left-bold"
        @click="goToMovie"
      ></span>
      <span v-show="headerIsShow">{{info.name}}</span>
    </div>
    <div class="detail__poster">
      <img :src="info.poster">
    </div>
    <div class="detail__info">
      <div class="info__content">
        <div class="info__content__title">
          <span>{{info.name}}</span>
          <span>{{info.grade}} <i>分</i> </span>
        </div>
        <div class="info__content__category">{{categoryCom}}</div>
        <div class="info__content__nation-runtime">{{nationCom}} | {{info.runtime}}分钟</div>
        <div
          class="info__content__synopsis"
          :class="{'synopsis-height':synopsisClick}"
        >
          <p>{{info.synopsis}}</p>
          <span
            :class="[iconfont, synopsisClick?iconup:icondown]"
            @click="handleSynopsis"
          ></span>
        </div>
      </div>
      <div class="info__actors">
        <p>演职人员</p>
        <ScrollView from="actors">
          <div class="actors__wrap">
            <ul>
              <li
                v-for="(item,index) in info.actors"
                :key="index"
              >
                <img
                  :src="item.avatarAddress"
                  @click="handleActorsImg(info.actors,index)"
                >
              </li>
            </ul>
          </div>
        </ScrollView>
      </div>
      <div class="info__stills">
        <p>剧照</p>
        <ScrollView
          v-if="info.photos"
          from="stills"
        >
          <div class="stills__wrap">
            <ul>
              <li
                v-for="(item,index) in info.photos"
                :key="index"
              >
                <img
                  :src="item"
                  @click="handleStillImg(info.photos,index)"
                >
              </li>
            </ul>
          </div>
        </ScrollView>
        <div
          class="none-photos"
          v-else
        >暂无剧照</div>
      </div>
    </div>
    <div class="detail__bottom">
      <div
        class="bottom__collect"
        @click="handleCollect(info.filmId)"
      >收藏</div>
      <ShareSheet style="flex: 1;"></ShareSheet>
    </div>

  </div>
</template>

<script>
import { DetailAPI } from '@/api/data/detail'
import ScrollView from '@/components/ScrollView/index.vue'
import ShareSheet from '@/components/ShareSheet/index.vue'
import { ImagePreview } from 'vant'
import { mapState } from 'vuex'
export default {
  components: {
    ScrollView,
    ShareSheet,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data () {
    return {
      info: {},
      headerIsShow: false,
      synopsisClick: false,
      iconfont: 'iconfont',
      iconup: 'icon-arrow-up-bold',
      icondown: 'icon-arrow-down-bold'

    }
  },
  computed: {
    categoryCom () {
      return this.info.category?.split('|').join(' | ')
    },
    nationCom () {
      return this.info.nation?.split(',')[0]
    },
    ...mapState(['detailFrom', 'collect'])
  },
  methods: {
    // 页面滚动
    handleOnScroll () {
      const MoveDis = document.documentElement.scrollTop
      if (MoveDis > 40) {
        this.headerIsShow = true
      } else {
        this.headerIsShow = false
      }
    },
    // 返回电影
    goToMovie () {
      if (this.detailFrom === 'nowplaying') {
        this.$router.push('/movie/nowplaying')
      } else if (this.detailFrom === 'comingsoon') {
        this.$router.push('/movie/comingsoon')
      } else if (this.detailFrom === 'search') {
        this.$router.push('/search')
      } else if (this.detailFrom === 'collect') {
        this.$router.push('/collect')
      } else {
        this.$router.push('/movie/nowplaying')
      }
    },
    handleSynopsis () {
      this.synopsisClick = !this.synopsisClick
    },
    handleActorsImg (data, index) {
      const arr = []
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].avatarAddress)
      }
      ImagePreview({
        images: arr,
        closeable: true,
        startPosition: index
      })
    },
    handleStillImg (data, index) {
      ImagePreview({
        images: data,
        closeable: true,
        startPosition: index
      })
    },
    handleCollect (data) {
      const collects = new Set(this.collect)
      if (collects.has(data)) {
        this.$toast.fail({ message: '已在收藏中！', duration: 1000 })
      } else {
        this.$store.commit('setCollect', data)
        this.$toast.success({ message: '收藏成功！', duration: 1000 })
      }
    }
  },
  beforeMount () {
    this.$store.commit('hindTabbarMutations', false)
  },
  mounted () {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    const id = this.$route.params.id
    DetailAPI(id).then(res => {
      this.info = res.data[0]
      this.$toast.clear()
    })
    window.onscroll = this.handleOnScroll
  },
  destroyed () {
    this.$store.commit('showTabbarMutations', true)
  }
}
</script>

<style lang="scss" scoped>
.detail {
  position: relative;
  width: 100%;
  height: 100%;

  &__header {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: left;
    font-size: 36px;
    z-index: 99;
    padding-left: 20px;
    transition: background-color 1s;

    .iconfont {
      font-size: 32px;
      margin-right: 30px;
      color: black;
    }
  }

  &__header-bgcolor {
    background-color: #fff;
  }

  &__poster {
    position: absolute;
    top: -300px;
    left: 0;
    width: 100%;
    height: 1050px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__info {
    position: absolute;
    top: 420px;
    width: 100%;
    background-color: #f4f4f4;
    color: #999;
    padding-bottom: 120px;

    .info__content {
      width: 100%;
      background-color: #fff;
      padding-top: 20px;

      &__title {
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 36px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        color: #333;

        span:nth-child(1) {
          // color: red;
          margin-left: 20px;
        }

        span:nth-child(2) {
          margin-right: 20px;
          font-style: italic;
          color: #ffb232;

          i {
            font-size: 18px;
          }
        }
      }

      &__category {
        box-sizing: border-box;
        padding-left: 20px;
        width: 100%;
        height: 60px;
        line-height: 60px;
      }

      &__nation-runtime {
        box-sizing: border-box;
        padding-left: 20px;
        width: 100%;
        height: 60px;
        line-height: 60px;
      }

      &__synopsis {
        position: relative;
        box-sizing: border-box;
        padding: 0 20px;
        width: 100%;
        height: 140px;

        p {
          height: 100px;
          line-height: 50px;
          // 多行文本溢出
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        /* stylelint-disable-next-line no-descending-specificity */
        span {
          color: #333;
          position: absolute;
          left: calc(50% - 14px);
        }
      }

      .synopsis-height {
        height: initial;
        padding-bottom: 40px;

        p {
          height: initial;
          display: block;
        }
      }
    }

    .info__actors {
      width: 100%;
      margin-top: 20px;
      background-color: #fff;
      padding-bottom: 20px;
      /* stylelint-disable-next-line no-descending-specificity */
      p {
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        line-height: 80px;
        padding-left: 20px;
        font-size: 36px;
        color: #333;
      }

      .actors__wrap {
        height: 200px;
        width: 980px;

        ul {
          margin: 0;
          padding: 0;
          display: flex;
          flex-flow: row nowrap;
          justify-content: start;

          li {
            width: 180px;
            height: 200px;
            margin-right: 20px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .info__stills {
      width: 100%;
      background-color: #fff;
      margin-top: 20px;
      padding-bottom: 20px;
      /* stylelint-disable-next-line no-descending-specificity */
      p {
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        line-height: 80px;
        padding-left: 20px;
        font-size: 36px;
        color: #333;
      }

      .stills__wrap {
        height: 200px;
        width: 1580px;

        ul {
          margin: 0;
          padding: 0;
          display: flex;
          flex-flow: row nowrap;
          justify-content: start;

          li {
            width: 300px;
            height: 200px;
            margin-right: 20px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .none-photos {
      width: 100%;
      height: 200px;
      line-height: 200px;
      text-align: center;
    }
  }

  &__bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: flex;
    flex-flow: row nowrap;

    .bottom__collect {
      width: 50%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #fff;
      font-size: 36px;
      background: url(../../assets/collect.jpg) no-repeat top left;
      background-size: 100% 100%;
    }
  }
}
</style>
