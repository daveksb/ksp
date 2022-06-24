import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UniversitySearchComponent } from '@ksp/shared/form/university-search';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-university-select',
  templateUrl: './university-select.component.html',
  styleUrls: ['./university-select.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: providerFactory(UniversitySelectComponent),
})
export class UniversitySelectComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    institution: [],
    affiliation: [],
  });

  @Input() isViewOnly = false;

  constructor(public dialog: MatDialog, private fb: FormBuilder) {
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
    if (this.isViewOnly) {
      this.form.disable();
    }
  }

  search() {
    this.dialog.open(UniversitySearchComponent, {
      width: '1200px',
      position: {
        top: '0px',
        right: '0px',
      },
    });
  }
}
