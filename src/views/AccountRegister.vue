<template>
  <div class="page-account-register">
    <!--    header-->
    <van-nav-bar
        class="header"
        left-arrow
        @click-left="goBack"
        title="User Register"
    />
    <!--    welcome text-->
    <div class="welcome">
      Become a Fun Booking member.
    </div>
    <!--    form-->
    <van-form @submit="onSubmit" class="form">
      <van-field
          v-model="form.email"
          center
          name="email"
          label="Email"
          placeholder="Email address"
          :rules="rule.email"
          clearable
          maxlength="50"
      />
      <van-field
          v-model="form.verification_code"
          center
          name="verification"
          label="Verification"
          placeholder="Verification code"
          :rules="rule.verification_code"
          clearable
          maxlength="4"
      >
        <template #button>
          <SendCode ref="refSendCode" :email="form.email"/>
        </template>
      </van-field>
      <van-field
          v-model="form.username"
          center
          name="username"
          label="Username"
          placeholder="Username"
          :rules="rule.username"
          clearable
          maxlength="50"
      />
      <van-field
          v-model="form.password"
          center
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          :rules="rule.password"
          clearable
          maxlength="50"
      />
      <div class="button">
        <van-button round block type="info" native-type="submit">Register</van-button>
      </div>
    </van-form>
    <!--    text-->
    <div class="text">
      <TermsAndPrivacy />
      <div class="register">
        Already had an account? <router-link class="link" :to="{name: 'AccountLogin'}">Click to login</router-link>.
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
import SendCode from "@/views/components/SendCode.vue";
import {ajax} from "@/tools/ajax";
import {apis} from "@/tools/apis";
import FooterBar from "@/views/components/FooterBar.vue";
import TermsAndPrivacy from "@/views/components/TermsAndPrivacy.vue";

export default {
  name: "AccountRegister",
  components: {
    FooterBar,
    CopyRight,
    SendCode,
    TermsAndPrivacy,
  },
  data () {
    return {
      rule: {
        username: [{
          required: true,
          message: 'Please input username'
        }, {
          pattern: /^[A-Za-z0-9_]{6,30}$/,
          message: 'Username should be 6-30 long and only contain letters, numbers or underscores'
        }],
        verification_code: [{
          required: true,
          message: 'Please input verification code'
        },{
          pattern: /^[0-9]{4}$/,
          message: 'verification code should be 4 digits long'
        }],
        email: [{
          required: true,
          message: 'Please input email'
        },{
          pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: 'email address not valid'
        }],
        password: [{
          required: true,
          message: 'Please input password'
        },{
          pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,30}$/,
          message: 'Password should be 6~30 long, contains at least one letter, one number and one special character'
        }],
      },
      form: {
        email: '',
        password: '',
        username: '',
        verification_code: '',
      }
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    },
    onSubmit () {
      ajax.post(apis.registerUrl, {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
        verification_code: this.form.verification_code,
      }).then( () => {
        this.$notify({
          message: 'registration success',
          type: 'success'
        })
        this.$router.replace({name: 'UserAccount'})
      }).catch( ({error_message}) => {
        this.$notify({
          message: error_message,
          duration: 1000*5,
        })
        this.$refs.refSendCode.reset()
        this.form.verification_code = ""
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page-account-register{
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
