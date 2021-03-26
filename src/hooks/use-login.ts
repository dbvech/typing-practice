import Services from "../services";
import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { LogedInActionType, LogedInUser } from "../providers/loged-in-user";
import type { User } from "../entities/user";
import { Email } from "../entities/email";
import { Password } from "../entities/password";

export type Credentials = {
  email: string;
  password: string;
};

export default function useLogin(credentials: Credentials | null): User | null {
  const { loginService, userService } = useContext(Services);
  const { dispatch, state = { user: null } } = useContext(LogedInUser);

  useEffect(() => {
    if (!credentials || !dispatch) {
      return;
    }
    loginService
      .login(Email.from(credentials.email), Password.from(credentials.password))
      .then((user: User) =>
        dispatch!({
          type: LogedInActionType.LOG_IN,
          payload: { user, permissions: userService.getUserPermissions(user) },
        })
      )
      .then(() => navigate("/"))
      .catch((e) => alert(e.message));
  }, [credentials, dispatch, loginService, userService]);

  return state.user;
}
