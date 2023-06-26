import { CommonModule } from '@angular/common';
import { Component,  OnInit, Input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Validators, FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// ------------------------------------------------------------------------------------------------------
import { dateDiff, providerFactory } from '@ksp/shared/utility';
import { AddRowButtonComponent } from '@ksp/shared/ui';
import { KspFormBaseComponent, Bureau, SchInfo } from '@ksp/shared/interface';
import { UniversitySearchComponent } from '@ksp/shared/search';
// ------------------------------------------------------------------------------------------------------
@Component({
    selector: 'ksp-exp-inp',
    imports: [ CommonModule, 
               FormsModule, ReactiveFormsModule,
               MatDatepickerModule,
               AddRowButtonComponent
             ],
    standalone : true,
    providers: providerFactory(ExperienceInputComponent),
    templateUrl: './exp-inp.component.html',
    styleUrls: ['./exp-inp.component.css']
})

// ------------------------------------------------------------------------------------------------------
export class ExperienceInputComponent extends KspFormBaseComponent implements OnInit
{
    // Decoration -----------------------------------------
    @Input() searchType = '';
    @Input() institutions: any[] = [];
    @Input() bureaus: any[] = [];
    @Input() bureauList: Bureau[] | null = [];

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
    school: any;
       sum: number[][] = [];

    dateDiff = dateDiff;

    // Constructor ----------------------------------------
    constructor(public dialog: MatDialog, private fb: FormBuilder) {
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

    searchSchool(target:any) {
        const dialog = this.dialog.open(UniversitySearchComponent, {
          width: '1200px',
          height: '100vh',
          position: {
            top: '0px',
            right: '0px',
          },
          data: {
            searchType: this.searchType,
            subHeader: 'กรุณาเลือกหน่วยงาน/สถานศึกษาที่ท่านสังกัด'
          },
        });
    
        dialog.afterClosed().subscribe((res: SchInfo) => {
          if (res) {
            const grpind =  parseInt( target.getAttribute('grpind') )

            // Assign to element
            target.value = res.schoolname;
            this.workInfo.controls[grpind].get('affiliation')?.setValue(res.bureauid);
          }
        });
    }
}