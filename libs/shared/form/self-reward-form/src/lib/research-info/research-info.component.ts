import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-research-info',
  templateUrl: './research-info.component.html',
  styleUrls: ['./research-info.component.scss'],
  providers: providerFactory(ResearchInfoComponent),
})
export class ResearchInfoComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    researchSubmission: [null, Validators.required],
    researchSubmissionType: [null, Validators.required],
    subjectGroup: [null, Validators.required],
    region: [null, Validators.required],
    researchNameTh: [null, Validators.required],
    researchNameEn: [null, Validators.required],
    researchCompleteYear: [null, Validators.required],
    researchSubmissionCouncil: [null, Validators.required],
    researchSubmissionCouncilYear: [null, Validators.required],
    researchSubmissionCouncil2: [null, Validators.required],
    awardFromOthers: [null, Validators.required],
    awardFromOthersName: [],
    awardFromOthersYear: [],
    inProcessForAcademicStanding: [null, Validators.required],
    academicStandingLevel: [],
    academicStandingYear: [],
    grantResearchFund: [null, Validators.required],
    grantResearchFundFrom: [],
    grantResearchFundYear: [],
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
}
