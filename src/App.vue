<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    // 无论跳转home还是search页面都只发一次请求
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
