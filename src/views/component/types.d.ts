export interface Test {
  id: number;
  name: string;
  sxname: string;
  sxtype: string;
}
export interface TableHeader {
  prop: string;
  name: string;
  width?: number | string;
  button?: boolean;
}
export interface TableData {
  id: string;
  module: string;
  target: string;
  type: string;
  time: string;
  people: string;
  deploy: number;
  describe: string;
  isHover: boolean;
}
export interface Zjdata {
  id: number;
  servers: string;
  time: string;
  isHover: boolean;
}
export interface AddForm {
  name: string;
  region: string;
  date1: string;
  date2: string;
  delivery: boolean;
  type: string;
  resource: string;
  desc: string;
}
export interface AllList {
  name: string;
  num: number;
  all: number;
  color: string;
}
export interface GaugeChartData {
  val: number;
  sColor: string;
  eColor: string;
  title: string;
  all: number;
}
