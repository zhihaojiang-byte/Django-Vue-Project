<template>
  <!--  recommended attractions-->
  <div class="home-recommended">
    <!--    recommended attractions title-->
    <van-cell class="recommended-title"
        title="Recommended"
        value="See more"
        is-link :to="{name: 'AttractionList', query: {is_recommended: 1}}"/>
    <!--    recommended attractions list-->
    <div class="recommended-content">
<!--      AttractionItem as a sub component , can be used in other pages -->
      <AttractionItem v-for="item in attractions" :key="item.id" :item="item"/>
    </div>
  </div>
</template>

<script>
import AttractionItem from "@/views/components/AttractionItem.vue";
import {ajax} from "@/tools/ajax";
import {apis} from "@/tools/apis";

export default {
  name: "RecommendedAttraction",
  components: {
    AttractionItem,
  },
  data () {
    return {
      // attractions: data for the attractions
      attractions : [],
    }
  },
  methods: {
    // send request the backend server and filling the attractions
    getAttractionList () {
      ajax.get(apis.attractionListUrl, {
        params: {
          is_recommended: 1 // params for filter the recommended attractions
        }
      }).then(res => {
        this.attractions = res.data.object
      }).catch(({error_message}) => {
        this.$notify(error_message)   //$notify (form Vant UI). It shows an error message on the top of the page
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
.home-recommended{
  .recommended-title {
    padding: 20px 10px;
    background: #f6f6f6;
  }
  .recommended-content{
    margin: 0 10px;
    border-bottom: 1px solid #f6f6f6;
  }
}
</style>
