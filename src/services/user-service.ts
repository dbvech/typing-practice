import { Role } from "../entities/role";
import { Admin } from "../entities/admin";
import { Client } from "../entities/client";
import { Moderator } from "../entities/moderator";
import type { User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";
import type { Email } from "../entities/email";
import type { Password } from "../entities/password";
import { PERMISSIONS_BY_ROLE } from "../entities/permissions-by-role";

export default class UserService {
  private users: readonly User[] = [];

  async getAllUsers(): Promise<readonly User[]> {
    if (this.users.length !== 0) {
      return this.users;
    }
    const response = await this.fetch();
    this.users = response.default.map((u: any) => {
      const User = this.getConstructorByRole(u.role);
      return User.from(u);
    });
    return this.users;
  }

  private fetch(): Promise<any> {
    return import("../mocks/users.json");
  }

  async getUserByEmailAndPassword(email: Email, password: Password) {
    const response = await this.fetch();
    const user = response.default.find(
      (u: any) => u && u.email === email.value
    );

    if (!user || user.password !== password.value) {
      throw new Error("User not found");
    }

    const User = this.getConstructorByRole(user.role);
    return User.from(user);
  }

  async updateUserRole<R extends Role>(
    user: Readonly<RoleToUser[R]>,
    newRole: R
  ) {
    const User = this.getConstructorByRole(newRole);
    this.users = this.users.map((u) => (u.id === user.id ? User.from(u) : u));
    return this.users;
  }

  getUserPermissions<R extends Role>(user: User & { role: R }) {
    return PERMISSIONS_BY_ROLE[user.role];
  }

  getAvailableOperations<R1 extends Role, R2 extends Role>(
    user: Readonly<User & { role: R1 }>,
    currentUser: User & { role: R2 }
  ) {
    const permissions = this.getUserPermissions<R2>(currentUser);
    return permissions.operations[user.role];
  }

  getConstructorByRole(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return Admin;
      case Role.CLIENT:
        return Client;
      case Role.MODERATOR:
        return Moderator;
    }
  }
}
