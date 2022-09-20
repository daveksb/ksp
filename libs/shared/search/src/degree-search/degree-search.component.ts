import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GeneralInfoService } from 'libs/shared/service/src/school-service/general-info.service';

@UntilDestroy()
@Component({
  selector: 'ksp-degree-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './degree-search.component.html',
  styleUrls: ['./degree-search.component.scss'],
  providers: providerFactory(DegreeSearchComponent),
})
export class DegreeSearchComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    institution: [null],
    affiliation: [null],
    degreeCode: [null],
    degreeName: [null],
    degreeLevel: [null],
    openYear: [null],
    requestNumber: [null],
    requestsubmitDate: [null],
  });
  universityList: Array<any> = [];
  universityTypeList: Array<any> = [];
  degreeLevelList: Array<any> = [];

  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private generalInfoService: GeneralInfoService) {
    super();
    this.getUniversity();
    this.getUniversityType();
    this.getDegreeLevel();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  getUniversity() {
    this.generalInfoService.getUniversity(this.form.value.affiliation).subscribe(response=>{
      if (response) {
        this.universityList = response;
      }
    })
  }

  getUniversityType() {
    this.generalInfoService.getUniversityType().subscribe(response=>{
      if (response) {
        this.universityTypeList = response;
      }
    })
  }

  getDegreeLevel() {
    this.generalInfoService.getDegreeLevel().subscribe(response=>{
      if (response) {
        this.degreeLevelList = response;
      }
    })
  }

}
