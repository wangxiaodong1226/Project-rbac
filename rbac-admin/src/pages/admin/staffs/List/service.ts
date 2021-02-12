
import { TableListParams } from './data.d';
import request from '@/utils/request';

export async function queryStaffs(params?: TableListParams) {
  return request('/admin/staffs', {
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

export async function addStaff(params: TableListParams) {
  return request('/admin/staffs', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateStaff(params: TableListParams) {
  return request(`/admin/staffs/${params._id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function roleStaff(params: TableListParams) {
  return request(`/admin/staffs/${params._id}/role`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


