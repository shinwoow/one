/**
 * notes模块接口列表
 */

import base from "./base"; // 导入接口域名列表
import axios from "@/utils/http/http.ts"; // 导入http中创建的axios实例
import QS from 'qs'; // 根据需求是否导入qs模块

const baseURL = "/notes"

const notes = {
  // 新闻列表
  articleList() {
    return axios.get(`${base.sq}/topics`);
  },
  // 新闻详情,演示
  articleDetail(id: Number, params: Object) {
    return axios.get(`${base.sq}/topic/${id}`, {
      params: params
    });
  },
  // post提交
  login(params: Object) {
    return axios.post(`${base.sq}/accesstoken`, QS.stringify(params));
  },
  uploadNote(params: Object) {
    console.log(params)
    return axios.post(`${baseURL}/uploadNote`, QS.stringify(params));
  }
};

export default notes;
