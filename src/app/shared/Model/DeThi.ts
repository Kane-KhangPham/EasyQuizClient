import {Question} from './Question';

export class DeThi {
  lopHoc: ObjectReference;
  kyThi: ObjectReference;
  monHoc: ObjectReference;
  ngayThi: Date;
  thoiGian: number;
  soCau: number;
  soLuongDe: number = 1;
  cauHoi: Question[];
  ghiChu: string;
}

export class ObjectReference {
  id: number;
  value: any;
}
