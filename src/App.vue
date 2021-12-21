<template>
  <div id="app">
    <Tabbar v-if="isShowTabbar"></Tabbar>
    <router-view></router-view>
  </div>
</template>
<script>
import Tabbar from '@/components/Tabbar/index.vue'
import { mapState } from 'vuex'
export default {
  components: { Tabbar },
  computed: { ...mapState(['isShowTabbar']) }
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 28px;
  color: #333;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #333;
}

a.router-link-active {
  color: #ff5f16;
}

#app {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

</style>
