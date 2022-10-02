import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Ethics } from '@ksp/shared/interface';
import { EthicsService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'e-service-accusation-main',
  templateUrl: './accusation-main.component.html',
  styleUrls: ['./accusation-main.component.scss'],
})
export class AccusationMainComponent implements OnInit {
  ethicsId!: number;

  form = this.fb.group({
    accusation: [],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: EthicsService
  ) {}

  ngOnInit(): void {
    this.checkRequestId();

    this.form.valueChanges.subscribe((res) => {
      console.log('form value = ', this.form.controls.accusation.value);
    });
  }

  checkRequestId() {
    this.route.paramMap.subscribe((params) => {
      this.ethicsId = Number(params.get('id'));
      if (this.ethicsId) {
        //this.loadRequestFromId(this.requestId);
      }
    });
  }

  saveEthics() {
    if (this.ethicsId) {
      console.log('do nothing = ');
    } else {
      const ethics = new Ethics();
      //const allowKey = Object.keys(self);

      console.log('form value = ', this.form.controls.accusation.value);

      this.service.createEthics(ethics).subscribe((res) => {
        console.log('save = ', res);
        const id = res.id;
        if (id) {
          this.router.navigate(['/accusation', 'detail', id]);
        }
      });
    }
  }

  next() {
    this.router.navigate(['/accusation', 'decision']);
  }

  cancel() {
    this.router.navigate(['/accusation']);
  }
}
