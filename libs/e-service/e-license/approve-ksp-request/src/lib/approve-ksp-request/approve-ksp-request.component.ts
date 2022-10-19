import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KspFormBaseComponent, SchRequestProcess } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-approve-ksp-request',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './approve-ksp-request.component.html',
  styleUrls: ['./approve-ksp-request.component.scss'],
  providers: providerFactory(ApproveKspRequestComponent),
})
export class ApproveKspRequestComponent extends KspFormBaseComponent {
  @Input() requestType: string | null = '0';
  @Input() process: string | null = '0';

  processTable!: SchRequestProcess | undefined;

  override form = this.fb.group({
    status: [null, Validators.required],
    shouldForward: [null, Validators.required],
    returnDate: [],
    reason: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  get status() {
    return this.form.controls.status.value;
  }

  //ngOnInit(): void {}

  /*   ngOnChanges(changes: SimpleChanges): void {
    //console.log('change = ', changes);
    this.processTable = SchoolRequestProcess.find(
      (p) =>
        p.processId === +changes['process'].currentValue &&
        p.requestType === +changes['requestType'].currentValue
    );
    //console.log('process table = ', this.processTable);
  } */
}
