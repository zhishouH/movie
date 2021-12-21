<template>
  <div class="login">
    <div class="login__logo">
      <img
        src="../../assets/logo.png"
        alt=""
      >
    </div>
    <div class="login__username">
      <input
        type="text"
        placeholder="请输入用户名"
        v-model="userInfo.username"
      >
    </div>
    <div class="login__password">
      <input
        type="password"
        placeholder="请输入密码"
        v-model="userInfo.password"
      >
    </div>
    <div
      class="login__btn"
      @click="handleLogin"
    >登录 </div>
    <div
      class="login__link"
      @click="goToRegister"
    >立即注册</div>
  </div>
</template>

<script>
import { LoginAPI } from '@/api/user/login'
import { mapState } from 'vuex'
export default {
  computed: { ...mapState(['userInfo']) },
  methods: {
    handleLogin () {
      LoginAPI('/api/user/login', this.userInfo).then(res => {
        sessionStorage.isLogin = true
        sessionStorage.username = this.userInfo.username
        this.$router.push('/center')
        this.$toast(`你好${sessionStorage.username}!`)
        this.$store.commit('showTabbarMutations', true)
      })
    },
    goToRegister () {
      this.$router.push('/register')
    }
  },
  beforeCreate () {
    this.$store.commit('hindTabbarMutations', false)
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  &__logo {
    width: 80%;
    height: 120px;
    margin: 0 0 20px 0;

    img {
      display: block;
      width: 100px;
      height: 120px;
      margin: 0 auto;
    }
  }

  &__username,
  &__password {
    width: 80%;
    height: 100px;
    margin: 20px auto;

    input {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      outline: none;
      border: 2px solid #ccc;
      padding-left: 40px;
      border-radius: 16px;
    }
  }

  &__btn {
    width: 80%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 36px;
    color: #fff;
    font-weight: bold;
    background-color: #ff6347;
    border-radius: 16px;
    margin: 20px auto;
  }

  &__link {
    width: 80%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
  }
}
</style>
