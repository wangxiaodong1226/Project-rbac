
import {TableListItem as RoleListItem} from '@/pages/admin/roles/List/data'

export interface TableListItem {
  _id:string;
  username: string;
  password: string;
  roles:RoleListItem[] | string[];
  isSuper:boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  _id?:string;
  username?: string;
  password?: string;
  roles?:any[];
  isSuper?:boolean;
  updatedAt?: Date;
  createdAt?: Date;
}
