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
      <u-upload ref="uUpload" name="image" :action="action" :auto-upload="true" :before-upload="beforeUpload"></u-upload>
    </view>
  </view>
</template>

<script>
import Cropper from "cropperjs";
import { editUser, uploadImage } from "api/home.js";
export default {
  data() {
    return {
      action: "http://bssdzs188.com/v1/default/upload",
    };
  },
  onLoad(options) {
    // console.log(this.$store.state.vuex_user);
  },
  methods: {
    // 提交用户信息
    async postEdit() {
      let params = {
        token: this.vuex_token,
        avatar: this.vuex_user.avatar,
        name: this.vuex_user.avatar,
        intro: this.vuex_user.intro,
        address: this.vuex_user.address,
        birthday: this.vuex_user.birthday,
      };
      let { data } = await editUser(params);
    },
    submit() {
      // this.$refs.uUpload.upload();
    },
    // 上传前处理
    beforeUpload(file) {
      // console.log(file);
      // const form = new FormData();
      // form.append('file', file);
      // const { data } = await uploadImage(form);
      // console.log(data);
      // this.page2_logo_url = data.data;
      // this.form.image = data.data;
    }
  },
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
