import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { deleteCookie, getCookie, thaiDate } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class TopNavComponent {
  today = thaiDate(new Date());
  firstName = getCookie('firstNameTh');
  lastName = getCookie('lastNameTh');
  constructor(private router: Router) {}
  logout() {
    deleteCookie('userToken');
    this.router.navigate(['/']);
  }
}
