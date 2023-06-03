<template>
  <div class="page-attraction-images">
    <!--    header-->
    <van-nav-bar
        title="Images"
        left-arrow
        @click-left="goBack"
    />
    <div class="attraction-images">
      <van-image
          v-for="(images, i) in images" :key="i"
          class="image"
          fit="cover"
          :src="images.img_url"
          :alt="images.name"
      />

    </div>

  </div>
</template>

<script>

import {ajax} from "@/tools/ajax";
import {apis} from "@/tools/apis";

export default {
  name: "AttractionImages",
  data () {
    return {
      images: [],
      attraction_id: '',
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    },
    getAttractionImages() {
      ajax.get(apis.attractionImagesUrl.replace("#{id}", this.attraction_id)).then(({data: {object}}) => {
        this.images = object
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
    },
  },

  created() {
    this.attraction_id = this.$route.params.id
    this.getAttractionImages()
  }
}
</script>

<style lang="less" scoped>
.page-attraction-images{
  .attraction-images{
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    .image{
      width: 270px;
      height: 150px;
      margin: 10px auto;
    }
  }
}
</style>
