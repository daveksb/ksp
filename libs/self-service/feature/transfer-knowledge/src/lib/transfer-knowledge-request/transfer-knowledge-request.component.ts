import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-transfer-knowledge-request',
  templateUrl: './transfer-knowledge-request.component.html',
  styleUrls: ['./transfer-knowledge-request.component.scss'],
})
export class TransferKnowledgeRequestComponent implements OnInit {
  headerGroup = ['วันที่ทำรายการ', 'เลขใบคำขอ'];
  objectiveFiles = [
    'สำเนาคำอธิบายรายวิชาที่ขอเทียบโอนความรู้ฯตามหลักสูตรที่สำเร็จการศึกษษที่มีตราประทับของทางสถาบันที่สำเร็จการศึกษาและมีเจ้าหน้าที่ของสถาบันลงนามรับรองสำเนาถูกต้อง',
  ];

  constructor() {}

  ngOnInit(): void {}
}
