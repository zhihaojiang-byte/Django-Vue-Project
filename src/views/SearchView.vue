<template>
  <div class="page_search">
    <!--    search page header-->
    <van-nav-bar class="search-title"
        title="Search Attractions"
    />
    <!--    search bar-->
    <form action="/" class="search-bar">
      <van-search
          v-model="searchValue"
          show-action
          placeholder="Where to?"
          @search="onSearch"
          @cancel="onCancel"
          action-text="Cancle"
          :clearable="false"
      />
    </form>
    <!--    searched content-->
    <div class="attraction-list">
      <div class="no-result" v-if="attractionList.length === 0">Sorry, no matching results.</div>
      <AttractionItem v-for="item in attractionList" :key="item.id" :item="item" />
    </div>
    <van-pagination
        v-model="currentPage"
        :total-items="totalItems"
        :items-per-page="itemsPerPage"
        @change="onPageChange" />
    <!--    footer bav bar-->
    <FooterBar :active="1" />
  </div>

</template>

<script>
import AttractionItem from "@/views/components/AttractionItem.vue";
import {apis} from "@/tools/apis";
import {ajax} from "@/tools/ajax";
import FooterBar from "@/views/components/FooterBar.vue";

export default {
  name: "SearchView",
  components: {
    AttractionItem,
    FooterBar,
  },
  data () {
    return {
      searchValue: '',
      attractionList: [],
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 5,
    }
  },
  methods: {
    getAttractionList() {
      ajax.get(apis.attractionListUrl, {
        params: {
          page: this.currentPage,
          keyword: this.searchValue,
          limit: this.itemsPerPage,
        }
      }).then(({data: {meta, object}}) => {
        this.totalItems = meta.total_count
        this.attractionList = object
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
    },
    onSearch() {
      if (!this.searchValue) {
        return
      }
      this.attractionList = []
      this.currentPage = 1
      this.getAttractionList()
    },
    onCancel() {
      this.searchValue = ''
      this.attractionList = []
      this.currentPage = 1
      this.getAttractionList()
    },
    onPageChange() {
      this.getAttractionList()
    }
  },
  mounted() {
    this.getAttractionList()
  }
}
</script>

<style lang="less" scoped>
.page_search {
  margin-bottom: 50px;
  .search-bar{
    margin-bottom: 15px;
  }
  .attraction-list {
    .no-result{
      font-size: 16px;
      text-align: center;
      color: #999999;
      padding: 40px 0;
    }
    margin: 0 10px;
  }
}
</style>
