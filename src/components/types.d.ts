export interface TableData {
  id: string;
  mc?: string;
  type?: string;
  sqsj?: string;
  zt?: string;
  spr?: string;
  spsj?: string;
  module?: string;
  target?: string;
  time?: string;
  people?: string;
  deploy?: number;
  describe?: string;
  isHover?: boolean;
}
export interface TableHeader {
  prop: string;
  name: string;
  sortable?: boolean;
  width?: number;
  button?: boolean;
  formatter?: (row: any, prop: string, value: any, index: number) => string;
}
