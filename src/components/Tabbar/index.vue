<template>
  <nav>
    <router-link to="/movie">
      <i class="iconfont icon-dianyingpiaoiocn"></i>
      电影
    </router-link>
    <router-link to="/search">
      <i class="iconfont icon-sousuo"></i>
      搜索
    </router-link>
    <router-link to="/community">
      <i class="iconfont icon-shequ"></i>
      社区
    </router-link>
    <router-link to="/center">
      <i class="iconfont icon-31wode"></i>
      我的
    </router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  border-top: 2px solid #eee;

  a {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-size: 24px;

    i {
      font-size: 54px;
    }
  }
}
</style>
