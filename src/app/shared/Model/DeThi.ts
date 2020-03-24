import {Question} from './Question';

export class DeThi {
  lopHoc: ObjectReference;
  kyThi: ObjectReference;
  monHoc: ObjectReference;
  ngayThi: Date;
  thoiGian: number;
  soCau: number;
  soLuongDe: number;
  cauHoi: Question[];
  ghiChu: string;
  kieuDanTrang: number;
}

export class ObjectReference {
  id: number;
  value: any;
}
