import * as t from "runtypes";

const isValidPassword = (password: any) => {
  const regExp = /^\S{3,}$/;
  return typeof password === "string" && regExp.test(password);
};

export const Password = t.String.withConstraint(
  (email) => isValidPassword(email) || "Password is invalid"
).withBrand("Password");

export type Password = t.Static<typeof Password>;
