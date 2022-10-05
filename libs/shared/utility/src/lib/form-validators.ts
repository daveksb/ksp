export const phonePattern = '^(0[24689]{1})+([0-9]{7,8})+$';
export const nameThPattern = '^[ก-๏]+$';
export const selfPasswordPattern = '^{6}';
export const numberPattern = '^[0-9]';
export const nameEnPattern = '^[a-zA-Z]+$';
export const idCardPattern = '^[0-9]{13}';
export const passportPattern = '^^[A-Z]{1}[0-9]{6}';
export const idCardBackPattern = '^([A-Z]{2})+([0-9]{10})+$';

export const validatorMessages = {
  email: 'กรุณาใส่อีเมลที่ถูกต้อง',
  phone: 'กรุณากรอกข้อมูลเฉพาะตัวเลขเท่านั้น',
  th: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น ',
  en: 'กรุณากรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น ',
  ssn: 'กรุณากรอกข้อมูลเลขบัตรประชาชน 13 หลักเท่านั้น ',
  passport: 'กรุณาใส่หมายเลขหนังสือเดินทางที่ถูกต้อง',
  idCardNo: 'กรุณาใส่หมายเลขบัตรประชาชนที่ถูกต้อง',
  selfPassword: 'ความยาวรหัสผ่านไม่น้อยกว่า 6 ตัวอักษร',
  passwordNotMatching: 'กรุณาใส่รหัสผ่านให้ตรงกัน',
  idCardBack: 'กรุณาใส่เลขหลังบัตรประชาชนให้ถูกต้อง',
};
