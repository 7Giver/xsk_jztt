<template>
  <view id="app" v-cloak>
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
    };
	},
	onShow() {
		console.log(window.document.documentElement);
	},
  methods: {
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
  padding: 1rem;
  .picker_wrap {
    display: flex;
    align-items: center;
  }
}
</style>
