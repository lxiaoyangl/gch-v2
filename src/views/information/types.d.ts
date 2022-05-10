export interface TableData {
  id: string;
  mc: string;
  type: string;
  sqsj: string;
  zt: string;
  spr: string;
  spsj: string;
  isHover: boolean;
}
export interface Rows {
  id: "";
  mc: "";
  type: "";
  sqsj: "";
  zt: "";
  spr: "";
  spsj: "";
}

export interface TableHeader {
  prop: string;
  name: string;
  sortable?: boolean;
  width?: number;
  button?: boolean;
  // formatter?:
}
