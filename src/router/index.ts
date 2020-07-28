import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import routes from './router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// const setTitle = (routeItem, vm) => {
//   const handledRoute = getRouteTitleHandled(routeItem);
//   const pageTitle = showTitle(handledRoute, vm);
//   const resTitle = pageTitle ? `${title} - ${pageTitle}` : title;
//   window.document.title = resTitle;
// };
// const getRouteTitleHandled = (route) => {
//   let router = { ...route };
//   let meta = { ...route.meta };
//   let title = "";
//   if (meta.title) {
//     if (typeof meta.title === "function") {
//       meta.__titleIsFunction__ = true;
//       title = meta.title(router);
//     } else title = meta.title;
//   }
//   meta.title = title;
//   router.meta = meta;
//   return router;
// };
// const showTitle = (item, vm) => {
//   let { title, __titleIsFunction__ } = item.meta;
//   if (!title) return;
//   if (useI18n) {
//     if (title.includes("{{") && title.includes("}}") && useI18n)
//       title = title.replace(/({{[\s\S]+?}})/, (m, str) =>
//         str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim()))
//       );
//     else if (__titleIsFunction__) title = item.meta.title;
//     else title = vm.$t(item.name);
//   } else title = (item.meta && item.meta.title) || item.name;
//   return title;
// };
router.beforeEach((to, from, next) => {
  // console.log("router.beforeEach");
  next()
})
router.afterEach(to => {
  // setTitle(to, router.app)
})

export default router
