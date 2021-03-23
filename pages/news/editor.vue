<template>
  <view>
    <u-navbar back-text="取消" title=" " :is-fixed="true" :border-bottom="true">
      <view class="navbar-right" slot="right">
        <view class="edit_btn" :class="{ on: canSubmit }" @click="editWorks">发布</view>
      </view>
    </u-navbar>
    <jinEdit placeholder="请输入内容" @editOk="editOk" uploadFileUrl="/#"></jinEdit>
  </view>
</template>

<script>
import jinEdit from "@/components/jin-edit/jin-edit.vue";
export default {
  components: {
    jinEdit,
  },
  data() {
    return {
      canSubmit: false,
    };
  },
  methods: {
    // 点击发布
    editOk(res) {
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
$mainColor: #f04323;
/deep/.u-icon--right {
  display: none;
}
.navbar-right {
  margin-right: 30rpx;
  display: flex;
  .edit_btn {
    color: #999;
  }
  .on {
    color: $mainColor;
  }
}
</style>