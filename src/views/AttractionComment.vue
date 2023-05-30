<template>
  <div class="page-attraction-comment">
    <!--    header-->
    <van-nav-bar
        left-arrow
        @click-left="goBack"
        title="Attraction comments"
    />

    <CommentItem v-for="item in comment_list" :key="item.id" :item="item"/>
  </div>
</template>

<script>
import CommentItem from "@/views/components/CommentItem.vue";
import {apis} from "@/tools/apis";
import {ajax} from "@/tools/ajax";

export default {
  name: "AttractionComment",
  components: {
    CommentItem,
  },
  data () {
    return {
      id: '',
      comment_list: [],
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
    getCommentList () {
      const url = apis.commentListUrl.replace('#{id}', this.id)
      ajax.get(url).then(({data : {object}}) => {
        this.comment_list = object
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
    },
    loadData () {
      this.id = this.$route.params.id
      this.getCommentList()
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>
