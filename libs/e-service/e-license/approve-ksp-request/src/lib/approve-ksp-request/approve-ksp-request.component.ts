import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
export class ApproveKspRequestComponent implements OnChanges, OnInit {
  @Input() requestType: string | null = '0';
  @Input() process: string | null = '0';
  @Output() selectResult = new EventEmitter<any>();

  processTable!: SchRequestProcess | undefined;

  form = this.fb.group({
    status: [null, Validators.required],
    shouldForward: [null, Validators.required],
    returnDate: [],
    reason: [],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      //this.selectResult.emit(res.result);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log('change = ', changes);
    this.processTable = SchoolRequestProcess.find(
      (p) =>
        p.processId === +changes['process'].currentValue &&
        p.requestType === +changes['requestType'].currentValue
    );
    //console.log('process table = ', this.processTable);
  }
}
