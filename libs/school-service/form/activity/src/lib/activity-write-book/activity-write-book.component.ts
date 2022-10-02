import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-activity-write-book',
  templateUrl: './activity-write-book.component.html',
  styleUrls: ['./activity-write-book.component.scss'],
  providers: providerFactory(ActivityWriteBookComponent),
})
export class ActivityWriteBookComponent extends KspFormBaseComponent {
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
}
