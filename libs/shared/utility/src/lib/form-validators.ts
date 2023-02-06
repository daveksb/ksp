export const phonePattern = '^(0[23456789]{1})+([0-9]{7,8})+$';
export const nameThPattern = '^[ก-๏]+$';
export const nameEnPattern = '^[a-zA-Z]+$';
export const passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$';
//export const numberPattern = '^[0-9]';
export const idCardPattern = '^[0-9]{13}';
//export const passportPattern = '^^[A-Z]{1}[0-9]{7,9}';
export const passportPattern = '[a-zA-Z0-9]*';
export const idCardBackPattern = '^([A-Z]{2})+([0-9]{10})+$';
export const bankAccountPattern = '^[0-9]+$';

export const validatorMessages = {
  phone: 'กรุณากรอกข้อมูลในรูปแบบเบอร์โทรศัพท์',
  phoneEng: 'Please enter correct phone number pattern.',
  th: 'กรุณากรอกข้อมูลเป็นภาษาไทยเท่านั้น ',
  en: 'กรุณากรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น ',
  idCardNo: 'กรุณากรอกข้อมูลเลขบัตรประชาชนที่ถูกต้อง',
  idCardNoEng:
    'Please enter correct Teachers Council of Thailand ID number pattern.',
  KuruspaNo: 'กรุณากรอกข้อมูลเลขคุรุสภา 13 หลักเท่านั้น',
  idCardBack: 'กรุณากรอก 2 หลักแรกเป็นภาษาอังกฤษและ 10 หลักหลังเป็นตัวเลข',
  passport: 'กรุณากรอกหมายเลขหนังสือเดินทางให้ถูกต้อง',
  selfPassword:
    'รหัสผ่านประกอบด้วย 8-20 ตัวอักษร โดยต้องใช้อักษรตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ และตัวเลข',
  selfPasswordEng:
    'Passwords contain 8-20 characters, must be lowercase letters, uppercase letters and numbers.',
  passwordNotMatching: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
  email: 'กรุณากรอกข้อมูลในรูปแบบอีเมลเท่านั้น',
  loginFail: 'คุณกรอกรหัสเข้าใช้งาน หรือรหัสผ่านไม่ถูกต้อง',
  bankAccount: 'กรุณากรอกเลขที่บัญชีให้ถูกต้อง',
  prefixNotMatching: 'กรุณาเลือกคำนำหน้าชื่อให้ตรงกัน',
  passwordNotMatchingEng: 'Password is not macthing',
  required: 'กรุณากรอก field',
  requiredSelect: 'กรุณาเลือก field',
};
