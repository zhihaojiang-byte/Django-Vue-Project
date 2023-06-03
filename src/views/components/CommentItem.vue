<template>
  <div class="comment-item">
    <div class="comment-header">
      <van-rate class="rating" v-model="local_item.rating" allow-half icon="like" void-icon="like-o" readonly />
      <div class="user">{{local_item.user.username || 'Anonymous'}} - {{local_item.create_at}}</div>
    </div>
    <div class="comment-content">
      <p>{{local_item.content}}</p>
    </div>
    <div class="comment-images">
      <van-image
          v-for="(images, i) in local_item.images" :key="i"
          class="image" @click="handleImageClick"
          fit="cover"
          :src="images.img_url"
      />
      <van-image-preview v-model="show" :images="imageUrls" @change="onChange" closeable >
        <template v-slot:index>{{index + 1}} of {{imageUrls.length}}</template>
      </van-image-preview>
    </div>
  </div>
</template>

<script>

export default {
  name: "CommentItem",
  props: ['item'],
  data () {
    return {
      local_item : {},
      show: false,
      index: 0,
      images: [],
    }
  },
  computed: {
    imageUrls () {
      return this.item.images.map(i => i.img_url)
    }
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    handleImageClick() {
      this.show = true
    },
  },
  created() {
    this.local_item = this.item
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  padding: 10px 16px 20px 16px;
  margin-bottom: 1px;
  background: white;
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user {
      font-size: 14px;
    }
  }
  .comment-content{
    color:  #616161;
    line-height: 1.5;
    font-size: 13px;
  }
  .comment-images{
    .image{
      width: 100px;
      height: 100px;
      margin: 0 5px 5px 0;
    }
  }
}
</style>
