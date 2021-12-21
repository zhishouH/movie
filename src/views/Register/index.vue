<template>
  <div class="register">
    <div class="register__logo">
      <img
        src="../../assets/logo.png"
        alt=""
      >
    </div>
    <div class="register__username">
      <input
        type="text"
        placeholder="请输入用户名"
        v-model="userInfo.username"
      >
    </div>
    <div class="register__password">
      <input
        type="password"
        placeholder="请输入密码"
        v-model="userInfo.password"
        ref="passwordFirst"
      >
    </div>
    <div class="register__password">
      <input
        type="password"
        placeholder="请再次输入密码"
        ref="passwordSecond"
      >
    </div>
    <div
      class="register__btn"
      @click="handleRegister"
    >注册 </div>
    <div
      class="register__link"
      @click="goToLogin"
    >已有账号，去登录！</div>
  </div>

</template>

<script>
import { RegisterAPI } from '@/api/user/register'
import { mapState } from 'vuex'
export default {
  computed: { ...mapState(['userInfo']) },
  methods: {
    handleRegister () {
      RegisterAPI('/api/user/register', this.userInfo).then(res => {
        const passwordFirst = this.$refs.passwordFirst.value
        const passwordSecond = this.$refs.passwordSecond.value
        if (passwordFirst !== passwordSecond) {
          this.$toast('两次密码不一致！')
          return
        }
        this.$toast('注册成功,跳转至登录页面!')
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      })
    },
    goToLogin () {
      this.$router.push('/login')
    }
  },
  beforeMount () {
    this.$store.commit('hindTabbarMutations', false)
  }
}
</script>

<style lang="scss" scoped>
.register {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #fff;

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
