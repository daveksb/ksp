import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KspFormBaseComponent, KspRequest } from '@ksp/shared/interface';
import { ERequestService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-e-teacher-council-reject',
  templateUrl: './e-teacher-council-reject.component.html',
  styleUrls: ['./e-teacher-council-reject.component.scss'],
})
export class ETeacherCouncilRejectComponent
  extends KspFormBaseComponent
  implements OnInit
{
  requestData = new KspRequest();
  requestId!: number;

  override form = this.fb.group({
    rewardInfo: [null],
    rejectInfo: [null],
    rewokeInfo: [null],
  });

  constructor(
    private route: ActivatedRoute,
    private requestService: ERequestService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      if (this.requestId) {
        this.requestService
          .getKspRequestById(this.requestId)
          .subscribe((res) => {
            if (res) {
              this.requestData = res;
            }
          });
      }
    });
  }
}
