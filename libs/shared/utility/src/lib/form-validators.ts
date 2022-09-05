export const phonePattern = '^(0[24689]{1})+([0-9]{7,8})+$';
export const nameThPattern = '^[ก-๏]+$';
export const nameEnPattern = '^[a-zA-Z]+$';
export const idCardPattern = '^[0-9]{13}';
export const passportPattern = '^^[A-Z]{1}[0-9]{6}';

export const validatorMessages = {
  email: 'กรุณาใส่อีเมลที่ถูกต้อง',
  phone: 'กรุณาใส่เบอร์โทรศัพท์ที่ถูกต้อง',
  th: 'กรุณาใส่ภาษาไทยเท่านั้น',
  en: 'กรุณาใส่ภาษาอังกฤษเท่านั้น',
  ssn: 'กรุณาใส่เลขบัตรประชาชนที่ถูกต้อง',
  passport: 'กรุณาใส่หมายเลขหนังสือเดินทางที่ถูกต้อง',
};
