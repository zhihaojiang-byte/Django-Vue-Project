<template>
<!--  popular attractions-->
  <div class="home-popular">
    <!--    popular attractions title-->
    <van-cell class="popular-title"
        title="Popular"
        value="See more"
        is-link :to="{name: 'AttractionList', query: {is_popular: 1}}"/>
    <!--    popular attractions list-->
    <div class="popular-content">
<!--      each attraction in the list is a link to the attraction detail page. the url carries its id.-->
      <router-link class="popular-content-item"
                   v-for="(item, index) in attractions" :key="index"
                   :to="{name: 'AttractionDetail', params: {id: item.id}}">
        <div class="attraction-pic">
<!--          top left label for the first three attraction-->
          <img class="main" :src="item.cover_img_url" alt="">
        </div>
        <div class="attraction-name van-ellipsis">{{item.name}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {ajax} from "@/tools/ajax";
import {apis} from "@/tools/apis";

export default {
  name: "PopularAttraction",
  data () {
    return {
      // attractions: data for the attractions ( with id, cover_img_url, name and min_price)
      attractions : []
    }
  },
  methods: {
    // send request the backend server and filling the attractions
    getAttractionList () {
      ajax.get(apis.attractionListUrl, {
        params: {
          is_popular: 1   // params for filter the popular attractions
        }
      }).then(res => {
        this.attractions = res.data.object
      }).catch(({error_message}) => {
        this.$notify(error_message) //$notify (form Vant UI). It shows an error message on the top of the page
      })
    }
  },
  created() {
    // filling the attractions when the page is loaded
    this.getAttractionList()
  }
}
</script>

<style lang="less" scoped>
.home-popular{
  .popular-title {
    padding: 20px 10px;
    background: #f6f6f6;
  }
  .van-icon__image{
    display: inline-block;
  }
}
.popular-content{
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 10px 10px;
  overflow-x: scroll;
  column-gap: 10px;
  .popular-content-item{
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    width: 100px;
    text-align: center;
    .attraction-pic{
      position: relative;
      .main {
        width: 100%;
      }
    }
    .attraction-name{
      font-size: 12px;
      padding: 5px 0;
    }
  }
}

</style>
