<template>
  <div class="page-order-list">
    <!--    header-->
    <van-nav-bar
        title="My orders"
        left-arrow
        @click-left="goBack"
    />
<!--    tab-->
    <van-tabs v-model="status" @click="handleTabClick">
      <van-tab
          v-for="(value, key, index) in orderStatus"
          :title="value"
          :key="index"
          :name="key"
      />
    </van-tabs>
<!--    order list-->
    <div class="order-list">
      <div class="order-list-item" v-for="(order, index) in orderList" :key="index" v-show="order.sn">
        <div class="order-head">
          <div class="order-number">Order Number: {{order.sn}}</div>
          <div class="order-status">{{orderStatus[order.status]}}</div>
        </div>
        <div class="order-detail">
          <div class="left">
            <van-image
                width="100"
                height="100"
                :src="order.first_order_item.flash_image"
            />
          </div>
          <div class="right">
            <div class="title">{{order.first_order_item.flash_name}}</div>
            <div class="desc">{{order.first_order_item.flash_desc}}</div>
          </div>
        </div>
        <div class="order-foot">
          <div class="summary">{{order.purchase_count}} tickets. Total ${{order.purchase_amount.toFixed(2)}}</div>
          <van-button class="btn" round size="small" type="warning" v-if="order.status===1" @click="handlePayBtn(order)">Pay now</van-button>
          <van-button class="btn" round size="small" type="danger" v-if="order.status===2 || order.status===3" @click="handleDeleteBtn(order)">Delete order</van-button>
          <van-button class="btn" round size="small" type="info" :to="{name: 'OrderDetail', params: {sn: order.sn}}">View details</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {apis} from "@/tools/apis";
import {ajax} from "@/tools/ajax";

export default {
  name: "OrderList",
  data () {
    return {
      orderStatus: {
        0: 'All',
        1: 'Pending',
        2: 'Complete',
        3: 'Cancelled',
      },
      status: '',
      orderList: [],
      totalItems: 0,
    }
  },
  watch: {
    $route(){
      this.LoadData();
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    },
    getOrderList() {
      ajax.get(apis.OrderListUrl, {
        params: {
          status: this.status
        }
      }).then(({data: {meta, object}}) => {
        this.totalItems = meta.total_count
        this.orderList = object
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
    },
    LoadData(){
      this.status = this.$route.params.status;
      this.getOrderList();
    },
    handleTabClick(tabName){
      this.$router.replace({name: 'OrderList', params: {status: tabName}})
    },
    handlePayBtn(order){
      this.$router.push({name: 'PayOrder', params: {sn: order.sn}})
    },
    handleDeleteBtn(order){
      this.$dialog.confirm({
        message: 'Are you sure to delete this order? Once it is deleted, it cannot be recovered',
      }).then(() => {
        const url = apis.OrderDetailUrl.replace('#{sn}', order.sn)
        ajax.delete(url).then( (res) => {
          if(res.status === 201){
            this.$notify({
              type: 'success',
              message : "Order deleted.",
            })
            order.sn = ""
          }
        }).catch(({error_message}) => {
          this.$notify(error_message)
        })
      }).catch(() => {});
    },
  },
  created() {
    this.LoadData()
  },
}


</script>

<style lang="less" scoped>
.page-order-list{
  .order-list{
    .order-list-item{
      background: white;
      padding: 10px 20px;
      margin-top: 1px;
    }
    .order-head{
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      .order-status{
        color: #ff9800;
      }
    }
    .order-detail{
      display: flex;
      gap: 20px;
      .title{
        font-size: 20px;
        margin: 10px 0;
      }
      .desc{
        color: gray;
      }
    }
    .order-foot{
      text-align: right;
      .summary{
        margin: 10px 0;
      }
      .btn{
        margin: 10px 0 10px 10px;
      }
    }

  }
}
</style>
