import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class TopNavComponent {
  constructor(private router: Router) {}

  logout() {
    deleteCookie('schUserToken');
    this.router.navigate(['/']);
  }
}
function deleteCookie(name: string) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
}
