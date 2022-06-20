import { forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';

export function providerFactory(component: any) {
  return [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: component,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: component,
    },
    {
      provide: KspFormBaseComponent,
      useExisting: forwardRef(() => component),
    },
  ];
}
