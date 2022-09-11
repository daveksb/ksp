import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GeneralInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ksp-qualification-approve-person',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './qualification-approve-person.component.html',
  styleUrls: ['./qualification-approve-person.component.scss'],
})
export class QualificationApprovePersonComponent implements OnInit {
  prefixList$!: Observable<any>;
  constructor(
    public dialogRef: MatDialogRef<QualificationApprovePersonComponent>,
    private generalInfoService: GeneralInfoService,
    private fb: FormBuilder
  ) {}

  @Output() completed = new EventEmitter<boolean>();
  form = this.fb.group({
    prefixth1: [],
    firstnameth1: [],
    lastnameth1: [],
    position1: [],
    prefixth2: [],
    firstnameth2: [],
    lastnameth2: [],
    position2: [],
  });

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.prefixList$ = this.generalInfoService.getPrefix();
  }
  save() {
    this.dialogRef.close({ refperson: this.form.value });
  }
}
