import store from "@/store";
import { RouterMount, createRouter } from "uni-simple-router";

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
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
      return next({ name: "index" });
    } else {
      return next();
    }
  }
  /* has no token*/
  if (to.name !== "login" && to.name !== "index" && to.name !== "tagOff") {
    return next({ name: "login" });
  }
  next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
  // console.log("跳转结束");
});

export { router, RouterMount };
