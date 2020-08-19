/**
 * notes模块接口列表
 */

import base from "./base"; // 导入接口域名列表
import instance from "@/utils/http/http.ts"; // 导入http中创建的axios实例
import QS from 'qs'; // 根据需求是否导入qs模块

const baseURL = "/notes";


const notes = {
  // 新闻列表
  articleList() {
    return instance.get(`${baseURL}/topics`);
  },
  // 新闻详情,演示
  articleDetail(id: Number, params: Object) {
    return instance.get(`${baseURL}/topic/${id}`, {
      params: params
    });
  },
  // post提交
  login(params: Object) {
    return instance.post(`${baseURL}/accesstoken`, QS.stringify(params));
  },

  // 获取随笔列表
  getNoteList() {
    return instance.get(`${baseURL}/getNoteList`)
  },

  // 提交随笔
  uploadNote(params: Object) {
    return instance.post(`${baseURL}/uploadNote`, QS.stringify(params));
  },

  // 获取other的随笔列表
  getOtherNoteList() {
    return instance.get(`${baseURL}/getOtherNoteList`)
  }
};

export default notes;
