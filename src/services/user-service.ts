import { Role } from "../entities/role";
import { User } from "../entities/user";
import { castTo } from "../entities/role-to-user";
import type { RoleToUser } from "../entities/role-to-user";
import type { Email } from "../entities/email";
import type { Password } from "../entities/password";
import {
  PERMISSIONS_BY_ROLE,
  PERMISSIONS_BY_ROLE_TYPE,
} from "../entities/permissions-by-role";

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => User.check(u));
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async getUserByEmailAndPassword(email: Email, password: Password) {
    const response = await this.fetch();
    const user = response.default.find((u: any) => u && u.email === email);

    if (!user || user.password !== password) {
      throw new Error("User not found");
    }

    return User.check(user);
  }

  async updateUserRole<R extends Role>(user: RoleToUser[R], newRole: R) {
    const newUser = castTo(newRole, user);
    this.users = this.users.map((u) => (u.id === user.id ? newUser : u));
    return this.users;
  }

  getUserPermissions<R extends Role>(user: User & { role: R }) {
    return PERMISSIONS_BY_ROLE[user.role];
  }

  getAvailableOperations<R1 extends Role, R2 extends Role>(
    user: Readonly<User & { role: R1 }>,
    currentUser: User & { role: R2 }
  ): PERMISSIONS_BY_ROLE_TYPE[R2]["operations"][R1] {
    const permissions = this.getUserPermissions<R2>(currentUser);
    return permissions.operations[user.role];
  }
}
