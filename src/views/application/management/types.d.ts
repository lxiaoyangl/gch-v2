export interface OptionType {
  [key: string]: string;
  // value: string;
  // label: string;
}
export interface AllList {
  name: string;
  num: number;
  all: number;
  color: string;
}

export interface ChartData {
  val: number;
  sColor: string;
  eColor: string;
  title: string;
  all: number;
}
export interface ComponentContent {
  name: string;
  status: string;
  type: string;
  time: string;
  desc: string;
  userNum: number;
}
export interface AllMain {
  name: string;
  status: string;
  type: string;
  startTime: string;
  time: string;
  desc: string;
  totalData: string;
  flowNum: number;
}
export interface TableData {
  instance: string;
  dataType: string;
  specificType: string;
  kind: string;
  ip: string;
  port: string;
  coordinate: string;
  isHover?: boolean;
  date?: string;
}
