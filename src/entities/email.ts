export class Email {
  private readonly _type = Symbol("Email");
  protected constructor(public readonly value: string) {}

  static from(email: any): Email {
    if (Email.isValid(email)) {
      return new Email(email);
    }
    throw new TypeError("Email is invalid");
  }

  static isValid(email: any) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return typeof email === "string" && regExp.test(email.toLowerCase());
  }
}
