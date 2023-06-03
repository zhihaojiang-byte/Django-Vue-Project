<template>
  <div class="page-account-login">
<!--    header-->
    <van-nav-bar
        class="header"
        left-arrow
        @click-left="goBack"
        title="User login"
    />
<!--    welcome text-->
    <div class="welcome">
      Welcome to Fun Booking.
    </div>
<!--    form-->
    <van-form @submit="onSubmit" class="form">
      <van-field
          v-model="form.email"
          name="email"
          label="Email"
          placeholder="Email"
          :rules="rule.email"
          clearable
          maxlength="50"
      />
      <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="Password"
          placeholder="password"
          :rules="rule.password"
          clearable
          maxlength="50"
      />
      <div class="button">
        <van-button round block type="info" native-type="submit">Login</van-button>
      </div>
    </van-form>
<!--    text-->
    <div class="text">
      <TermsAndPrivacy />
      <div class="register">
        New user?<router-link class="link" :to="{name: 'AccountRegister'}">Click to register</router-link>.
      </div>
    </div>
<!--    copyright-->
    <CopyRight class="copyright" />
    <!--    footer bav bar-->
    <FooterBar :active="2" />
  </div>
</template>

<script>
import CopyRight from "@/views/components/CopyRight.vue";
import {ajax} from "@/tools/ajax";
import {apis} from "@/tools/apis";
import FooterBar from "@/views/components/FooterBar.vue";
import TermsAndPrivacy from "@/views/components/TermsAndPrivacy.vue";

export default {
  name: "AccountLogin",
  components: {
    CopyRight,
    FooterBar,
    TermsAndPrivacy,
  },
  data () {
    return {
      form: {
        password: '',
        email: '',
      },
      rule: {
        email: [{required: true, message: 'Please input email'}],
        password: [{required: true, message: 'Please input password'}],
      },
    }
  },
  methods: {
    // when user click the back button
    goBack () {
      this.$router.back(-1)
    },
    // when user submit the login form
    onSubmit () {
      // send the login info (email and password) to the login api
      ajax.post(apis.loginUrl, {
        email: this.form.email,
        password: this.form.password,
      }).then( () => {
        // info the user login success
        this.$notify({
          message: 'Login success',
          type: 'success'
        })
        // redirect the page to user account page
        // $router.replace make sure user will not log in again
        this.$router.replace({name: 'UserAccount'})
      }).catch( ({error_message}) => {
        // info the user error message
        this.$notify(error_message)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page-account-login{
  .header{

  }
  .welcome{
    padding: 16px 16px 32px;
    font-size: 18px;
    background: white;
    font-weight: bold;
    border-bottom: 1px solid #f6f6f6;
  }
  .form{
    .button{
      margin: 16px;
    }
  }
  .text{
    margin: 16px;
    font-size: 12px;
    color: #999;
    text-align: center;
    line-height: 18px;
    a{
      font-size: 12px;
      color: #999;
      text-decoration: underline;
    }
  }
  .copyright{
  }
}
</style>
