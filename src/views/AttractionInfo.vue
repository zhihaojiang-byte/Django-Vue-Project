<template>
  <div class="page-attraction-info">
    <!--    header-->
    <van-nav-bar
        left-arrow
        @click-left="goBack"
        title="Attraction information"
    />
    <div class="info" v-html="attraction_info.info"></div>
  </div>
</template>

<script>
import {apis} from "@/tools/apis";
import {ajax} from "@/tools/ajax";

export default {
  name: "AttractionInfo",
  data () {
    return {
      id: '',
      attraction_info: {},
    }
  },
  watch: {
    $route() {
      this.loadData()
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    },
    getAttractionInfo () {
      const url = apis.attractionInfoUrl.replace('#{id}', this.id)
      ajax.get(url).then(({data}) => {
        this.attraction_info = data
        console.log(data)
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
    },
    loadData () {
      this.id = this.$route.params.id
      this.getAttractionInfo()
    }
  },
  created() {
    this.loadData()
  },
}
</script>

<style lang="less" scoped>
.page-attraction-info{
  .info{
    margin: 20px 20px 0 20px;
  }
}
</style>
