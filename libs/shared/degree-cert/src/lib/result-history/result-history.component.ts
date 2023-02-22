import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-result-history',
  templateUrl: './result-history.component.html',
  styleUrls: ['./result-history.component.css'],
  providers: providerFactory(ResultHistoryComponent),
})
export class ResultHistoryComponent
{
  @Input() historyList: Array<any> = [];
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;

  constructor(
    private fb: FormBuilder,
  ) {}

}
