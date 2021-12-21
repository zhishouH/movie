<template>
  <div class="movie__header">
    <router-link to="nowplaying">正在热映</router-link>
    <router-link to="comingsoon">即将上映</router-link>
  </div>
</template>
<style lang="scss" scoped>
.movie__header {
  width: 100%;
  height: 80px;
  line-height: 80px;
  font-size: 34px;
  background-color: #fff;
  border-bottom: 2px solid #ddd;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  z-index: 99;
}

.fixed {
  position: fixed;
  top: 80px;
}
</style>
