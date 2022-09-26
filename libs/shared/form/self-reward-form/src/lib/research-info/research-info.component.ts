import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    researchSubmission: [],
    researchSubmissionType: [],
    subjectGroup: [],
    region: [],
    researchNameTh: [],
    researchNameEn: [],
    researchCompleteYear: [],
    researchSubmissionCouncil: [],
    researchSubmissionCouncilYear: [],
    researchSubmissionCouncil2: [],
    awardFromOthers: [],
    awardFromOthersName: [],
    awardFromOthersYear: [],
    inProcessForAcademicStanding: [],
    academicStandingLevel: [],
    academicStandingYear: [],
    grantResearchFund: [],
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
