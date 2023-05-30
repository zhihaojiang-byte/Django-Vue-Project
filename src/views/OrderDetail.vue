<template>
  <div class="page-order-detail">
    <!--    header-->
    <van-nav-bar
        title="Order Detail"
        left-arrow
        @click-left="goBack"
    />
    <!--    order information-->
    <OrderInformation :order="order"></OrderInformation>
    <div class="order-foot">
      <p>Order status: {{orderStatus[order.status]}}</p>
      <p class="summary">{{order.purchase_count}} tickets. Total ${{order.purchase_amount.toFixed(2)}}</p>
      <van-button class="btn" round size="small" type="warning" v-if="order.status===1" @click="handlePayBtn(order)">Pay now</van-button>
      <van-button class="btn" round size="small" type="danger" v-if="order.status===2 || order.status===3" @click="handleDeleteBtn(order)">Delete order</van-button>
    </div>
  </div>
</template>

<script>
import {apis} from "@/tools/apis";
import {ajax} from "@/tools/ajax";
import OrderInformation from "@/views/components/OrderInformation.vue";

export default {
  name: "OrderDetail",
  components: {OrderInformation},
  data () {
    return {
      order_sn: "",
      order:{},
      orderStatus: {
        0: 'All',
        1: 'Pending',
        2: 'Complete',
        3: 'Cancelled',
      },
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    },
    getOrderDetail(){
      const url = apis.OrderDetailUrl.replace('#{sn}', this.order_sn)
      ajax.get(url).then( ({data}) => {
        this.order = data
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
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
    this.order_sn = this.$route.params.sn
    this.getOrderDetail()
  }
}
</script>

<style lang="less" scoped>
.page-order-detail{
  .order-foot{
    margin-right: 20px;
    text-align: right;
    .summary{
      margin: 10px 0;
    }
    .btn{
      margin: 10px 0 10px 10px;
    }
  }

}
</style>
