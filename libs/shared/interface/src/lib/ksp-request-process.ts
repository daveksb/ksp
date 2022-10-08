export class KspRequestProcess {
  id: string | null = null;
  requesttable: string | null = null; // SCH_REQUEST, UNI_REQUEST_DEGREE_CERT table ใบคำขอ
  requestid: string | null = null; // id ใบคำขอ
  createdate: string | null = null; // วันที่ทำรายการ
  process: string | null = null; // ขั้นตอน
  status: string | null = null; // สถานะ
  detail: string | null = null; // รายละเอียด, คอมเมนต์
  paymentstatus: string | null = null; // สถานะการชำระเงิน ในกรณีที่ใบคำขอมีค่าธรรมเนียม default = 0
  systemtype: string | null = null; //School/ Self/ E-Service ระบบที่บันทึกข้อมูล
  userid: string | null = null; // sch_user.id/ self_my_info.id / es_user.id  ID ของ user จากระบบที่บันทึก
}
