export class EmailPayload {
  fromname: string;
  subject: string;
  body: string;
  emailaddress: string;

  constructor(
    targetEmail: string,
    body: string,
    subject: string = 'email subject',
    from: string = 'admin@ksp.or.th'
  ) {
    this.fromname = from;
    this.subject = subject;
    this.body = body;
    this.emailaddress = targetEmail;
  }
}
