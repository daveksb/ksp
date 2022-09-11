import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ksp-qualification-approve-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './qualification-approve-detail.component.html',
  styleUrls: ['./qualification-approve-detail.component.scss'],
})
export class QualificationApproveDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<QualificationApproveDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}
  degreeLevelName = '';
  degreeName = '';
  institution = '';
  major = '';
  degreelevelMapping = new Map([
    ['1', 'ปริญญาตรี'],
    ['2', 'ปริญญาโท'],
    ['3', 'ปริญญาเอก'],
    ['4', 'วุฒิการศึกษาปริญญาอื่นๆที่เทียบเท่าปริญญาตรี / ปริญญาทางการศึกษา'],
  ]);
  form = this.fb.group({
    reason1: [],
    reason2: [],
  });
  @Output() confirmed = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.institution = this.data?.institution ?? '';
    this.degreeName = this.data?.degreeName ?? '';
    this.major = this.data?.major ?? '';
    this.degreeLevelName =
      this.degreelevelMapping.get(this.data?.degreeLevelName) ?? '';
  }
  save() {
    this.dialogRef.close({ reasoninfo: this.form.value });
  }
}
