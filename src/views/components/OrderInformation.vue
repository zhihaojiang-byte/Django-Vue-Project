<template>
<div class="page-order-information">
  <!--    order information-->
  <van-cell title="Order information" size="large"/>
  <van-field label="Order#" :value="order.sn" readonly />
  <van-card
      v-for="(item, index) in order.order_items"
      :key="index"
      :num="item.count"
      :price="item.flash_sell_price.toFixed(2)"
      :desc="item.flash_desc"
      :title="item.flash_name"
      :thumb="item.flash_image"
      :origin-price="item.flash_discount!==0?item.flash_price.toFixed(2):null"
      currency = '$'
      :tag="item.flash_discount!==0?'sale':null"
  />
</div>
</template>

<script>
export default {
  name: "OrderInformation",
  props: ['order'],

}
</script>

<style scoped>

</style>
