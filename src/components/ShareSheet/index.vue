<template>
  <div>
    <van-cell
      title="分享"
      @click="showShare = true"
      class="share"
    />
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  methods: {
    onSelect (option) {
      Toast(option.name)
      this.showShare = false
    }
  }

}
</script>

<style lang="scss" scoped>
.share {
  width: 100%;
  height: 100px;
  text-align: center;
  font-size: 36px;
  color: #fff;
  line-height: 70px;
  background: url(../../assets/share.jpg) no-repeat top left;
  background-size: 100% 100%;
}
</style>
