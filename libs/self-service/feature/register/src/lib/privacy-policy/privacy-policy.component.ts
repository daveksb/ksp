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
  `2. ผู้สมัคร จะต้องกรอกข้อมูลรายละเอียดต่างๆ
  ตามจริงให้ครบถ้วน ทั้งนี้เพื่อประโยชน์แก่ตัวผู้สมัคร
  หากตรวจพบว่าข้อมูลของ ผู้สมัครไม่เป็นความจริง
  คุรุสภาจะระงับการใช้งานของผู้สมัครโดยไม่ต้องแจ้งให้ทราบล่วงหน้า`,
  `3. ผู้ใดแอบอ้าง หรือกระทำการใดๆ
  อันเป็นการละเมิดสิทธิส่วนบุคคล
  โดยใช้ข้อมูลของผู้อื่นมาแอบอ้างสมัครสมาชิก เพื่อให้ได้สิทธิ
  มาซึ่งการเป็นสมาชิก ถือเป็นความผิด ต้องรับโทษตามที่กฎหมายกำหนดไว้`,
  `4. ข้อมูลส่วนบุคคลของผู้สมัครที่ได้ลงทะเบียน
  หรือผ่านการใช้งานของเว็บไซต์ของ คุรุสภาทั้งหมดนั้น ผู้สมัคร
  ยอมรับและตกลงว่าเป็นสิทธิของ คุรุสภา ซึ่งผู้สมัครต้องอนุญาตให้
  คุรุสภา ใช้ข้อมูลของผู้สมัคร สมาชิกในงานที่เกี่ยวข้องกับ คุรุสภา`,
  `5.คุรุสภาขอรับรองว่าจะเก็บข้อมูลของผู้สมัครไว้เป็นความลับอย่างดีที่สุด
  โดยจะมินำไปเปิดเผยที่ใด และ/หรือ เพื่อประโยชน์ทางการค้า
  หรือประโยชน์ทางด้านอื่น ๆ โดยไม่ได้รับอนุญาต
  นอกจากจะได้รับหมายศาลหรือหนังสือทางราชการ
  ซึ่งขึ้นอยู่กับดุลพินิจของ คุรุสภาการสมัครสมาชิก คุรุสภา
  ไม่ต้องเสียค่าใช้จ่ายใดๆ ทั้งสิ้น`,
  `6. ผู้สมัครควรปฏิบัติตามข้อกำหนด
  และเงื่อนไขการให้บริการของเว็บไซต์
  คุรุสภาโดยเคร่งครัดเพื่อความปลอดภัย ในข้อมูลส่วนบุคคลของผู้สมัคร
  ในกรณีที่ข้อมูลส่วนบุคคลดังกล่าวถูกโจรกรรมโดยวิธีการทางอิเล็กทรอนิกส์
  หรือสูญหาย เสียหายอันเนื่องจากสาเหตุสุดวิสัยหรือไม่ว่ากรณีใด ๆ
  ทั้งสิ้น คุรุสภาขอสงวนสิทธิในการปฏิเสธความรับผิดจาก
  เหตุดังกล่าวทั้งหมด`,
  `7. ผู้สมัครจะต้องรักษารหัสผ่าน
  หรือชื่อเข้าใช้งานในระบบสมาชิกเป็นความลับ
  และหากมีผู้อื่นสามารถเข้าใช้จากทางชื่อของผู้สมัคร ได้
  คุรุสภาจะไม่รับผิดชอบใดๆ ทั้งสิ้น`,
  `8. ผู้สมัครยินยอมให้คุรุสภาตรวจสอบข้อมูลส่วนตัว
  และ/หรือข้อมูลอื่นใดที่ผู้สมัครระบุในการสมัครสมาชิก หาก
  คุรุสภาตรวจสอบว่าข้อมูลที่ท่านให้ไม่ชัดเจน
  และ/หรือเป็นเท็จทางคุรุสภา มีสิทธิในการยกเลิก สมาชิกของผู้สมัครได้`,
  `9. เมื่อเป็นสมาชิกแล้วผู้สมัครจะได้รับข่าวสารประชาสัมพันธ์ของคุรุสภา
  จากทาง e-mail และ/หรือ SMS และ/หรือสื่ออื่นๆ
  ที่คุรุสภาเห็นสมควรทั้งนี้ทางคุรุสภาได้ทำการตรวจจับ Virus
  ก่อนการส่ง e-mail ข่าวสารไปยังท่านทุกครั้ง
  ดังนั้นถ้าเครื่องคอมพิวเตอร์ของท่านเกิดผิดปกติอันเนื่องมากจากติด
  Virus หรือ Spam mail ทางคุรุสภาไม่รับผิดชอบใดๆ ทั้งสิ้น`,
];

const policyRuleEn = [
  `Meta builds technologies and services that enable people to connect with each other, build communities, and grow businesses. These Terms govern your use of Facebook, Messenger, and the other products, features, apps, services, technologies, and software we offer (the Meta Products or Products), except where we expressly state that separate terms (and not these) apply. These Products are provided to you by Meta Platforms, Inc.`,
  `We don't charge you to use Facebook or the other products and services covered by these Terms. Instead, businesses and organizations pay us to show you ads for their products and services. By using our Products, you agree that we can show you ads that we think will be relevant to you and your interests. We use your personal data to help determine which ads to show you.`,
  `We don't sell your personal data to advertisers, and we don't share information that directly identifies you (such as your name, email address or other contact information) with advertisers unless you give us specific permission. Instead, advertisers can tell us things like the kind of audience they want to see their ads, and we show those ads to people who may be interested. ,`,
  `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less`,
];
