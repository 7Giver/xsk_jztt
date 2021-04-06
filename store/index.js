import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let lifeData = {};

try {
  // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
  lifeData = uni.getStorageSync("lifeData");
} catch (e) {}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ["vuex_user", "vuex_token", "vuex_setting", "vuex_navBar", "vuex_tabbar"];

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    let tmp = uni.getStorageSync("lifeData");
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp ? tmp : {};
    tmp[key] = value;
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    uni.setStorageSync("lifeData", tmp);
  }
};
const store = new Vuex.Store({
  state: {
    vuex_user: lifeData.vuex_user ? lifeData.vuex_user : { name: "明月" },
    vuex_token: lifeData.vuex_token ? lifeData.vuex_token : "",
    vuex_setting: lifeData.vuex_setting ? lifeData.vuex_setting : { font: "中", article_seconds: 15 },
    vuex_system: {},
    vuex_navBar: [],
    vuex_tabbar: [
      {
        pagePath: "pages/news/news",
        iconPath: "/static/img/tabbar/icon_news.png",
        selectedIconPath: "/static/img/tabbar/icon_news_on.png",
        text: "新闻"
      },
      {
        pagePath: "pages/video/video",
        iconPath: "/static/img/tabbar/icon_video.png",
        selectedIconPath: "/static/img/tabbar/icon_video_on.png",
        text: "视频"
      },
      {
        pagePath: "pages/task/task",
        iconPath: "/static/img/tabbar/icon_task.png",
        selectedIconPath: "/static/img/tabbar/icon_task_on.png",
        text: "任务"
      },
      {
        pagePath: "pages/mine/mine",
        iconPath: "/static/img/tabbar/icon_mine.png",
        selectedIconPath: "/static/img/tabbar/icon_mine_on.png",
        text: "我的"
      },
    ],
    vuex_version: "1.0.1",
  },
  mutations: {
    $uStore(state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      let nameArr = payload.name.split(".");
      let saveKey = "";
      let len = nameArr.length;
      if (len >= 2) {
        let obj = state[nameArr[0]];
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len - 1]] = payload.value;
        saveKey = nameArr[0];
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value;
        saveKey = payload.name;
      }
      // 保存变量到本地，见顶部函数定义
      saveLifeData(saveKey, state[saveKey]);
    },
  },
});

export default store;
