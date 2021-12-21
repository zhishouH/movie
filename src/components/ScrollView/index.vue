<template>
  <div class="scroll-view">
    <div
      class="case"
      ref="case"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['from'],
  data () {
    return {
      touchStartX: 0, // 触摸初始坐标
      touchEndX: 0, // 触摸结束坐标
      touchDis: 0, // 坐标相差距离
      caseX: 0, // case层的初始位置
      move: 0 // 移动距离
    }
  },
  methods: {
    touchMove () {
      this.$refs.case.addEventListener('touchstart', (e) => {
        this.touchStartX = e.targetTouches[0].pageX
        this.caseX = this.$refs.case.offsetLeft
      })
      this.$refs.case.addEventListener('touchmove', (e) => {
        this.touchEndX = e.targetTouches[0].pageX
        this.touchDis = this.touchEndX - this.touchStartX
        this.move = this.touchDis + this.caseX
        if (this.from === 'actors') {
          if (this.move <= 20 && this.move > -120) {
            this.$refs.case.style.left = this.move + 'px'
          }
        }
        if (this.from === 'stills') {
          if (this.move <= 20 && this.move > -420) {
            this.$refs.case.style.left = this.move + 'px'
          }
        }
      })
    }
  },
  mounted () {
    this.touchMove()
  }
}
</script>

<style lang="scss" scoped>
.scroll-view {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  padding-left: 20px;

  .case {
    position: absolute;
    height: 200px;
  }
}
</style>
