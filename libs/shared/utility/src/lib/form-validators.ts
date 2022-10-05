export const phonePattern = '^(0[24689]{1})+([0-9]{7,8})+$';
export const nameThPattern = '^[ก-๏]+$';
export const selfPasswordPattern = '^{6}';
export const numberPattern = '^[0-9]';
export const nameEnPattern = '^[a-zA-Z]+$';
export const idCardPattern = '^[0-9]{13}';
export const passportPattern = '^^[A-Z]{1}[0-9]{6}';
export const idCardBackPattern = '^([A-Z]{2})+([0-9]{10})+$';

export const validatorMessages = {
  phone: 'กรุณากรอกข้อมูลเฉพาะตัวเลขเท่านั้น',
  th: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น ',
  en: 'กรุณากรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น ',
  idCardNo: 'กรุณากรอกข้อมูลเลขบัตรประชาชน 13 หลักเท่านั้น',
  idCardBack: 'กรุณากรอก 2 หลักแรกเป็นภาษาอังกฤษและ 10 หลักหลังเป็นตัวเลข',
  passport: 'กรุณากรอกหมายเลขหนังสือเดินทางให้ถูกต้อง',
  selfPassword: 'ความยาวรหัสผ่านไม่น้อยกว่า 6 ตัวอักษร',
  passwordNotMatching: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
  email: 'กรุณากรอกข้อมูลในรูปแบบอีเมลเท่านั้น',
};
