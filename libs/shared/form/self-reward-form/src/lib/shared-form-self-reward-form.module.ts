import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouncilEducationComponent } from './council-education/council-education.component';
import { CouncilWorkingComponent } from './council-working/council-working.component';
import { CouncilEthicComponent } from './council-ethic/council-ethic.component';
import { CouncilSuccessComponent } from './council-success/council-success.component';
import { CouncilEvidenceComponent } from './council-evidence/council-evidence.component';
import { ThaiTeacherInfoComponent } from './thai-teacher-info/thai-teacher-info.component';
import { ThaiTeacherEducationComponent } from './thai-teacher-education/thai-teacher-education.component';
import { ThaiTeacherWorkingComponent } from './thai-teacher-working/thai-teacher-working.component';
import { ThaiTeacherTeachingComponent } from './thai-teacher-teaching/thai-teacher-teaching.component';
import { BestTeacherInfoComponent } from './best-teacher-info/best-teacher-info.component';
import { BestTeacherEducationComponent } from './best-teacher-education/best-teacher-education.component';
import { BestTeacherTeachingComponent } from './best-teacher-teaching/best-teacher-teaching.component';
import { BestTeacherInnovationComponent } from './best-teacher-innovation/best-teacher-innovation.component';
import { PraiseTeacherEducationComponent } from './praise-teacher-education/praise-teacher-education.component';
import { PraiseTeacherWorkingComponent } from './praise-teacher-working/praise-teacher-working.component';
import { PraiseTeacherPunishedComponent } from './praise-teacher-punished/praise-teacher-punished.component';
import { SeniorTeacherInfoComponent } from './senior-teacher-info/senior-teacher-info.component';
import { SeniorTeacherCareerComponent } from './senior-teacher-career/senior-teacher-career.component';
import { SeniorTeacherSubsidyComponent } from './senior-teacher-subsidy/senior-teacher-subsidy.component';
import { ResearchResearcherComponent } from './research-researcher/research-researcher.component';
import { ResearchInfoComponent } from './research-info/research-info.component';
import { ResearchSubmitComponent } from './research-submit/research-submit.component';
import { PraiseTeacherRewardInfoComponent } from './praise-teacher-reward-info/praise-teacher-reward-info.component';
import { MatListModule } from '@angular/material/list';
import { SeniorTeacherSubsidyOneComponent } from './senior-teacher-subsidy-one/senior-teacher-subsidy-one.component';
import { SeniorTeacherSubsidyTwoComponent } from './senior-teacher-subsidy-two/senior-teacher-subsidy-two.component';
import { SeniorTeacherSubsidyThreeComponent } from './senior-teacher-subsidy-three/senior-teacher-subsidy-three.component';
import { SeniorTeacherSubsidyFourComponent } from './senior-teacher-subsidy-four/senior-teacher-subsidy-four.component';
import { SeniorTeacherSubsidyFiveComponent } from './senior-teacher-subsidy-five/senior-teacher-subsidy-five.component';
import { SeniorTeacherSubsidySixComponent } from './senior-teacher-subsidy-six/senior-teacher-subsidy-six.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    SeniorTeacherSubsidyOneComponent,
    SeniorTeacherSubsidyTwoComponent,
    SeniorTeacherSubsidyThreeComponent,
    SeniorTeacherSubsidyFourComponent,
    SeniorTeacherSubsidyFiveComponent,
    SeniorTeacherSubsidySixComponent,
  ],
  declarations: [
    CouncilEducationComponent,
    CouncilWorkingComponent,
    CouncilEthicComponent,
    CouncilSuccessComponent,
    CouncilEvidenceComponent,
    ThaiTeacherInfoComponent,
    ThaiTeacherEducationComponent,
    ThaiTeacherWorkingComponent,
    ThaiTeacherTeachingComponent,
    BestTeacherInfoComponent,
    BestTeacherEducationComponent,
    BestTeacherTeachingComponent,
    BestTeacherInnovationComponent,
    PraiseTeacherEducationComponent,
    PraiseTeacherWorkingComponent,
    PraiseTeacherPunishedComponent,
    SeniorTeacherInfoComponent,
    SeniorTeacherCareerComponent,
    SeniorTeacherSubsidyComponent,
    ResearchResearcherComponent,
    ResearchInfoComponent,
    ResearchSubmitComponent,
    PraiseTeacherRewardInfoComponent,
  ],
  exports: [
    CouncilEducationComponent,
    CouncilWorkingComponent,
    CouncilEthicComponent,
    CouncilSuccessComponent,
    CouncilEvidenceComponent,
    ThaiTeacherInfoComponent,
    ThaiTeacherEducationComponent,
    ThaiTeacherWorkingComponent,
    ThaiTeacherTeachingComponent,
    BestTeacherInfoComponent,
    BestTeacherEducationComponent,
    BestTeacherTeachingComponent,
    BestTeacherInnovationComponent,
    PraiseTeacherEducationComponent,
    PraiseTeacherWorkingComponent,
    PraiseTeacherPunishedComponent,
    SeniorTeacherInfoComponent,
    SeniorTeacherCareerComponent,
    SeniorTeacherSubsidyComponent,
    ResearchResearcherComponent,
    ResearchInfoComponent,
    ResearchSubmitComponent,
    PraiseTeacherRewardInfoComponent,
  ],
})
export class SharedFormSelfRewardFormModule {}
