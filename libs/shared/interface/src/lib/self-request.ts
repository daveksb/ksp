import { KspRequest } from './ksp-request';

export class SelfRequest extends KspRequest {
  constructor(
    ref1: string,
    ref2: string,
    ref3: string,
    process = 1, // ขั้นตอน
    status = 1 // สถานะ
  ) {
    super();
    super.ref1 = ref1;
    super.ref2 = ref2;
    super.ref3 = ref3;

    super.systemtype = ref1;
    super.requesttype = `${+ref2}`;
    super.careertype = ref3;

    super.process = `${process}`;
    super.status = `${status}`;
  }
}

export interface SelfGetRequest extends SelfRequest {
  filedata?: string | null;
}
