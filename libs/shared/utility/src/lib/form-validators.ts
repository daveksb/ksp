export const phonePattern = '^(0[23456789]{1})+([0-9]{7,8})+$';
export const nameThPattern = '^[ก-๏]+$';
export const selfPasswordPattern = '^{6}+$';
export const numberPattern = '^[0-9]';
export const nameEnPattern = '^[a-zA-Z]+$';
export const idCardPattern = '^[0-9]{13}';
//export const passportPattern = '^^[A-Z]{1}[0-9]{7,9}';
//export const passportPattern = '[a-zA-Z0-9]*';
export const idCardBackPattern = '^([A-Z]{2})+([0-9]{10})+$';
export const bankAccountPattern = '^[0-9]+$';

export const validatorMessages = {
  phone: 'กรุณากรอกข้อมูลในรูปแบบเบอร์โทรศัพท์',
  th: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น ',
  en: 'กรุณากรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น ',
  idCardNo: 'กรุณากรอกข้อมูลเลขบัตรประชาชนที่ถูกต้อง',
  KuruspaNo: 'กรุณากรอกข้อมูลเลขคุรุสภา 13 หลักเท่านั้น',
  idCardBack: 'กรุณากรอก 2 หลักแรกเป็นภาษาอังกฤษและ 10 หลักหลังเป็นตัวเลข',
  passport: 'กรุณากรอกหมายเลขหนังสือเดินทางให้ถูกต้อง',
  selfPassword:
    'รหัสผ่านประกอบด้วย 8-20 ตัวอักษร โดยต้องใช้อักษรตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ และตัวเลข',
  passwordNotMatching: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
  email: 'กรุณากรอกข้อมูลในรูปแบบอีเมลเท่านั้น',
  loginFail: 'คุณกรอกรหัสเข้าใช้งาน หรือรหัสผ่านไม่ถูกต้อง',
  bankAccount: 'กรุณากรอกเลขที่บัญชีให้ถูกต้อง',
  prefixNotMatching: 'กรุณาเลือกคำนำหน้าชื่อให้ตรงกัน',
  passwordNotMatchingEn: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
};
