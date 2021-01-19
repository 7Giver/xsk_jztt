<template>
  <view id="app" v-cloak>
    <u-tabs
      bg-color="#fafafa"
      :bold="bold"
      :active-color="activeColor"
      :list="tabList"
      @change="tabChange"
      :current="current"
      :is-scroll="isScroll"
    ></u-tabs>
    <view class="picker_wrap">
      <view class="clamp_one">字符大小：</view>
      <picker @change="fontPickerChange" :value="fontIndex" :range="fontArray">
        <view class="uni-input">{{ fontArray[fontIndex] }}</view>
      </picker>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      fontIndex: 1,
      fontArray: ["小", "中", "大"],
      current: 0,
      sectionCurrent: 0,
      isScroll: true,
      tabCountIndex: 0,
      activeColor: this.$u.color["primary"],
      bold: true,
      control: true,
      offset: [5, -5],
      tabList: [
        {
          name: "关注",
          count: 100,
        },
        {
          name: "推荐",
          count: 7,
        },
        {
          name: "电影",
        },
        {
          name: "电视剧",
        },
        {
          name: "小视频",
        },
        {
          name: "游戏",
        },
        {
          name: "校园",
        },
        {
          name: "影视",
        },
        {
          name: "音乐",
        },
      ],
    };
  },
  onShow() {
    console.log(window.document.documentElement);
  },
  methods: {
    // tabs切换
    tabChange(index) {
      this.current = index;
    },
    fontPickerChange(e) {
      // console.log("picker发送选择改变，携带值为", e.target.value);
      this.fontIndex = e.target.value;
      window.document.documentElement.setAttribute("data-size", e.target.value);
    },
  },
};
</script>

<style lang="scss">
#app {
  // padding: 1rem;
  .picker_wrap {
    display: flex;
    align-items: center;
  }
}
</style>
