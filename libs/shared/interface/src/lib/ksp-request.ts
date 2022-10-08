export class KspRequest {
  id?: string | null = null; // only when update
  ref1?: string | null = null;
  ref2?: string | null = null;
  ref3?: string | null = null;
  addressinfo: string | null = null;
  //approveresult: string | null = null;
  birthdate: string | null = null;
  checkfinalresult: string | null = null;
  checkhistory: string | null = null;
  checkprohibitproperty: string | null = null;
  checksubresult: string | null = null;
  competencyinfo: string | null = null;
  contactphone: string | null = null;
  coordinatorinfo: string | null = null;
  country: string | null = null;

  careertype: string | null = null; //ประเภทวิชาชีพ  ครู/ผู้บริหารสถานศึกษา/ศึกษานิเทศน์ (required)
  isforeign: string | null = null; // ชาวไทย = 0 ชาวต่างชาติ = 1 ใช้ระบุว่าเป็นชาวต่างชาติในกรณี self-service
  kuruspanno: string | null = null; // กรณีชาวต่างชาติ ขอหมายเลขคุรุสภา และได้รับอนุมัติหมายเลข

  schooladdress: string | null = null;
  schoolname: string | null = null;
  bureauid: string | null = null;
  uniqueno: string | null = null;

  foreigncheckdocument: string | null = null; // self-service ใบคำขอต่างชาติ checkbox หน้าแรก
  foreignpassporttype: string | null = null; // self-service ใบคำขอต่างชาติ ชนิด passport
  foreignperformanceresult: string | null = null; // self-service ใบคำขอต่างชาติ ขอต่ออายุ
  foreignlicensureinfo: string | null = null; // self-service ใบคำขอต่างชาติ ขอต่ออายุ

  //currentprocess: string | null = null;
  educationoccupy: string | null = null;
  eduinfo: string | null = null;
  email: string | null = null;
  experienceinfo: string | null = null;
  feerefundinfo: string | null = null;
  fileinfo: string | null = null;
  firstnameen: string | null = null;
  firstnameth: string | null = null;
  grantionteachinglicenseinfo: string | null = null;
  hiringinfo: string | null = null;
  idcardno: string | null = null;
  imagefileid: string | null = null;
  lastnameen: string | null = null;
  lastnameth: string | null = null;
  licenseid: string | null = null;
  middlenameen: string | null = null;
  middlenameth: string | null = null;
  nationality: string | null = null;
  otherreason: string | null = null;
  passportenddate: string | null = null;
  passportno: string | null = null;
  passportstartdate: string | null = null;
  //paymentstatus: string | null = null;
  performanceinfo: string | null = null;
  position: string | null = null;
  prefixen: string | null = null;
  prefixth: string | null = null;
  prohibitproperty: string | null = null;
  reasoninfo: string | null = null;
  refperson: string | null = null;
  replacereasoninfo: string | null = null;
  requestdate: string | null = null;
  //requesteduocupy: string | null = null;
  //requestfor: string | null = null;
  requestno: string | null = null;
  //requeststatus: string | null = null;
  requesttype: string | null = null;
  rewardtype: string | null = null;
  schooladdrinfo: string | null = null;
  schoolid: string | null = null;
  sex: string | null = null;
  //staffid: string | null = null;
  submissiondocdate: string | null = null;
  submissiondocno: string | null = null;
  //subtype: string | null = null;
  systemtype: string | null = null;
  teachinginfo: string | null = null;
  testresultcompareinfo: string | null = null;
  transferknowledgeinfo: string | null = null;
  //uniquetimestamp: string | null = null;
  //updatedate: string | null = null;
  userpermission: string | null = null;
  //visainfo: string | null = null;
  visaclass: string | null = null;
  visatype: string | null = null;
  visaexpiredate: string | null = null;

  workphone: string | null = null;

  osoiinfo: string | null = null; // ข้อมูลใบคำขอ OSOI
  osoimember: string | null = null; // คณะผู้ร่วมพัฒนา
  osoicheck: string | null = null; // ยืนยันผลการตวจสอบ
  osoiresult: string | null = null; // ผลการพิจารณาคณะกรรมการ
  osoireject: string | null = null; // คัดค้าน
  osoiwithdraw: string | null = null; // เพิกถอน
}