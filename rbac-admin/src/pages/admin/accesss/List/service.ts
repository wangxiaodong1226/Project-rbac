
import { TableListParams } from './data.d';
import request from '@/utils/request';

export async function queryAccesss(params?: TableListParams) {
  return request('/admin/accesss', {
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

export async function addAccess(params: TableListParams) {
  return request('/admin/accesss', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateAccess(params: TableListParams) {
  return request(`/admin/accesss/${params._id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
