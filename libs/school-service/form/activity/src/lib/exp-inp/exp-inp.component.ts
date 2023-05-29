import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Validators, FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
// ------------------------------------------------------------------------------------------------------
import { dateDiff } from '@ksp/shared/utility';
import { AddRowButtonComponent } from '@ksp/shared/ui';
import { KspFormBaseComponent } from '@ksp/shared/interface';
// ------------------------------------------------------------------------------------------------------
@Component({
    selector: 'ksp-exp-inp',
    imports: [ CommonModule, 
               FormsModule, ReactiveFormsModule, 
               MatDatepickerModule,
               AddRowButtonComponent 
             ],
    standalone : true,
    templateUrl: './exp-inp.component.html',
    styleUrls: ['./exp-inp.component.css']
})

// ------------------------------------------------------------------------------------------------------
export class ExperienceInputComponent extends KspFormBaseComponent implements OnInit
{
    // Decoration -----------------------------------------
    @Input() bureaus: any[] = [];
    @Input() institutions: any[] = [];

    // Override -------------------------------------------
    override form = this.fb.group({
        workInfo: this.fb.array([]),
        ethicsResult: [null, Validators.required],
    });

    override set value(value: any) {
        Object.keys(value).forEach((key) => {
          if (this.form.get(key) instanceof FormArray) {
            const control = this.form.get(key) as FormArray;
            if (value[key].length) {
              control.removeAt(0);
              value[key].forEach((item: any, index: number) => {
                this.addFormArray(control);
                control.at(index).patchValue(item);
              });
            }
          } else {
            this.form.get(key)?.patchValue(value[key]);
          }
        });
    
        if (this.mode === 'view') {
          this.form.disable();
        }
    
        this.onChange(value);
        this.onTouched();
    }

    // Property -------------------------------------------
    sum: number[][] = [];
    dateDiff = dateDiff;

    // Constructor ----------------------------------------
    constructor(private fb: FormBuilder) {
        super();
        this.subscriptions.push(this.onUpdateForm());
    }

    // Interface ----------------------------------------
    ngOnInit(): void {
        this.addFormArray(this.workInfo);
    }

    // Method ---------------------------------------------
    get workInfo() {
        return this.form.controls['workInfo'] as FormArray;
    }
    get sumYear() {
        return this.sum.reduce((a, b) => a + b[0], 0);
    }
    get sumMonth() {
        return this.sum.reduce((a, b) => a + b[1], 0);
    }

    addFormArray(form: FormArray<any>) {
        const data = this.fb.group({
          schoolname: [null, Validators.required],
          affiliation: [null, Validators.required],
          position: [null, Validators.required],
          startDate: [null, Validators.required],
          endDate: [null, Validators.required],
        });
        form.push(data);
        this.sum.push([0, 0]);
    }

    deleteFormArray(form: FormArray<any>, index: number) {
        this.sum = [...this.sum.slice(0, index), ...this.sum.slice(index + 1)];
        form.removeAt(index);
    }

    onUpdateForm() {
      // any time the inner form changes update the parent of any change
      return this.form?.valueChanges.subscribe( (value) => {
            this.onChange(value);
            this.onTouched();

            this.sum = this.calWorkInfo();
      })
    }

    calWorkInfo() {
        return this.workInfo.value.map((v: any) => {
            if (v.startDate && v.endDate) {
              const start = new Date(v.startDate);
              const end = new Date(v.endDate);
              const diff = dateDiff(start, end);
              const diffMonth = Math.floor(diff / 30);
              const year = Math.floor(diffMonth / 12);
              const month = diffMonth % 12;
              return [year, month];
            } else {
              return [0, 0];
            }
          });
    }
}