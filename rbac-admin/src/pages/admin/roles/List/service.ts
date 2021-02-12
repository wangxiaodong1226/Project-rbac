
import { TableListParams } from './data.d';
import request from '@/utils/request';

export async function queryRoles(params?: TableListParams) {
  return request('/admin/roles', {
    method: 'GET',
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRole(params: TableListParams) {
  return request('/admin/roles', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRole(params: TableListParams) {
  return request(`/admin/roles/${params._id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}


export async function accessRole(params: TableListParams) {
  return request(`/admin/roles/${params._id}/accesss`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
