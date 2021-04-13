import * as t from "runtypes";

const isValidEmail = (email: string) => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email.toLowerCase());
};

export const Email = t.String.withConstraint(
  (email) => isValidEmail(email) || "Email is invalid"
).withBrand("Email");

export type Email = t.Static<typeof Email>;
