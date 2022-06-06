import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UniversitySearchComponent } from '@ksp/shared/ui/university-search';

@Component({
  selector: 'self-service-form-user-workplace',
  templateUrl: './form-user-workplace.component.html',
  styleUrls: ['./form-user-workplace.component.css'],
})
export class FormUserWorkplaceComponent {
  constructor(private dialog: MatDialog) {}

  openSearchDialog() {
    this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
    });
  }
}
