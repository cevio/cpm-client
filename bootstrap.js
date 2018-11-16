import 'iview/dist/styles/iview.css';
import 'highlight.js/styles/xcode.css';
import 'github-markdown-css';
import './style.less';
import Vue from 'vue';
import iView from 'iview';
import Axios from 'axios';
Vue.use(iView);
export default app => {
  const { Message, Notice } = iView;
  app.ajax = app.context.ajax = Axios.create();
  app.ajax.interceptors.response.use(response => {
    if (response.status !== 200) {
      Message.warning(response.statusText || '异常错误');
      return Promise.reject(new Error(response.statusText || '异常错误'));
    }
    return response.data;
  }, error => {
    const response = error.response;
    if (response && response.data) {
      Notice.error({ 
        title: response.statusText, 
        desc: response.data
      });
    } else {
      Notice.error({ 
        title: 'HTTP ERROR',
        desc: error.message
      });
    }
    return Promise.reject(error);
  });
}