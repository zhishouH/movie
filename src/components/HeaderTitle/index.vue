<template>
  <div class="title">
    {{title}}
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 34px;
  background-color: #fff;
  position: fixed;
  top: 0;
  z-index: 99;
}
</style>
