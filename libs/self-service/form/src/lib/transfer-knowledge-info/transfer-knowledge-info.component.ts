import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-transfer-knowledge-info',
  templateUrl: './transfer-knowledge-info.component.html',
  styleUrls: ['./transfer-knowledge-info.component.scss'],
  providers: providerFactory(TransferKnowledgeInfoComponent),
})
export class TransferKnowledgeInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  transferForm = this.fb.group({
    subjects: this.fb.array([
      this.fb.group({
        subjectName: ['', Validators.required],
        subjectCode: ['', Validators.required],
        grade: ['', Validators.required],
        detail: ['', Validators.required],
      }),
    ]),
  });

  override form = this.fb.group({
    standardInfo: [null, Validators.required],
    standards: this.fb.array([this.transferForm]),
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.deleteStandard(0);

    /* this.form.controls.standards.valueChanges.subscribe((res) => {
        console.log('std = ', res);
      }); */
  }

  override set value(value: any) {
    this.form.patchValue({ standardInfo: value.standardInfo });
    if (value.standards?.length) {
      this.form.controls.standards.removeAt(0);
      value.standards.forEach((item: any) => {
        const control = this.form.controls.standards;
        const subjects = item.subjects?.map((subject: any) => {
          return this.fb.group({
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            grade: subject.grade,
            detail: subject.detail,
          });
        });

        control.push(
          this.fb.group({
            subjects: new FormArray(subjects),
          })
        );
      });
    }

    this.onChange(value);
    this.onTouched();
  }

  addStandard() {
    const transferForm = this.fb.group({
      subjects: this.fb.array([
        this.fb.group({
          subjectName: ['', Validators.required],
          subjectCode: ['', Validators.required],
          grade: ['', Validators.required],
          detail: ['', Validators.required],
        }),
      ]),
    });

    this.standards.push(transferForm);
  }

  deleteStandard(index: number) {
    this.standards.removeAt(index);
  }

  addSubject(index: number) {
    const form = this.fb.group({
      subjectName: ['', Validators.required],
      subjectCode: ['', Validators.required],
      grade: ['', Validators.required],
      detail: ['', Validators.required],
    });

    this.getSubjects(index).push(form);
  }

  deleteSubject(StandardIndex: number, subjectIndex: number) {
    this.getSubjects(StandardIndex).removeAt(subjectIndex);
  }

  get standards() {
    return this.form.controls.standards;
  }

  getSubjects(index: number) {
    return this.standards.controls[index].controls.subjects;
  }
}
