import store from "@/store";
import { RouterMount, createRouter, runtimeQuit } from "uni-simple-router";

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routerErrorEach: ({ type, msg }) => {
    console.log({ type, msg });
    // #ifdef APP-PLUS
    if (type === 3) {
      router.$lockStatus = false;
      uni.showModal({
        content: "确定退出应用？",
        success: function (res) {
          if (res.confirm) {
            plus.runtime.quit();
          }
        },
      });
    }
    // #endif
  },
  routes: [
    ...ROUTES,
    {
      path: "*",
      redirect: (to) => {
        return { name: "404" };
      },
    },
  ],
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  let lifeData = uni.getStorageSync("lifeData");
  const hasToken = lifeData.vuex_token;
  if (hasToken) {
    // if (to.name === "login" || to.name === "index") {
    if (to.name === "login") {
      // if is logged in, redirect to the home page
      return next({ name: "splash" });
    } else {
      return next();
    }
  }
  /* has no token*/
  if (to.name !== "login" && to.name !== "splash" && to.name !== "tagOff") {
    return next({ name: "login" });
  }
  next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
  // console.log("跳转结束");
});

export { router, RouterMount };
