import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
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
    standardInfo: [],

    subjects: this.fb.array([
      this.fb.group({
        subjectName: [''],
        subjectCode: [''],
        grade: [''],
        detail: [''],
      }),
    ]),
  });

  override form = this.fb.group({
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

  ngOnInit(): void {}

  addStandard() {
    const transferForm = this.fb.group({
      standardInfo: [],
      subjects: this.fb.array([
        this.fb.group({
          subjectName: [''],
          subjectCode: [''],
          grade: [''],
          detail: [''],
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
      subjectName: [''],
      subjectCode: [''],
      grade: [''],
      detail: [''],
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
