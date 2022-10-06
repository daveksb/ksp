import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { providerFactory } from '@ksp/shared/utility';
import { UniFormBadgeComponent } from '@ksp/shared/ui';
@UntilDestroy()
@Component({
  selector: 'ksp-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UniFormBadgeComponent],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: providerFactory(LoginFormComponent),
})
export class LoginFormComponent extends KspFormBaseComponent implements OnInit {
  eyeIconClicked = false;
  @Input() loginFail = false;
  @Input() showRetired = false;
  @Input() hideRegister = false;
  @Output() login = new EventEmitter<boolean>();
  @Output() register = new EventEmitter<boolean>();
  @Output() forgetPassword = new EventEmitter<boolean>();
  @Output() retired = new EventEmitter<boolean>();

  override form = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {
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
    this.form.valueChanges.subscribe((res) => {
      this.loginFail = false;
    });
  }
}
