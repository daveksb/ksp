import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouncilEducationComponent } from './council-education/council-education.component';
import { CouncilWorkingComponent } from './council-working/council-working.component';
import { CouncilEthicComponent } from './council-ethic/council-ethic.component';
import { CouncilSuccessComponent } from './council-success/council-success.component';
import { CouncilEvidenceComponent } from './council-evidence/council-evidence.component';
import { ThaiTeacherInfoComponent } from './thai-teacher-info/thai-teacher-info.component';
import { ThaiTeacherTeachingComponent } from './thai-teacher-teaching/thai-teacher-teaching.component';
import { BestTeacherInfoComponent } from './best-teacher-info/best-teacher-info.component';
import { BestTeacherInnovationComponent } from './best-teacher-innovation/best-teacher-innovation.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import { AddRowButtonComponent } from '@ksp/shared/ui';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    ReactiveFormsModule,
    SeniorTeacherSubsidyOneComponent,
    SeniorTeacherSubsidyTwoComponent,
    SeniorTeacherSubsidyThreeComponent,
    SeniorTeacherSubsidyFourComponent,
    SeniorTeacherSubsidyFiveComponent,
    SeniorTeacherSubsidySixComponent,
    AddRowButtonComponent,
    SchoolServiceFormActivityModule,
    SharedFormOthersModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CouncilEducationComponent,
    CouncilWorkingComponent,
    CouncilEthicComponent,
    CouncilSuccessComponent,
    CouncilEvidenceComponent,
    ThaiTeacherInfoComponent,
    ThaiTeacherTeachingComponent,
    BestTeacherInfoComponent,
    BestTeacherInnovationComponent,
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
    ThaiTeacherTeachingComponent,
    BestTeacherInfoComponent,
    BestTeacherInnovationComponent,
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
