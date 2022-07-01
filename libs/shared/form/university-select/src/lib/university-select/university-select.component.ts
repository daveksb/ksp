import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-university-select',
  templateUrl: './university-select.component.html',
  styleUrls: ['./university-select.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: providerFactory(UniversitySelectComponent),
})
export class UniversitySelectComponent extends KspFormBaseComponent {
  @Input() label1 = 'สังกัด';
  @Input() label2 = 'โรงเรียน / สถานศึกษา';
  @Output() selectedUniversity = new EventEmitter<string>();

  override form = this.fb.group({
    institution: [],
    affiliation: [],
  });

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  search() {
    const dialog = this.dialog.open(UniversitySearchComponent, {
      width: '1200px',
      position: {
        top: '0px',
        right: '0px',
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.selectedUniversity.emit('testScool');
      }
    });
  }
}
