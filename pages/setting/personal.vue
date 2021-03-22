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
          <u-cell-item title="头像" @click="chooseAvatar" style="padding: 16rpx 32rpx;">
            <u-avatar :src="userInfo.avatar" size="80" slot="right-icon"></u-avatar>
          </u-cell-item>
          <u-cell-item
            title="昵称"
            :value="userInfo.nickname || '请输入昵称'"
            @click="showEdit('nickname')"
          ></u-cell-item>
          <u-cell-item title="个人简介" @click="showEdit('intro')">
            <view class="right_title" slot="right-icon">{{userInfo.intro || '请输入个人简介'}}</view>
          </u-cell-item>
          <u-cell-item title="性别" :value="sexLabel" @click="showSexPicker=true"></u-cell-item>
          <u-cell-item title="地址" :value="userInfo.address || '请选择'" @click="showCityPicker=true"></u-cell-item>
          <u-cell-item
            title="出生年月"
            :value="userInfo.birthday || '请选择'"
            @click="showDatePicker=true"
          ></u-cell-item>
        </u-cell-group>
      </view>
      <view class="submit_wrap">
        <u-button @click="postEdit">提交</u-button>
      </view>
    </view>
    <!-- 编辑弹窗 -->
    <u-popup v-model="showDialog" mode="bottom">
      <view class="dialog_wrap">
        <view class="navbar">
          <view class="btn" @click="cancleEdit">取消</view>
          <view class="title">
            <text v-if="dialogType == 'nickname'">修改昵称</text>
            <text v-if="dialogType == 'intro'">修改个人简介</text>
          </view>
          <view class="btn" @click="confimEdit">完成</view>
        </view>
        <view class="container">
          <template v-if="dialogType == 'nickname'">
            <u-input
              v-model="userInfo.nickname"
              height="80"
              maxlength="10"
              :focus="true"
              :custom-style="inputStyle"
              placeholder="请输入昵称"
            />
          </template>
          <template v-if="dialogType == 'intro'">
            <u-input
              v-model="userInfo.intro"
              type="textarea"
              height="180"
              maxlength="20"
              :focus="true"
              :custom-style="inputStyle"
              placeholder="请输入个人简介"
            />
          </template>
        </view>
      </view>
    </u-popup>
    <!-- 性别选择 -->
    <u-select
      v-model="showSexPicker"
      :list="sexList"
      :default-value="[userInfo.sex]"
      @confirm="sexConfirm"
    ></u-select>
    <!-- 城市选择 -->
    <u-picker mode="region" v-model="showCityPicker" @confirm="cityConfirm" />
    <!-- 生日选择 -->
    <u-picker mode="time" v-model="showDatePicker" @confirm="dateConfim"></u-picker>
  </view>
</template>

<script>
// import Cropper from "cropperjs"; // 裁剪需求暂时用uView
import { editUser, getCityList, getUserInfo, uploadImage } from "@/api/home.js";
export default {
  data() {
    return {
      userInfo: {
        avatar: "",
        nickname: "",
        intro: "",
        sex: 0,
        address: "",
        birthday: "",
      },
      dialogType: "", // 编辑弹窗类型
      showDialog: false, //展示编辑弹窗
      showSexPicker: false,
      showCityPicker: false,
      showDatePicker: false,
      inputStyle: {
        padding: "20rpx 30rpx",
      },
      sexList: [
        {
          value: 1,
          label: "男",
        },
        {
          value: 2,
          label: "女",
        },
      ],
      cityList: [],
      // valueStyle: {
      //   "overflow": "hidden",
      //   "word-break": "break-all",
      //   "text-overflow": "ellipsis",
      //   "display": "-webkit-box",
      //   "-webkit-box-orient": "vertical",
      //   "-webkit-line-clamp": "1",
      // },
    };
  },
  computed: {
    // 性别显示字段
    sexLabel() {
      return this.userInfo.sex
        ? this.userInfo.sex == 1
          ? "男"
          : "女"
        : "请选择";
    },
  },
  created() {
    uni.$on("uAvatarCropper", (path) => {
      this.userInfo.avatar = path;
      this.postResultImage(path);
    });
  },
  onLoad(options) {
    // this.getCityData();
    this.initUserData();
  },
  methods: {
    // 载入用户信息
    initUserData() {
      let copyUser = Object.assign({}, this.vuex_user);
      this.userInfo.avatar = copyUser.avatar;
      this.userInfo.nickname = copyUser.name;
      this.userInfo.intro = copyUser.intro;
      this.userInfo.sex = copyUser.sex;
      this.userInfo.address = copyUser.address || "";
      this.userInfo.birthday = copyUser.birthday || "";
    },
    // 跳转选择头像
    chooseAvatar() {
      this.$u.route({
        url: "/uview-ui/components/u-avatar-cropper/u-avatar-cropper",
        params: {
          destWidth: 300,
          rectWidth: 200,
          fileType: "jpg",
        },
      });
    },
    // 提交用户信息
    submit() {
      console.log(111);
    },
    // 弹出编辑窗口
    showEdit(type) {
      this.dialogType = type;
      this.showDialog = true;
    },
    // 取消编辑
    cancleEdit() {
      this.userInfo.nickname = this.vuex_user.name;
      this.userInfo.intro = this.vuex_user.intro;
      this.showDialog = false;
    },
    // 完成资料编辑
    confimEdit() {
      this.$u.vuex("vuex_user.name", this.userInfo.nickname);
      this.$u.vuex("vuex_user.intro", this.userInfo.intro);
      this.showDialog = false;
    },
    // 性别选择确定
    sexConfirm(e) {
      this.userInfo.sex = e[0].value;
    },
    // 城市选择确定
    cityConfirm(e) {
      // console.log(e);
      this.userInfo.address = `${e.province.label} ${e.city.label}`;
    },
    // 日期选择确定
    dateConfim(e) {
      // console.log(e);
      this.userInfo.birthday = `${e.year}-${e.month}-${e.day}`;
    },
    // 获取城市列表
    async getCityData() {
      let { data } = await getCityList();
      this.cityList = data;
    },
    // 获取用户数据
    async getUserData() {
      let { data } = await getUserInfo(this.vuex_token);
      this.$u.vuex("vuex_user", data);
    },
    // 提交用户信息
    async postEdit() {
      let params = {
        token: this.vuex_token,
        avatar: this.userInfo.avatar,
        name: this.userInfo.nickname,
        sex: this.userInfo.sex,
        intro: this.userInfo.intro,
        address: this.userInfo.address,
        birthday: this.userInfo.birthday,
      };
      let { data } = await editUser(params);
      this.getUserData();
    },
    // 上传裁剪后头像
    async postResultImage(path) {
      let file = {
        name: "image",
        filePath: path,
      };
      let { data } = await uploadImage(file);
      this.userInfo.avatar = data.url;
      this.$u.vuex("vuex_user.avatar", data.url);
    },
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
.setting-page {
  /deep/.u-cell_right {
    max-width: 45%;
  }
  .right_title {
    color: #909399;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
.submit_wrap {
  padding: 100rpx 0 30rpx;
  .u-btn {
    width: 90%;
    margin: 0 auto;
  }
}
.dialog_wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 2.6;
    .title {
      font-weight: bold;
      font-size: 32rpx;
      letter-spacing: 1rpx;
    }
    .btn {
      font-size: 30rpx;
      padding: 0 30rpx;
    }
  }
  .container {
    flex: 1;
    padding: 20rpx 0;
    background: #f2f2f2;
    .u-input {
      font-size: 30rpx;
      background: #fff;
    }
  }
}
</style>
