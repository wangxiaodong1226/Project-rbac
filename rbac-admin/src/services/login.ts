import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
};


// 后台登录
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/admin/staffs/login', {
    method: 'POST',
    data: params,
  });
}


