<template>
  <div class="page-attraction-detail">
<!--    header-->
    <van-nav-bar
        left-arrow
        @click-left="goBack"
    />
<!--    banner-img-->
    <router-link class="attraction-banner" :to="{name: 'AttractionImages', params: {id:id}}">
      <van-image class="attraction-banner-img" height="50vw" fit="cover" :src="attraction_detail.banner_img_url"/>
      <div class="img_text">
        <span class="name">{{attraction_detail.name}}</span>
        <span class="image-count">view {{attraction_detail.images_count}} more images</span>
      </div>
    </router-link>
<!--    info and rating-->
    <div class="attraction-info">
      <router-link class="left" :to="{name: 'AttractionComment', params: {id:id}}">
        <div class="primary">
          <van-rate class="rating" v-model="attraction_detail.rating" allow-half icon="like" void-icon="like-o" readonly />
          <van-icon class="arrow" name="arrow" />
        </div>
        <div class="secondary">{{attraction_detail.comment_count}} ratings</div>
      </router-link>
      <router-link class="right" :to="{name: 'AttractionInfo', params: {id: id}}">
        <div class="primary">
          Information
          <van-icon class="arrow" name="arrow" size="100%" />
        </div>
        <div class="secondary">check here for more details</div>
      </router-link>
    </div>
<!--    address-->
    <van-cell class="address" :title="attractionAddress" icon="location-o">
    </van-cell>
<!--    attraction ticket title-->
    <van-cell class="attraction-ticket-title" title="Tickets" icon="bookmark-o">
    </van-cell>
<!--    attraction ticket item-->
    <div class="ticket-item" v-for="item in ticket_list" :key="'t'+item.id">
      <div class="left">
        <div class="title">{{item.name}}</div>
        <div class="ticket-info">{{item.desc}}</div>
        <div class="tags" v-if="item.on_sale">
          <van-tag class="ticket-tag" mark type="danger">ON SALE</van-tag>
          <van-tag class="ticket-tag" mark type="danger">{{item.discount}}% off</van-tag>
        </div>
      </div>
      <div class="right">
        <div class="on_sale_price" v-if="item.on_sale"><span class="origin-price">${{item.price.toFixed(2)}}</span><span class="price">${{item.sell_price.toFixed(2)}}</span></div>
        <div class="price" v-else>${{item.sell_price.toFixed(2)}}</div>
        <router-link :to="{name: 'SubmitOrder', params: {id: item.id}}">
          <van-button class="book-btn" type="warning" size="small">Book</van-button>
        </router-link>
      </div>
    </div>
<!--    attraction comment title-->
    <van-cell class="attraction-comment-title" title="Comments" icon="comment-o" @click="showPopup">
      <span style="color: orange; cursor: pointer">Leave a comment </span>
    </van-cell>
<!--    leave your comment popup-->
    <van-popup
        class = "comment-popup"
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '60%'}"
        style="max-width: 600px; left: 50%; translate: -50%"
    >
      <van-form @submit="onSubmit">
        <van-field name="rate" label="Rate">
          <template #input>
            <van-rate v-model="rate" allow-half icon="like" void-icon="like-o"/>
          </template>
        </van-field>
        <van-field
            v-model="user_comment"
            rows="6"
            autosize
            name="comment"
            label="Comment"
            type="textarea"
            maxlength="200"
            placeholder="please leave your comment"
            show-word-limit
            :rules="[{ required: true, message: 'please leave your comment' }]"
        />
        <van-field name="uploader" label="images">
          <template #input>
            <van-uploader multiple :max-size="500 * 1024" @oversize="onOversize"  v-model="fileList" :max-count="6" :after-read="afterRead"/>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">Post</van-button>
        </div>
      </van-form>
    </van-popup>
<!--    attraction comment item-->
    <CommentItem v-for="item in comment_list" :key="'c'+item.id" :item="item"/>
<!--    attraction comment footer-->
    <router-link class="more-link" :to="{name: 'AttractionComment', params: {id:id}}">Read More</router-link>
  </div>
</template>

<script>
import CommentItem from "@/views/components/CommentItem.vue";
import {apis} from "@/tools/apis";
import {ajax} from "@/tools/ajax";

export default {
  name: "AttractionDetail",
  components: {
    CommentItem,
  },
  data () {
    return {
      id: '',
      attraction_detail: {},
      ticket_list: [],
      comment_list: [],
      show: false,

      user_comment: "",
      rate: 5.0,
      fileList: [],
    }
  },
  computed: {
    attractionAddress () {
      if (this.attraction_detail.address) {
        return this.attraction_detail.address
      }
      return this.attraction_detail.city + ', ' + this.attraction_detail.province
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
    getAttractionDetail () {
      const url = apis.attractionDetailUrl.replace('#{id}', this.id)
      ajax.get(url).then(({data}) => {
        this.attraction_detail = data
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
    },
    getTicketList () {
      const url = apis.ticketListUrl.replace('#{id}', this.id)
      ajax.get(url).then(({data : {object}}) => {
        this.ticket_list = object
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
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
      this.getAttractionDetail()
      this.getTicketList()
      this.getCommentList()
    },
    showPopup() {
      this.show = true;
    },
    onOversize() {
      this.$notify('The file size cannot exceed 500kb');
    },
    afterRead(fileList) {
      this.$notify('The function of uploading image is under development')
      console.log(fileList);
    },
    onSubmit() {
      ajax.post(apis.commentPostUrl, {
        attraction: this.id,
        rating: this.rate,
        content: this.user_comment
      }).then( () => {
        this.$notify({
          message: "comment submitted",
          type: "success",
        })
        this.loadData()
        this.show = false;
      }).catch( ({error_message, status_code}) => {
        if(status_code===401){
          this.$dialog.confirm({
            message: 'Please login.',
          }).then(() => {
            this.$router.replace({name: 'UserAccount'})
          }).catch(() => {});
        }else {
          this.$notify({
            message: error_message,
            duration: 1000*5,
          })
        }
      })
    },
  },
  created() {
    this.loadData()
  }
}
</script>

<style lang="less" scoped>
.page-attraction-detail {
  .attraction-banner {
    display: grid;
    position: relative;
    .attraction-banner-img {
      max-height: 300px;
      width: 100%;
    }
    .img_text {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      background: rgba(0,0,0,0.4);
      width: 100%;
      height: 30px;
      color: white;
      padding: 0 16px;
      align-items: center;
      .image-count{

      }
    }
  }
  .attraction-info {
    display: flex;
    justify-content: space-around;
    background: #fff;
    border-bottom: 1px solid #f6f6f6;
    .left, .right{
      flex: 1;
      padding: 16px;
    }
    .primary {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
    }
    .secondary {
      color: #999;
      font-size: 12px;
      padding: 5px 0;
    }
  }
  .address{
    //background: #f6f6f6;
  }
  .attraction-ticket-title {
    padding-top: 10px;
    //background: #f6f6f6;
  }
  .ticket-item{
    display: flex;
    justify-content: space-between;
    background: white;
    margin-bottom: 1px;
    .left, .right{
      padding: 16px;
    }
    .left{
      .title{
        font-size: 16px;
        margin-bottom: 5px;
      }
      .ticket-info{
        font-size: 12px;
        margin-bottom: 5px;
        color: #999;
      }
      .ticket-tag{
        //background: #999;
        margin-right: 5px;
      }
    }
    .right {
      text-align: right;
      .price{
        font-size: 16px;
        font-weight: bold;
        color: #ff9800;
        margin-bottom: 5px;
      }
      .origin-price{
        color: #ff9800;
        margin-right: 5px;
        text-decoration: line-through;
      }
      .book-btn{
        font-size: 14px;
      }
    }
  }
  .attraction-comment-title{
    padding-top: 10px;
    background: white;
  }
  .comment-popup{
    padding-top: 50px;
  }
  .more-link {
    padding: 16px;
    display: grid;
    place-items: center center;
    color: #666666;
    margin: auto;
    background: white;
  }
}

</style>
