import { createContext, useReducer } from "react";
import type { User } from "../entities/user";
import type { ReactChild } from "react";
import { UserPermissions } from "../entities/permissions-by-role";

export enum LogedInActionType {
  LOG_IN = "log in",
}

type LogedInAction = {
  type: LogedInActionType.LOG_IN;
  payload: { user: User; permissions: UserPermissions };
};

type LogedInProviderProps = {
  children: ReactChild | ReactChild[];
};

type LogedInUserState = {
  user: User | null;
  permissions: UserPermissions | null;
};

type LogedInProviderContext = {
  state?: LogedInUserState;
  dispatch?: (action: LogedInAction) => void;
};

const initialState = {
  user: null,
  permissions: null,
};

export const LogedInUser = createContext<LogedInProviderContext>({});

function logedInReducer(state: LogedInUserState, action: LogedInAction) {
  switch (action.type) {
    case LogedInActionType.LOG_IN:
      return {
        ...state,
        user: action.payload.user,
        permissions: action.payload.permissions,
      };
    default:
      return state;
  }
}

export function LogedInProvider({ children }: LogedInProviderProps) {
  const [state, dispatch] = useReducer(logedInReducer, initialState);
  return (
    <LogedInUser.Provider value={{ dispatch, state }}>
      {children}
    </LogedInUser.Provider>
  );
}
