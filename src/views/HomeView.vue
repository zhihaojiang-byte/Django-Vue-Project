<template>
  <div class="page-home">
<!--    home page title-->
    <van-nav-bar class="home-title"
                 title="Fun Booking"
    />
<!--    home page banner-->
    <BannerSwipe />
<!--    home page popular attraction list -->
    <PopularAttraction />
    <!--    home page recommended attraction list -->
    <RecommendedAttraction />
    <!--    footer bav bar-->
    <FooterBar :active="0" />
  </div>
</template>

<script>
import BannerSwipe from "@/views/components/BannerSwipe.vue";
import PopularAttraction from "@/views/components/PopularSpot.vue";
import RecommendedAttraction from "@/views/components/FeaturedSpot.vue";
import FooterBar from "@/views/components/FooterBar.vue";

export default {
  name: 'HomeView',
  // components used in this page
  components: {
    BannerSwipe,
    PopularAttraction,
    RecommendedAttraction,
    FooterBar,
  },
  created() {
  }
}
</script>

<style lang="less" scoped>
.page-home{
  margin-bottom: 50px;
}
</style>
