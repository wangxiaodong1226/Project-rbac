export interface TableListItem {
  _id:string;
  name: string;
  desc: string;
  accesss:string[];
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
  name?: string;
  desc?: string;
  accesss?:any[];
  updatedAt?: Date;
  createdAt?: Date;
}
