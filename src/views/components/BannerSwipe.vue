<template>
  <div class="home-banner">
<!--    bannerSwipe form Vant UI-->
    <van-swipe class="my-swipe" :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="item in swipeList" :key="item.id">
        <a :href="item.target_url">
          <img :src="item.img_url" :alt="item.name">
        </a>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{swipeList.length}}</div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
import {ajax} from "@/tools/ajax";
import {apis} from "@/tools/apis";

export default {
  name: "BannerSwipe",
  data () {
    return {
      // swipeList: data for the bannerSwipe( with id, img_url and name)
      swipeList: [],
      current: 0,
    }
  },
  methods: {
    // send request the backend server and filling the swipeList
    getSwipeList () {
      ajax.get(apis.swipeListUrl).then( res => {
        this.swipeList = res.data.object
      }).catch(({error_message}) => {
        this.$notify(error_message) //$notify (form Vant UI). It shows an error message on the top of the page
      })
    },
    onChange(index) {
      this.current = index;
    },
  },
  created() {
    // when page is loaded, call the getSwipeList function
    this.getSwipeList()
  }
}
</script>

<style lang="less" scoped>
.home-banner{
  .my-swipe img {
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    color: white;
  }
}
</style>
