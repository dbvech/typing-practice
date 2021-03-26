import { useContext } from "react";
import { LogedInUser } from "../providers/loged-in-user";
import { navigate } from "@reach/router";
import { UserPermissions } from "../entities/permissions-by-role";

export default function useCurrentUserPermissions() {
  const { state: { permissions } = { permissions: null } } = useContext(
    LogedInUser
  );

  if (permissions === null) {
    navigate("/login");
  }

  return permissions as UserPermissions;
}
