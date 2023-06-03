<template>
<div class="page-term-privacy">
  <div class="policy">
    By proceeding, you agree to our <a @click="onTerms">Terms of Use</a> and confirm you have read our <a @click="onPrivacy">Privacy and Cookie Statement</a>.
  </div>
  <van-popup
      class = "popup"
      v-model="termsShow"
      closeable
      position="bottom"
      :style="{ height: '80%' }"
      style="max-width: 600px; left: 50%; translate: -50%"
  >
    <div>
      <p>
        As a condition of your use of the Services, you warrant that (i) all information supplied by via the Services to the Companies is true, accurate, current and complete, (ii) if you are an Account Holder, you will safeguard your account information and will supervise and be completely responsible for any use of your account by anyone other than you, (iii) you are 13 years of age or older (in some jurisdictions, local laws may have an older age requirement) in order to register for an account, use the Services and contribute to our websites, and (iv) you possess the legal authority to enter into this Agreement and to use the Services, including our websites in accordance with all terms and conditions herein. The Companies do not knowingly collect the information of anyone under the age of 13. We retain the right at our sole discretion to deny anyone access to the Services, at any time and for any reason, including, but not limited to, for violation of this Agreement. By using the Services, including any products or services that facilitate the sharing of Content to or from third party sites, you understand that you are solely responsible for any information that you share with the Companies. You may access the Services solely as intended through the provided functionality of the Services and as permitted under this Agreement.
      </p>
    </div>
  </van-popup>
  <van-popup
      class = "popup"
      v-model="privacyShow"
      closeable
      position="bottom"
      :style="{ height: '80%' }"
      style="max-width: 600px; left: 50%; translate: -50%"
  >
    <div>
      <p>
        The company owns and operates an online platform that provides users with information, recommendations and services related to travel and leisure, including tools for researching and/or booking hotels, rentals and other accommodations, attractions and experiences, restaurants, flights, and cruises, among other leisure-related services. In this Statement, we refer to these as our “Services”.
      </p>
    </div>
  </van-popup>
</div>
</template>

<script>
export default {
  name: "TermsAndPrivacy",
  data () {
    return {
      termsShow: false,
      privacyShow: false,
    }
  },
  methods: {
    onTerms() {
      this.termsShow = true
    },
    onPrivacy() {
      this.privacyShow = true
    },
  },
}
</script>

<style lang="less" scoped>
.page-term-privacy{
  .popup{
    padding-top: 50px;
    >div{
      margin: 0 20px;
      text-align: left;
      text-indent: 2rem;
    }
  }
  a{
    font-size: 12px;
    color: #999;
    text-decoration: underline;
  }
}
</style>
