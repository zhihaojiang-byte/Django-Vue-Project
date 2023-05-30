<template>
  <van-button
      native-type="button"
      size="small"
      type="primary"
      @click="sendCode"
      :loading="isLoading"
      loading-text="Sending..."
      :disabled="isSent">
    {{btnText}}
  </van-button>
</template>

<script>
import {ajax} from "@/tools/ajax";
import {apis} from "@/tools/apis";

export default {
  name: "SendCode",
  props: ['email', 'pattern'],
  data() {
    return {
      isSent: false,
      isLoading: false,
      btnText: 'Get code',
      counter: 30,
      timer: null,
    }
  },
  methods: {
    countDown () {
      this.btnText = `Get code (${this.counter}s)`
      this.counter -= 1
      this.timer = setInterval(() => {
        this.btnText = `Get code (${this.counter}s)`
        this.counter -= 1
        if (this.counter < 0) {
          this.reset()
        }
      },1000)
    },
    reset () {
      clearInterval(this.timer)
      this.isSent = false
      this.btnText = "Get code"
      this.counter = 30
    },
    sendCode () {
      if (!this.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)) {
        this.$notify('Please input a valid email address.')
        return
      }

      this.isLoading = true

      ajax.post(apis.sendVerificationUrl, {
        email: this.email
      }).then(() => {
        this.isLoading = false
        this.$notify({
          message: 'Verification code is sent to your email. Please check.',
          duration: 1000*5,
          type: 'success',
        })
        this.isSent = true
        this.countDown()
      }).catch(({error_message}) => {
        this.isLoading = false
        this.$notify({
          message: error_message,
          duration: 1000*3,
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
