export interface BasicInformation {
  name: string;
  type: string;
  status: number;
  ip: string;
  port: string;
  cpu: string;
  is: string;
  disk: string;
}

export interface GaugeChartData {
  val: number;
  sColor: string;
  eColor: string;
  title: string;
  all: number;
}
export interface TableData {
  name: string;
  id: string;
  type: string;
  date: string;
  ip: string;
  port: string;
  is: string;
  cpu: string;
  disk: string;
  num: number;
  status: number;
  isHover?: boolean;
}
