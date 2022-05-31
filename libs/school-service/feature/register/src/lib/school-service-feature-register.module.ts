import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthorComponent } from './author/author.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'author',
    component: AuthorComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [RegisterComponent, AuthorComponent],
  exports: [RegisterComponent, AuthorComponent],
})
export class SchoolServiceFeatureRegisterModule {}
