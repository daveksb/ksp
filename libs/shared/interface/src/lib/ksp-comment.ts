export class KspComment {
  returndate: string | null = null;
  checkdetail: TabComment[] = [new TabComment()];
  reason?: string | null = null;
  checkresult?: string | null = null;
}

export class TabComment {
  detail = '';
  reason = '';
  result = '';
}
