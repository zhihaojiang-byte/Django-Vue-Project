<template>
  <div class="footer-bar">
<!--    a footer bar, user can easily switches between the most 3 frequently used page-->
    <van-tabbar v-model="local_active">
      <van-tabbar-item icon="home-o" :to="{name: 'home'}">Home</van-tabbar-item>
      <van-tabbar-item icon="search" :to="{name: 'search'}">Search</van-tabbar-item>
      <van-tabbar-item icon="user-o" :to="{name: 'UserAccount'}">Account</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  props: ['active'],
  data() {
    return {
      local_active: 0,
    };
  },
  created() {
    this.local_active = this.active
  }
}
</script>

<style scoped>
.footer-bar{
  max-width: 800px;
}
</style>
