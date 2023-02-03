import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pairwise } from 'rxjs';

function checkboxValidator(): any {
  return (form: FormGroup) => {
    const isBookChecked: boolean = form.get('isBookChecked')?.value;

    const isAchievementChecked: boolean = form.get(
      'isAchievementChecked'
    )?.value;

    const isArticleChecked: boolean = form.get('isArticleChecked')?.value;

    if (!isBookChecked && !isAchievementChecked && !isArticleChecked) {
      return { checkbox: true };
    }

    return null;
  };
}

@UntilDestroy()
@Component({
  selector: 'ksp-activity-write-book',
  templateUrl: './activity-write-book.component.html',
  styleUrls: ['./activity-write-book.component.scss'],
  providers: providerFactory(ActivityWriteBookComponent),
})
export class ActivityWriteBookComponent
  extends KspFormBaseComponent
  implements OnInit, OnDestroy
{
  @Input() data: any;
  @Input() isForeignForm = false;

  //การแต่งตำรา หรือหนังสือ ในเรื่องที่เกี่ยวข้องกับวิชาชีพ หรือวิชาการเฉพาะด้านที่เกี่ยวข้องกับวิชาชีพ

  override form = this.fb.group({
    isBookChecked: [false],
    bookName: [],
    bookPublisher: [],
    bookPublishDate: [],
    isAchievementChecked: [false],
    achievementName: [],
    achievementDate: [],
    isArticleChecked: [false],
    articleName: [],
    articlePublishing: [],
    articlePublisher: [],
    articlePublishDate: [],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit() {
    this.form.setValidators(checkboxValidator());
    this.form.valueChanges
      .pipe(untilDestroyed(this), pairwise())
      .subscribe(([prev, next]) => {
        if (prev.isBookChecked !== next.isBookChecked) {
          if (next.isBookChecked) {
            this.form.controls.bookName.addValidators(Validators.required);
            this.form.controls.bookPublisher.addValidators(Validators.required);
            this.form.controls.bookPublishDate.addValidators(
              Validators.required
            );
          } else {
            this.form.controls.bookName.clearValidators();
            this.form.controls.bookPublisher.clearValidators();
            this.form.controls.bookPublishDate.clearValidators();
          }
          this.form.controls.bookName.updateValueAndValidity();
          this.form.controls.bookPublisher.updateValueAndValidity();
          this.form.controls.bookPublishDate.updateValueAndValidity();
        }

        if (prev.isAchievementChecked !== next.isAchievementChecked) {
          if (next.isAchievementChecked) {
            this.form.controls.achievementName.addValidators(
              Validators.required
            );
            this.form.controls.achievementDate.addValidators(
              Validators.required
            );
          } else {
            this.form.controls.achievementName.clearValidators();
            this.form.controls.achievementDate.clearValidators();
          }
          this.form.controls.achievementName.updateValueAndValidity();
          this.form.controls.achievementDate.updateValueAndValidity();
        }

        if (prev.isArticleChecked !== next.isArticleChecked) {
          if (next.isArticleChecked) {
            this.form.controls.articleName.addValidators(Validators.required);
            this.form.controls.articlePublishing.addValidators(
              Validators.required
            );
            this.form.controls.articlePublisher.addValidators(
              Validators.required
            );
            this.form.controls.articlePublishDate.addValidators(
              Validators.required
            );
          } else {
            this.form.controls.articleName.clearValidators();
            this.form.controls.articlePublishing.clearValidators();
            this.form.controls.articlePublisher.clearValidators();
            this.form.controls.articlePublishDate.clearValidators();
          }
          this.form.controls.articleName.updateValueAndValidity();
          this.form.controls.articlePublishing.updateValueAndValidity();
          this.form.controls.articlePublisher.updateValueAndValidity();
          this.form.controls.articlePublishDate.updateValueAndValidity();
        }
      });
  }

  override ngOnDestroy(): void {
    this.onChange(null);
    this.onTouched();
  }
}
