<script>
import store from "@/store";
import { getSystemConfig } from "@/api/home.js";
export default {
  onLaunch: function () {
    // console.log('App Launch');

    // 调取设备信息
    const systemInfo = uni.getSystemInfoSync();
    this.$u.vuex("vuex_system", systemInfo);

    // #ifdef APP-NVUE
    plus.screen.lockOrientation("portrait-primary");

    let appid = plus.runtime.appid;
    if (appid && appid.toLocaleLowerCase() != "hbuilder") {
      uni.request({
        url: "https://uniapp.dcloud.io/update", //检查更新的服务器地址
        data: {
          appid: plus.runtime.appid,
          version: plus.runtime.version,
        },
        success: (res) => {
          console.log("success", res);
          if (res.statusCode == 200 && res.data.isUpdate) {
            let openUrl =
              plus.os.name === "iOS" ? res.data.iOS : res.data.Android;
            // 提醒用户更新
            uni.showModal({
              title: "更新提示",
              content: res.data.note ? res.data.note : "是否选择更新",
              success: (showResult) => {
                if (showResult.confirm) {
                  plus.runtime.openURL(openUrl);
                }
              },
            });
          }
        },
      });
    }

    var domModule = weex.requireModule("dom");
    domModule.addRule("fontFace", {
      fontFamily: "texticons",
      src: "url('./static/text-icon.ttf')",
    });
    // #endif

    // 请求用户设置
    const token = store.state.vuex_token;
    token && this.getSystemDate(token);
  },
  onShow: function () {
    // console.log('App Show')
    // const token = store.state.vuex_token;
    // token && this.getSystemDate(token);
  },
  onHide: function () {
    // console.log('App Hide')
  },
  methods: {
    // 获取系统设置
    async getSystemDate(token) {
      let { data } = await getSystemConfig(token);
      this.$u.vuex("vuex_setting", data);
    },
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
// @import "@/static/css/app.scss";
// html {
//   @include add-size($uni-font-size-base);
// }
</style>
