<template>
  <div class="page-order-submit">
    <!--    header-->
    <van-nav-bar
        class="header"
        left-arrow
        @click-left="goBack"
        title="Order"
    />
    <!--    ticket info-->
    <div class="ticket-info">
      <div class="ticket-info-content">
        <div class="left">
          <div class="ticket-title">{{ticket.name}}</div>
          <div class="ticket-desc">{{ticket.desc}}</div>
          <div class="tags" v-if="ticket.on_sale">
            <van-tag class="ticket-tag" mark type="danger">ON SALE</van-tag>
            <van-tag class="ticket-tag" mark type="danger">{{ticket.discount}}% off</van-tag>
          </div>
        </div>
        <div class="right">
          <div class="on_sale_price" v-if="ticket.on_sale"><span class="origin-price">${{ticket.price.toFixed(2)}}</span><span class="price">${{ticket.sell_price.toFixed(2)}}</span></div>
          <div class="price" v-else>${{ticket.sell_price}}</div>
          <van-button class="TicketDetailBtn" plain hairline type="info" @click="policyShow=true">Ticket Information</van-button>
          <van-popup
              class="policyPopup"
              v-model="policyShow"
              closeable
              position="bottom"
              :style="{ height: '80%' }"
              style="max-width: 600px; left: 50%; translate: -50%"
          >
           <div class="ticket-information">
             <div class="info"  v-if="ticket_info" v-html="ticket_info.info"></div>
             <div class="info" v-else>Sorry, no ticket Information yet.</div>
           </div>
          </van-popup>
        </div>
      </div>
    </div>

<!--    ticket form-->
    <div class="ticket-form">
      <van-form @submit="onSubmit">
        <van-cell title="Quantity">
          <van-stepper v-model="orderForm.purchase_count" integer min="1"/>
        </van-cell>
        <van-field
            v-model="orderForm.full_name"
            name="name"
            label="Name"
            placeholder="Full Name"
            :rules="[{ required: true, message: 'Please input full name' }]"
        />
        <van-submit-bar currency="$" :price="totalTicketPrice" button-text="Check out" style="max-width: 600px; left: 50%; translate: -50%"/>
      </van-form>
    </div>

  </div>
</template>

<script>
import {ajax} from "@/tools/ajax";
import {apis} from "@/tools/apis";

export default {
  name: "SubmitOrder",
  data () {
    return {
      policyShow: false,
      orderForm: {
        purchase_count: 1,
        full_name: '',
      },
      ticket_id: '',
      ticket: {},
      ticket_info: '',
    }
  },
  computed: {
    totalTicketPrice() {
      return this.ticket.sell_price * this.orderForm.purchase_count * 100;
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    },
    onSubmit () {
      ajax.post(apis.OrderSubmitUrl, {
        ticket_id: this.ticket_id,
        ...this.orderForm,
      }).then( ({ data }) => {
        this.$router.replace({name: 'PayOrder', params: {sn: data.sn}})
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
    getTicketDetail(){
      ajax.get(apis.ticketDetailUrl.replace('#{id}', this.ticket_id)).then( ({data}) => {
        this.ticket = data
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
    },
    getTicketInformation(){
      ajax.get(apis.ticketInfoUrl.replace('#{id}', this.ticket_id)).then( ({data}) => {
        this.ticket_info = data
      }).catch(({error_message, status_code}) => {
        if(status_code !== 404){
          this.$notify(error_message)
        }
      })
    },
  },
  created() {
    this.ticket_id = this.$route.params.id;
    this.getTicketDetail();
    this.getTicketInformation()
  }
}
</script>

<style lang="less" scoped>
.page-order-submit{
  .ticket-info{
    background: white;
    padding: 16px 20px;
    margin-bottom: 1px;
  }
  .ticket-title{
    font-size: 20px;
    margin-bottom: 10px;
  }
  .ticket-info-content{
    display: flex;
    justify-content: space-between;
    .left{
      .ticket-desc{
        color: gray;
        margin-bottom: 10px;
      }
      .ticket-tag{
        margin-right: 10px;
      }
    }
    .right{
      text-align: right;
      .origin-price{
        color: #ff9800;
        margin-right: 5px;
        text-decoration: line-through;
      }
      .price{
        color: #ff9800;
        font-size: 20px;
        font-weight: bold;
      }
      .TicketDetailBtn{
        margin-top: 10px;
        font-size: 10px;
        width: 60px;
        height: 30px;
      }
      .ticket-information{
        margin: 50px 30px;
        text-align: left;
      }
    }
  }
}

</style>
