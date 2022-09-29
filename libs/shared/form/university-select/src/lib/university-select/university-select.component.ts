import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { GeneralInfoService } from '@ksp/shared/service';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ksp-university-select',
  templateUrl: './university-select.component.html',
  styleUrls: ['./university-select.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: providerFactory(UniversitySelectComponent),
})
export class UniversitySelectComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() title = 'กรุณาเลือกสถาบันที่ท่านสังกัด';
  @Input() label1 = 'สังกัด';
  @Input() label2 = 'โรงเรียน / สถานศึกษา';
  @Input() schoolName = '';
  @Input() bureauName = '';
  @Input() searchType = '';
  @Input() readonly = false;
  bureaus$!: Observable<any>;
  @Output() selectedUniversity = new EventEmitter<string>();

  override form = this.fb.group({
    institution: [],
    affiliation: [],
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService
  ) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  ngOnInit(): void {
    this.bureaus$ = this.generalInfoService.getBureau();
  }

  search() {
    const dialog = this.dialog.open(UniversitySearchComponent, {
      width: '1200px',
      height: '100vh',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        searchType: this.searchType,
        subHeader: 'กรุณาเลือกหน่วยงาน/สถานศึกษาที่ท่านสังกัด',
      },
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.selectedUniversity.emit(res);
      }
    });
  }
}
