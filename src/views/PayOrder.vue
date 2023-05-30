<template>
  <div class="page-order-pay">
<!--    header-->
    <van-nav-bar
        title="Order"
        left-arrow
        @click-left="cancelOrder"
    />

    <!--    order information-->
    <OrderInformation :order="order"></OrderInformation>

<!--    Billing address-->
    <van-cell title="Billing Information" size="large"/>
    <div class="ticket-form">
      <van-form @submit="onSubmit">
        <van-field
            v-model="payForm.full_name"
            name="full_name"
            label="Full name"
            placeholder="full name"
        />
        <van-field
            v-model="payForm.credit_number"
            name="credit_number"
            label="Credit card"
            placeholder="credit card number"
        />
        <van-field
            v-model="payForm.address"
            name="address"
            label="Address"
            placeholder="address"
        />
        <van-field
            v-model="payForm.city"
            name="city"
            label="City"
            placeholder="city"
        />
        <van-field
            v-model="payForm.country"
            name="country"
            label="Country"
            placeholder="country"
        />
        <van-field
            v-model="payForm.province"
            name="province"
            label="Province"
            placeholder="province"
        />
        <van-field
            v-model="payForm.telephone"
            name="telephone"
            label="Telephone"
            placeholder="telephone"
        />
        <van-submit-bar :price="order.purchase_amount * 100" currency = '$' button-text="Pay now"/>
      </van-form>
    </div>
  </div>


</template>

<script>
import {apis} from "@/tools/apis";
import {ajax} from "@/tools/ajax";
import OrderInformation from "@/views/components/OrderInformation.vue";


export default {
  name: "PayOrder",
  components: {
    OrderInformation,
  },
  data () {
    return {
      payForm: {
        full_name: '',
        address: '',
        city: '',
        country: '',
        province: '',
        telephone: '',
        credit_number: '',
      },
      order_sn: "",
      order:{},
    }
  },
  methods: {
    cancelOrder(){
      this.$dialog.confirm({
        title: 'Payment',
        message: 'You have not paid yet. Are you sure you want to cancel this payment?',
      }).then(() => {
        const url = apis.OrderDetailUrl.replace('#{sn}', this.order_sn)
        ajax.put(url).then( (res) => {
          if(res.status === 201){
            this.$notify({
              type: 'success',
              message : "Order cancelled.",
            })
          }
          this.$router.back(-1)
        }).catch(({error_message}) => {
          this.$notify(error_message)
        })
      }).catch(() => {
      });
    },
    getOrderDetail(){
      const url = apis.OrderDetailUrl.replace('#{sn}', this.order_sn)
      ajax.get(url).then( ({data}) => {
        this.order = data
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
    },
    onSubmit () {
      console.log("all billing info are being sent to third party payment center")
      // TODO send user billing info and total amount to third party payment server;
      // assume response with payment success, and return the third party paymentNumber
      // const thirdPartyPaymentNumber = "12345678"


      ajax.post(apis.OrderDetailUrl.replace('#{sn}', this.order_sn)).then( () => {
        this.$notify({
          message: 'payment success',
          type: 'success'
        })
        this.$router.replace({name: 'OrderList', params : {status: '0'}})
      }).catch( ({error_message}) => {
        this.$notify({
          message: error_message,
          duration: 1000*5,
        })
      })
    },
  },
  created() {
    this.order_sn = this.$route.params.sn
    this.getOrderDetail()
    this.$dialog.alert({message: "The payment function is still under development. No need to input billing information."})
  }
}
</script>

<style lang="less" scoped>
.page-order-pay{
  .title{
    margin-left: 18px;
  }
}

</style>
