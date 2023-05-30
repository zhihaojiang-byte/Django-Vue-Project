<template>
  <!--  attraction item -->
  <!--      each attraction in the list is a link to the attraction detail page. the url carries its id.-->
  <router-link class="attraction-item" :to="{name: 'AttractionDetail', params: {id: item.id}}">
    <div class="pic">
      <img :src="local_item.cover_img_url" alt="">
    </div>
    <div class="info">
      <div class="name">{{ local_item.name }}</div>
      <van-rate v-model="local_item.rating" allow-half icon="like" void-icon="like-o" readonly />
      <div class="rate_info">{{ local_item.comment_count }} ratings</div>
      <div class="location">{{ local_item.city }}-{{ local_item.province }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "AttractionItem",
  // "item" is passed from the parent component
  props: ['item'],
  data () {
    return {
      local_item: {},
    }
  },
  created() {
    this.local_item = this.item
  }
}

</script>

<style lang="less" scoped>
.attraction-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  .pic>img{
    width: 100px;
  }
  .info{
    padding-top: 5px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    row-gap: 6px;
    .rate_info{
      font-size: 12px;
      color: #666;
    }
    .location{
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
