<template>
  <div class="page-attraction-list">
    <!--    attraction list header-->
    <van-nav-bar class="search-title"
                 :title="attraction_title"
                 left-arrow
                 @click-left="goBack"
    />

    <!--    attraction list content-->
    <div class="attraction-list">
      <AttractionItem v-for="item in attractionList" :key="item.id" :item="item" />
    </div>
    <van-pagination
        v-model="currentPage"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        @change="onPageChange" />
  </div>
</template>

<script>
import {ajax} from "@/tools/ajax";
import {apis} from "@/tools/apis";
import AttractionItem from "@/views/components/AttractionItem.vue";

export default {
  name: "AttractionList",
  components: {AttractionItem},
  data () {
    return {
      attractionList: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 5,
      is_popular: '',
      is_recommended: '',
      attraction_title: '',
    }
  },
  methods: {
    getAttractionList() {
      ajax.get(apis.attractionListUrl, {
        params: {
          page: this.currentPage,
          limit: this.itemsPerPage,
          is_popular: this.is_popular,
          is_recommended: this.is_recommended,
        }
      }).then(({data: {meta, object}}) => {
        this.totalItems = meta.total_count
        this.attractionList = object
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
    },
    onPageChange() {
      this.getAttractionList()
    },
    goBack () {
      this.$router.back(-1)
    },
  },
  mounted() {
    this.is_popular = this.$route.query.is_popular
    this.is_recommended = this.$route.query.is_recommended
    if (this.is_popular) {
      this.attraction_title = 'Popular attractions'
    } else if(this.is_recommended) {
      this.attraction_title = 'Recommended attractions'
    }
    this.getAttractionList()
  }
}
</script>

<style lang="less" scoped>
.page-attraction-list {
  .attraction-list{
    margin: 15px 10px;
  }
}
</style>
