<template>
  <view>
    <u-navbar title="个人资料" :is-fixed="true" :border-bottom="false">
      <view class="navbar-right" slot="right">
        <u-icon name="more-dot-fill" size="43" color="#333"></u-icon>
      </view>
    </u-navbar>
    <view class="setting-page">
      <view class="u-m-t-10">
        <u-cell-group :border="false">
          <u-cell-item title="头像" value="1788654"></u-cell-item>
					<u-cell-item title="昵称" value="Soul Power"></u-cell-item>
          <u-cell-item title="个人简介" value="请输入个人简介"></u-cell-item>
					<u-cell-item title="性别" value="请选择"></u-cell-item>
					<u-cell-item title="地址" value="请选择"></u-cell-item>
					<u-cell-item title="出生年月" value="请选择"></u-cell-item>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
page {
  background: #f2f2f2;
}
.navbar-right {
  margin-right: 30rpx;
  display: flex;
}
</style>
