import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SchoolRequestProcess } from '@ksp/shared/constant';
import { SchRequestProcess } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'ksp-approve-ksp-request',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './approve-ksp-request.component.html',
  styleUrls: ['./approve-ksp-request.component.scss'],
})
export class ApproveKspRequestComponent implements OnChanges {
  @Input() requestType = 0;
  @Input() process = 0;

  processTable!: SchRequestProcess | undefined;

  form = this.fb.group({
    approveResult: [null, Validators.required],
    returnDate: [],
    rejectReason: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    //console.log('change = ', changes);
    this.processTable = SchoolRequestProcess.find(
      (p) =>
        p.processId === changes['process'].currentValue &&
        p.requestType === changes['requestType'].currentValue
    );
    console.log('process table = ', this.processTable);
  }
}
