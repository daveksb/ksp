import { SchoolRequest } from './school-request';

export class SelfRequest extends SchoolRequest {
  rewardethicinfo: string | null = null; // ข้อมูลการปฎิบัติตามจรรยาบรรณ
  rewardsuccessInfo: string | null = null; // รายงานผลสำเร็จจากการปฎิบัติงาน
  rewarddetailinfo: string | null = null; // ข้อมูลรางวัลและหลักฐานประกอบ / ข้อมูลนวัตกรรมและรางวัล
  rewardpunishmentinfo: string | null = null; // ข้อมูลการลงโทษทางวินัย
  rewardteacherinfo: string | null = null; // ข้อมูลครูภาษาไทยดีเด่น/ข้อมูลครูดีเด่น/ข้อมูลครูอาวุโส
  rewardretiredate: string | null = null; // วันที่อายุครบ 60 ปี
  rewardcareerinfo: string | null = null; // ข้อมูลประกอบวิชาชีพ
  rewardmoneysupportinfo: string | null = null; // ข้อมูลผู้ขอรับเงินช่วยเหลือ
  rewardresearcherinfo: string | null = null; // ข้อมูลผู้วิจัย
  rewardresearchinfo: string | null = null; // ข้อมูลผลงานวิจัย
  rewardresearchhistory: string | null = null; // ประวัติการส่งผลงานวิจัย

  constructor(
    ref1: string,
    ref2: string,
    ref3: string,
    process = 1, // ขั้นตอน
    status = 1 // สถานะ
  ) {
    super();
    super.ref1 = ref1;
    super.ref2 = ref2;
    super.ref3 = ref3;

    super.systemtype = ref1;
    super.requesttype = ref2;
    super.subtype = ref3;

    super.currentprocess = `${process}`;
    super.requeststatus = `${status}`;
  }
}
