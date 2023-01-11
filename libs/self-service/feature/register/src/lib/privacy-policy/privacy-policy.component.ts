import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicyComponent implements OnInit {
  pageType = 0;

  ThRules = policyRuleTh;
  EnRules = policyRuleEn;
  constructor(private router: Router, private route: ActivatedRoute) {}

  register() {
    this.router.navigate(['/register', 'th-step-1']);
  }

  register2() {
    this.router.navigate(['/register', 'en-step-0']);
  }

  loginPage() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.pageType = Number(res['type']);
      //console.log('res = ', this.pageType);
    });
  }
}

const policyRuleTh = [
  `1. การสมัครสมาชิก คุรุสภา ไม่ต้องเสียค่าใช้จ่ายใดๆทั้งสิ้น`,
  `2. ผู้สมัคร จะต้องกรอกข้อมูลรายละเอียดต่างๆ ตามจริงให้ครบถ้วน ทั้งนี้เพื่อประโยชน์แก่ตัวผู้สมัคร หากตรวจพบว่าข้อมูลของ ผู้สมัครไม่เป็นความจริง คุรุสภาจะระงับการใช้งานของผู้สมัครโดยไม่ต้องแจ้งให้ทราบล่วงหน้า`,
  `3. ผู้ใดแอบอ้าง หรือกระทำการใดๆ อันเป็นการละเมิดสิทธิส่วนบุคคล โดยใช้ข้อมูลของผู้อื่นมาแอบอ้างสมัครสมาชิก เพื่อให้ได้สิทธิ มาซึ่งการเป็นสมาชิก ถือเป็นความผิด ต้องรับโทษตามที่กฎหมายกำหนดไว้`,
  `4. ข้อมูลส่วนบุคคลของผู้สมัครที่ได้ลงทะเบียน หรือผ่านการใช้งานของเว็บไซต์ของ คุรุสภาทั้งหมดนั้น ผู้สมัคร ยอมรับและตกลงว่าเป็นสิทธิของ คุรุสภา ซึ่งผู้สมัครต้องอนุญาตให้ คุรุสภา ใช้ข้อมูลของผู้สมัคร สมาชิกในงานที่เกี่ยวข้องกับ คุรุสภา`,
  `5. คุรุสภาขอรับรองว่าจะเก็บข้อมูลของผู้สมัครไว้เป็นความลับอย่างดีที่สุด โดยจะมินำไปเปิดเผยที่ใด และ/หรือ เพื่อประโยชน์ทางการค้า หรือประโยชน์ทางด้านอื่น ๆ โดยไม่ได้รับอนุญาต นอกจากจะได้รับหมายศาลหรือหนังสือทางราชการ ซึ่งขึ้นอยู่กับดุลพินิจของ คุรุสภาการสมัครสมาชิก คุรุสภา ไม่ต้องเสียค่าใช้จ่ายใดๆ ทั้งสิ้น`,
  `6. ผู้สมัครควรปฏิบัติตามข้อกำหนด และเงื่อนไขการให้บริการของเว็บไซต์ คุรุสภาโดยเคร่งครัดเพื่อความปลอดภัย ในข้อมูลส่วนบุคคลของผู้สมัคร ในกรณีที่ข้อมูลส่วนบุคคลดังกล่าวถูกโจรกรรมโดยวิธีการทางอิเล็กทรอนิกส์ หรือสูญหาย เสียหายอันเนื่องจากสาเหตุสุดวิสัยหรือไม่ว่ากรณีใด ๆ ทั้งสิ้น คุรุสภาขอสงวนสิทธิในการปฏิเสธความรับผิดจาก เหตุดังกล่าวทั้งหมด`,
  `7. ผู้สมัครจะต้องรักษารหัสผ่าน หรือชื่อเข้าใช้งานในระบบสมาชิกเป็นความลับ และหากมีผู้อื่นสามารถเข้าใช้จากทางชื่อของผู้สมัคร ได้ คุรุสภาจะไม่รับผิดชอบใดๆ ทั้งสิ้น`,
  `8. ผู้สมัครยินยอมให้คุรุสภาตรวจสอบข้อมูลส่วนตัว และ/หรือข้อมูลอื่นใดที่ผู้สมัครระบุในการสมัครสมาชิก หาก คุรุสภาตรวจสอบว่าข้อมูลที่ท่านให้ไม่ชัดเจน และ/หรือเป็นเท็จทางคุรุสภา มีสิทธิในการยกเลิก สมาชิกของผู้สมัครได้`,
  `9. เมื่อเป็นสมาชิกแล้วผู้สมัครจะได้รับข่าวสารประชาสัมพันธ์ของคุรุสภา จากทาง e-mail และ/หรือ SMS และ/หรือสื่ออื่นๆ ที่คุรุสภาเห็นสมควรทั้งนี้ทางคุรุสภาได้ทำการตรวจจับ Virus ก่อนการส่ง e-mail ข่าวสารไปยังท่านทุกครั้ง ดังนั้นถ้าเครื่องคอมพิวเตอร์ของท่านเกิดผิดปกติอันเนื่องมากจากติด Virus หรือ Spam mail ทางคุรุสภาไม่รับผิดชอบใดๆ ทั้งสิ้น`,
];

const policyRuleEn = [
  `1. The Teachers council subscription is completely free of charge.`,
  `2. Applicants are required to fill in all the actual details for the benefit of the applicant. If it is detected that the applicant's information is not true, the Teachers Council will suspend the applicant's use without prior notice.`,
  `3. Any person who impersonates or commits any act that violates personal rights by using the information of others to impersonate a member in order to obtain membership is an offense and shall be punished as prescribed by law. ,`,
  `4. Personal information of applicants who have registered or used the website of all Teachers Councils. Accept and agree that it is the right of the Teachers Council, which the candidate must allow, the Teachers Council. Use applicant information Members in the work related to the Teachers Council.`,
  `5. Teachers Council undertakes to keep the applicant's information confidential as best as possible, not to be disclosed anywhere and/or for commercial or other benefits without permission. In addition to obtaining subpoenas or official letters, which are at the discretion of the Teachers Council, the Teachers Council is not entitled to receive any subpoenas or official letters. It doesn't cost anything.`,
  `6. Applicants should strictly comply with the terms and conditions of service of the Teachers Council website for safety reasons. In the applicant's personal information In the event that such personal data is stolen by electronic means or lost, damaged due to force majeure or any circumstances. Teachers Council reserves the right to deny liability for all such reasons.`,
  `7. Applicants must keep their password or login name in the member system confidential, and if someone else can access it from the candidate's name, the Teachers Council will not be held responsible.`,
  `8. The applicant consents to the Teachers Council reviewing personal information and/or any other information provided by the applicant in the subscription. If the Teachers Council verifies that the information you have provided is unclear and/or false, the Teachers Council will not be allowed to do so. Have the right to cancel. Members of the candidates were.`,
  `9. Once a member, the applicant will receive the Teachers Council's press releases from e-mail and/or SMS and/or other media deemed appropriate by the Teachers Council. Therefore, if your computer is abnormal due to virus or spam mail, Teachers Council is not responsible for anything.`,
];
