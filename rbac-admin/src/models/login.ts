import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {

      // console.log('effect' , payload);

      const response = yield call(fakeAccountLogin, payload);

      // console.log('response' , response);

      // 修改授权状态
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // 登录成功处理
      if (response.status) {
        console.log('model - 登录成功！');

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');

      }

    },

    // 退出
    logout() {

      localStorage.removeItem('token')
      localStorage.removeItem('authority')

      const { redirect } = getPageQuery();

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }


    },
  },

  reducers: {

    changeLoginStatus(state, { payload }) {

      // token 同步到客户端
      localStorage.setItem('token',payload.data.token)

      // Authority 用户角色 同步到客户端
      setAuthority(payload.data.currentAuthority);

      return {
        ...state,
        status: payload.status
      };
    },
  },
};

export default Model;
