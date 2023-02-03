import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-transfer-knowledge-career-cert',
  templateUrl: './transfer-knowledge-career-cert.component.html',
  styleUrls: ['./transfer-knowledge-career-cert.component.scss'],
  providers: providerFactory(TransferKnowledgeCareerCertComponent),
})
export class TransferKnowledgeCareerCertComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    certificationType: [null, Validators.required],
    recognizedOrganization: [null, Validators.required],
    certificateNo: [null, Validators.required],
    issueDate: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {}
}
