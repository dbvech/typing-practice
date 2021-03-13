import { Role } from "../entities/role";
import { Admin } from "../entities/admin";
import { Client } from "../entities/client";
import { Moderator } from "../entities/moderator";
import { Operation } from "../entities/operation";
import type { User } from "../entities/user";
import type { RoleToUser } from "../entities/role-to-user";

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

  async getUserByEmailAndPassword(email: string, password: string) {
    const response = await this.fetch();
    const user = response.default.find((u: any) => u && u.email === email);

    if (!user || user.password !== password) {
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

  getAvailableOperations(user: User, currentUser: User): Operation[] {
    if (!user || !currentUser || user.id === currentUser.id) {
      return [];
    }

    const getAdminOperations = () => {
      if (user instanceof Admin || user instanceof Client) {
        return [Operation.UPDATE_TO_MODERATOR];
      }

      return [Operation.UPDATE_TO_CLIENT, Operation.UPDATE_TO_ADMIN];
    };

    const getModeratorOperations = () => {
      if (user instanceof Client) {
        return [Operation.UPDATE_TO_MODERATOR];
      }
      if (user instanceof Moderator) {
        return [Operation.UPDATE_TO_CLIENT];
      }
      return [];
    };

    if (currentUser instanceof Admin) {
      return getAdminOperations();
    }

    if (currentUser instanceof Moderator) {
      return getModeratorOperations();
    }

    return [];
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
