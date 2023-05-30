<template>
<div class="page-user-account">
<!--  user info-->
  <div class="user-info">
    <div class="avatar">
<!--      <img src="/static/mine/avatar.png" alt="">-->
      <van-image
          class="img"
          round
          :src=user.avatar
          fit="cover"
          @click="changeAvtar"
      />
    </div>
    <div>
      <p>Welcome back, {{user.username}}</p>
      <p><a @click="userLogout">Logout</a></p>
    </div>
  </div>

  <div class="list">
<!--    user profile-->
    <div class="item" @click="showPopup">
      <van-icon class="icon" name="user-circle-o" />
      <span>Profile</span>
    </div>
    <van-popup class="popup" v-model="show" closeable position="bottom" :style="{ height: '20%' }">
      <van-field :value="user.username" label="Username" readonly />
      <van-field :value="user.email" label="Email" readonly />
    </van-popup>
<!--    order info-->
    <RouterLink class="item" :to="{name: 'OrderList', params: {status: '0'}}">
      <van-icon class="icon" name="orders-o" />
      <span>My orders</span>
    </RouterLink>
  </div>
  <!--    footer bav bar-->
  <FooterBar :active="2" />
</div>
</template>

<script>
import {ajax} from "@/tools/ajax";
import {apis} from "@/tools/apis";
import FooterBar from "@/views/components/FooterBar.vue";


export default {
  name: "UserAccount",
  components: {
    FooterBar,
  },
  data () {
    return {
      user: {},
      show: false,
    }
  },
  methods: {
    getUserInfo () {
      ajax.get(apis.infoUrl).then( ({data}) => {
        this.user = data
      }).catch(({status_code, error_message}) => {
        if (status_code === 401) {
          this.$router.replace({name: 'AccountLogin'})
        } else {
          this.$notify(error_message)
        }
      })
    },
    userLogout () {
      ajax.get(apis.logoutUrl).then( () => {
        this.$notify({
          message: 'Logout success',
          type: 'success'
        })
        this.$router.go()
      }).catch(({error_message}) => {
        this.$notify(error_message)
      })
    },
    showPopup() {
      this.show = true;
    },
     changeAvtar(){
       this.$notify('The function of uploading avatar is under development')
     },
  },
  created() {
    this.getUserInfo()
  },
}
</script>

<style lang="less" scoped>
.page-user-account{
  margin-bottom: 50px;
  .header{}
  .user-info{
    height: 250px;
    background-image: linear-gradient(#004e92, #000428);
    text-align: center;
    p, a{
      color: #f6f6f6;
      font-size: 16px;
    }
    .avatar{
      .img{
        margin-top: 40px;
        width: 110px;
        height: 110px;
      }
    }
  }
  .list{
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .popup{
      padding-top: 50px;
    }
    .item {
      color: #000428;
      font-size: 14px;
      width: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon{
        font-size: 30px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
