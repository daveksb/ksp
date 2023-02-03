import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-best-teacher-innovation',
  templateUrl: './best-teacher-innovation.component.html',
  styleUrls: ['./best-teacher-innovation.component.scss'],
  providers: providerFactory(BestTeacherInnovationComponent),
})
export class BestTeacherInnovationComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    rewardName: [null, Validators.required],
    youtubeUrl: [null, Validators.required],
  });

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = column;

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
    this.dataSource.data = [
      {
        group: 'การเรียนรู้การงานอาชีพและเทคโนโลยีดีเด่น',
        type: 'ระดับจังหวัด',
        reward: '-',
        year: '2564',
      },
      {
        group: 'การเรียนรู้คณิตศาสตร์ดีเด่น',
        type: 'ระดับประเทศ',
        reward: 'ดีเด่น',
        year: '2563',
      },
    ];
  }
}

export const column = ['order', 'group', 'type', 'reward', 'year'];
