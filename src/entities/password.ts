export class Password {
  private readonly _type = Symbol("Password");
  protected constructor(public readonly value: string) {}

  static from(password: any): Password {
    if (Password.isValid(password)) {
      return new Password(password);
    }
    throw new TypeError("Password is invalid");
  }

  static isValid(password: any) {
    const regExp = /^\S{3,}$/;
    return typeof password === "string" && regExp.test(password);
  }
}
